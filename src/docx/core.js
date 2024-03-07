import * as DOCX from "docx";
import CONSTANTS, { compatibility } from "@/utils/constants";
import TEMP_DATA from "@/data";
import { renderAsync } from "docx-preview";
import styles, { pageTitleStyle, sectionStyle } from "./styles";
import { saveAs } from "file-saver";
import { cloneDeep } from "lodash";
import { convertImageToBase64 } from "@/utils";
import { dictsMap } from "@/utils/constants";
import { createCover } from "./cover";
import {wrapTextNum} from "@/utils/constants";
// import { Buffer } from "buffer";
// window.Buffer = Buffer;
const actives = [
  "branchInfo",
  // "committeeLeader",
  // "groupLeader",
  // "memberGroup",
  // "formalMember",
  // "memberTransfer",
  // "help",
  // "talk",
  // "developMember",
  // "branch",
  // "brach",
  // "orgLifeRecord",
  // "lessonRecord",
  // "plan",
  // "summary",
  // "partyDuesSummary",
  // "deliberation",
];
class DocumentCreator {
  constructor({ parentOrgName, name, year }) {
    this.parentOrgName =
      parentOrgName ?? "明东公司工程技术部党总支-工程技术部综合设施组党支部";
    this.name = name ?? "明东公司工程技术部党总支-工程技术部综合设施组党支部";
    this.year = year ?? new Date().getFullYear();
  }
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
          size: {
            orientation: DOCX.PageOrientation.LANDSCAPE,
          },
        },
      };
      // 页眉
      const headers = {
        default: new DOCX.Header({
          children: [
            //   new DOCX.Paragraph({
            //     alignment: DOCX.AlignmentType.CENTER,
            //     children: [
            //       new DOCX.TextRun({
            //         text: sec.title,
            //         bold: true,
            //       }),
            //     ],
            //   }),
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

    // 添加封面和封底
    const { frontPage, backPage } = await createCover({
      parentOrgName: this.parentOrgName,
      name: this.name,
      year: this.year,
    });

    sections.unshift(frontPage);
    sections.push(backPage);

    const doc = new DOCX.Document({
      // 兼容性
      compatibility,
      styles,
      sections,
    });
    return this.save(doc);
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
      const total = rows[index].reduce((acc, cur) => acc + cur.colSpan, 0);
      if (total > form.colSpan) {
        throw new Error("Invalid form item");
      } else if (total === form.colSpan) {
        rows[++index] = [];
      } else {
      }

      if ("label" in item) {
        const [labelWidth, valueWidth] = item.widths;
        const label = {
          text: item.label,
          type: item.type,
          colSpan: 1,
          width: labelWidth,
        };
        const content = {
          text: data[item.prop],
          type: item.type,
          colSpan: item.colSpan - 1,
          width: valueWidth,
        };
        rows[index].push(label, content);
      } else if ("indent" in item) {
        rows[index].push({
          indent: item.indent,
          text: data[item.prop],
          colSpan: form.colSpan,
          type: item.type,
          width: 9010,
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
      width: item.width,
    }));
    const tableRows = data.map((item) =>
      table.data.map((cell) => ({
        text: item[cell.prop],
        type: item.type ?? "text",
        dict: item.dict,
        width: cell.width,
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
        size: template.title === "党费" ? 13970 : 9010,
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
  createImageRun(data, opt = {}) {
    return new Promise((resolve, reject) => {
      const imgUrl = data ?? require("@/assets/branchInfo.png");

      convertImageToBase64(imgUrl, (imgData) => {
        const width = opt.width ?? 572;
        const ratio = opt.ratio ?? imgData.ratio ?? 1;
        const height = opt.height ?? width / ratio;
        resolve(
          new DOCX.ImageRun({
            data: imgData.url,
            transformation: {
              width,
              height,
            },
            ...opt,
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
        } else if (cell.type === "dict") {
          paragraph.push(this.createTextRun(dictsMap[cell.dict][cell.text]));
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
            width: {
              size: cell.width,
              type: DOCX.WidthType.DXA,
            },
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
    return new Promise(async (resolve, reject) => {
      try {
        const blob = await DOCX.Packer.toBlob(doc);
        // await saveAs(blob, "2023党支部套打文档.docx");
        await renderAsync(
          blob,
          document.getElementById("previewContainer"),
          null,
          {
            renderChanges: false, //启用文档更改的实验渲染（插入/删除）
            className: "docx-preview-document", //默认和文档样式类的类名/前缀
            inWrapper: true, //启用围绕文档内容呈现包装器
            ignoreWidth: false, //禁用页面的渲染宽度
            ignoreHeight: false, //禁用页面的渲染高度
            ignoreFonts: false, //禁用字体渲染
            breakPages: true, //在分页符上启用分页
            ignoreLastRenderedPageBreak: true, //在lastRenderedPageBreak元素上禁用分页
            experimental: false, //启用实验功能（制表符停止计算）
            trimXmlDeclaration: true, //如果为true，则在解析之前将从xml文档中删除xml声明
            useBase64URL: false, //如果为true，图像、字体等将转换为base 64 URL，否则使用URL.createObjectURL
            useMathMLPolyfill: false, //包括用于铬、边等的MathML多填充。
            debug: false, //启用额外的日志记录
          }
        );
        // 要插入的样式
        const customStyle = `
       .docx-preview-document-wrapper .docx-preview-document:first-child header{
          margin-top: 0 !important;
       }
       .docx-preview-document-wrapper .docx-preview-document:first-child article p{
          position: absolute !important;
          width: 300px !important;
       }
       .docx-preview-document-wrapper .docx-preview-document:first-child article p span{
          display: inline-block !important;
       }
       .docx-preview-document-wrapper .docx-preview-document:first-child article p:first-child{
          top: 630px !important;
          left: 310px !important;
       }
       .docx-preview-document-wrapper .docx-preview-document:first-child article p:nth-child(2){
          top: ${
            this.parentOrgName.length > wrapTextNum ? 675 : 695
          }px !important;
          left: 310px !important;
      }
      .docx-preview-document-wrapper .docx-preview-document:first-child article p:nth-child(3){
          top: ${this.name.length > wrapTextNum ? 745 : 765}px !important;
          left: 310px !important;
      }
      `;

        // 创建一个 style 元素
        const styleElement = document.createElement("style");
        const target = document.getElementById("previewContainer");
        // 插入样式内容
        styleElement.appendChild(document.createTextNode(customStyle));
        // 将样式插入到 head 元素中
        target.appendChild(styleElement);
        resolve(true);
      } catch (err) {
        console.error(err);
        reject(err);
      }
    });
  }
}

export default DocumentCreator;
