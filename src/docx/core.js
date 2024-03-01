import * as DOCX from "docx";
import CONSTANTS, { compatibility } from "@/utils/constants";
import TEMP_DATA from "@/data";
import { renderAsync } from "docx-preview";
import styles, { pageTitleStyle, sectionStyle } from "./styles";
import { saveAs } from "file-saver";
import { cloneDeep } from "lodash";
import { convertImageToBase64 } from "@/utils";
// import { Buffer } from "buffer";
// window.Buffer = Buffer;

const actives = [
  "branchInfo",
  "committeeLeader",
  "groupLeader",
  "memberGroup",
  "formalMember",
  "memberTransfer",
  "help",
  "talk",
  "developMember",
  "branch",
  "brach",
  "orgLifeRecord",
  "lessonRecord",
  "plan",
  "summary",
  "partyDuesSummary",
  "deliberation",
];
class DocumentCreator {
  async create() {
    const DATA = this.processingData(TEMP_DATA);
    const _pages = [];

    for (let active of actives) {
      const temp = CONSTANTS.TEMPLATES[active];
      if (temp.type === "FORM") {
        const formDatas = DATA[active];
        for (let formData of formDatas) {
          _pages.push(this.convertForm(temp, formData));
        }
      } else if (temp.type === "TABLE") {
        _pages.push(this.convertTable(temp, DATA[active]));
      } else {
        throw new Error("Invalid template type");
      }
    }
    const pages = await Promise.all(_pages);
    const sections = [];

    for (let sec of pages) {
      const titleSec = this.createTitle(sec.title);
      const tableSec = await this.createTable(sec);
      const LANDSCAPE = {
        page: {
          margin: {
            size: {
              orientation: DOCX.PageOrientation.LANDSCAPE,
            },
          },
        },
      };
      // 页眉
      const headers = {
        default: new DOCX.Header({
          children: [
            new DOCX.Paragraph({
              alignment: DOCX.AlignmentType.CENTER,
              children: [
                new DOCX.TextRun({
                  text: sec.title,
                  bold: true,
                }),
              ],
            }),
          ],
        }),
      };
      // 页脚
      const footers = {
        default: new DOCX.Footer({
          children: [
            new DOCX.Paragraph({
              alignment: DOCX.AlignmentType.CENTER,
              children: [
                new DOCX.TextRun({
                  children: [
                    DOCX.PageNumber.CURRENT,
                    "/",
                    DOCX.PageNumber.TOTAL_PAGES,
                  ],
                  bold: true,
                }),
              ],
            }),
          ],
        }),
      };
      const docSec = {
        properties: sec.title === "党费" ? LANDSCAPE : sectionStyle,
        headers,
        footers,
        children: [titleSec, tableSec],
      };
      sections.push(docSec);
    }
    const doc = new DOCX.Document({
      // 兼容性
      compatibility,
      styles,
      sections,
    });
    this.save(doc);
  }
  // 数据处理
  processingData(_data) {
    const data = cloneDeep(_data);
    // 把branchInfo转成数组
    data.branchInfo = [_data.branchInfo];
    // 处理党费
    for (let i = 0; i < _data.partyDuesSummary.length; i++) {
      let sum = 0;
      const { name, datas } = _data.partyDuesSummary[i];
      const item = datas.reduce((acc, cur) => {
        sum += Number(cur.collectionMoney);
        const month = cur.collectionMonth.split("-")[1];
        acc[month] = cur.collectionMoney;
        return acc;
      }, {});
      let summary = sum.toFixed(2);
      data.partyDuesSummary[i] = { name, summary, ...item };
    }
    return data;
  }
  convertForm(form, data) {
    const rows = [];
    let index = 0;
    for (let item of form.data) {
      if (!rows[index]) {
        rows[index] = [];
      }
      // 换行
      if (
        rows[index].length === form.colSpan ||
        rows[index][0]?.colSpan === form.colSpan
      ) {
        rows[++index] = [];
      }
      if ("label" in item) {
        const label = {
          text: item.label,
          type: item.type,
        };
        const content = {
          text: data[item.prop],
          type: item.type,
          colSpan: item.colSpan ?? 1,
        };
        rows[index].push(label, content);
      } else if ("indent" in item) {
        rows[index].push({
          indent: item.indent,
          text: data[item.prop],
          colSpan: form.colSpan,
          type: item.type,
        });
      } else {
        throw new Error("Invalid form item");
      }
    }
    return { rows, ...form };
  }
  convertTable(table, data) {
    const tableHeader = table.data.map((item) => ({
      text: item.label,
      type: item.type ?? "text",
    }));
    const tableRows = data.map((item) =>
      table.data.map((cell) => ({
        text: item[cell.prop],
        type: item.type ?? "text",
      }))
    );
    return { rows: [tableHeader, ...tableRows], ...table };
  }

  createTitle(title) {
    const TIT_TEXT = new DOCX.TextRun({
      text: title,
      color: "000000", // 文字颜色为黑色
      bold: true,
    });
    const TIT_PAR = new DOCX.Paragraph({
      children: [TIT_TEXT],
      ...pageTitleStyle,
    });
    return TIT_PAR;
  }
  async createTable(template) {
    const columnWidths =
      template.type === "FORM"
        ? template.columnWidths
        : template.data.map((i) => i.width);
    const opt = {
      // columnWidths,
      margins: {
        top: 100,
        bottom: 100,
        left: 100,
        right: 100,
      },
      width: {
        size: 9010,
        type: DOCX.WidthType.DXA,
      },
      indent: {
        size: 100,
        type: DOCX.WidthType.DXA,
      },
    };

    const rows = await this.handleTemplate(template.rows, template.type);
    return new DOCX.Table({
      rows,
      ...opt,
    });
  }

  // 生成文字
  createTextRun(text, opts = {}) {
    return new DOCX.TextRun({
      text,
      break: opts.break || 0,
    });
  }
  // 生成段落
  createParagraph(children, opt = {}) {
    return new DOCX.Paragraph({
      style: opt.style ?? "cellParagraph",
      ...opt,
      children,
    });
  }
  // 生成图片
  createImageRun(data, ratio, width = 572) {
    return new Promise((resolve, reject) => {
      const testImg = require("@/assets/branchInfo.png");
      convertImageToBase64(testImg, (imgData) => {
        resolve(
          new DOCX.ImageRun({
            data: imgData.url,
            transformation: {
              width,
              height: width / imgData.ratio,
            },
          })
        );
      });
    });
  }
  // 根据模板生成表单
  async handleTemplate(rows, type) {
    const tableRows = [];
    for (const rowIndex in rows) {
      const row = rows[rowIndex];
      const tableRow = [];
      const isTableHeader = type === "TABLE" && rowIndex === "0";
      for (const cell of row) {
        const paragraph = [];

        // 表单内容的标题
        if (cell.indent) {
          paragraph.push(this.createTextRun(cell.indent));
        }

        // 单元格文字内容
        if (cell.type === "text") {
          const opt = cell.indent ? { break: 1 } : {};
          paragraph.push(this.createTextRun(cell.text, opt));
        } else if (cell.type === "null") {
          paragraph.push(this.createTextRun(cell.text ?? ""));
        }

        // 每个cell里套一层paragraph
        let tableCell;

        // 表单中的富文本
        if (cell.type === "html") {
          let htmString = cell.text.replace(/[\t\n\r]/g, "");
          const htmlDOM = new DOMParser().parseFromString(
            htmString,
            "text/html"
          );
          const DOMContent = htmlDOM.body;
          tableCell = this.HTML2DocxConfig(DOMContent);
        } else {
          tableCell = [this.createParagraph(paragraph)];
        }
        // 表单中的图片
        if (cell.type === "img") {
          const img = await this.createImageRun(cell.text);
          tableCell.push(this.createParagraph([img]));
        }
        // 把一串cell放到一行row里
        tableRow.push(
          new DOCX.TableCell({
            columnSpan: cell.colSpan ?? 1,
            verticalAlign: DOCX.VerticalAlign.CENTER,
            textDirection: DOCX.TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
            // margins: {
            //   top: 140,
            //   bottom: 140,
            //   left: 200,
            //   right: 200,
            // },
            shading: isTableHeader
              ? {
                  type: DOCX.ShadingType.CLEAR,
                  color: "auto",
                  fill: "F7F7F7",
                }
              : undefined,
            children: tableCell,
          })
        );
      }
      tableRows.push(
        new DOCX.TableRow({
          tableHeader: isTableHeader,
          children: tableRow,
        })
      );
    }
    return tableRows;
  }
  HTML2DocxConfig(element) {
    let docxElements = [];
    let that = this;
    const styleConfig = {
      fontSize: 14, // 字体大小
      cellMargin: 60, // 单元格边距
      lineSpacing: 120, // 行间距
      paragraphSpacing: 40, // 段落间距
    };

    function processParagraph(pElement) {
      return new DOCX.Paragraph({
        text: pElement.textContent,
        style: "cellParagraph",
      });
    }

    function processCell(cellElement) {
      const paragraph = new DOCX.Paragraph({
        text: cellElement.textContent,
        style: "cellParagraph",
      });
      const cellOptions = {
        children: [paragraph],
        verticalAlign: DOCX.VerticalAlign.CENTER,
      };

      if (cellElement.hasAttribute("colspan")) {
        cellOptions.columnSpan = parseInt(
          cellElement.getAttribute("colspan"),
          10
        );
      }

      if (cellElement.hasAttribute("rowspan")) {
        cellOptions.rowSpan = parseInt(cellElement.getAttribute("rowspan"), 10);
      }

      return new DOCX.TableCell(cellOptions);
    }

    function processRow(rowElement) {
      const cells = Array.from(rowElement.querySelectorAll("td, th")).map(
        processCell
      );
      return new DOCX.TableRow({ children: cells });
    }

    function processTable(tableElement) {
      const rows = Array.from(tableElement.querySelectorAll("tr")).map(
        processRow
      );
      return new DOCX.Table({
        rows,
        borders: DOCX.TableBorders.NONE,
        width: {
          size: 100, // 示例宽度
          type: DOCX.WidthType.PERCENTAGE,
        },
      });
    }

    function processElement(element) {
      switch (element.tagName) {
        case "TABLE":
          docxElements.push(processTable(element));
          break;
        case "P":
          docxElements.push(processParagraph(element));
          break;
        // 实现其他标签的处理逻辑...
      }
    }

    function traverseElements(element) {
      for (let e of element.children) {
        if (e.tagName) {
          processElement(e);
        }
      }
    }
    traverseElements(element); // 从给定的根元素开始遍历
    return docxElements;
  }

  save(doc) {
    DOCX.Packer.toBlob(doc)
      .then((blob) => {
        saveAs(blob, "2023党支部套打文档.docx");
        renderAsync(blob, document.getElementById("bodyContainer"), null, {
          inWrapper: false,
          ignoreLastRenderedPageBreak: false,
          experimental: true,
          renderChanges: true,
          debug: true,
        });
      })
      .catch(console.error);
  }
}

export default DocumentCreator;
