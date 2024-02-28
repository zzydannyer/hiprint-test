import * as DOCX from "docx";
import CONSTANTS from "@/utils/constants";
import TEMP_DATA from "@/data";
import { renderAsync } from "docx-preview";
import styles, { pageTitleStyle, sectionStyle } from "./styles";
import { saveAs } from "file-saver";
import { cloneDeep } from "lodash";

// import { Buffer } from "buffer";
// window.Buffer = Buffer;

const actives = [
  "branchInfo",
  "committeeLeader",
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
  // "deliberation",
];
class DocumentCreator {
  async create() {
    const DATA = this.processingData(TEMP_DATA);
    console.log("🚀DATA:", TEMP_DATA, DATA);

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

    for (let index in pages) {
      const sec = pages[index];
      const titleSec = this.createTitle(actives[index]);
      const tableSec = await this.createTable(sec);
      const docSec = {
        properties: sectionStyle,
        children: [titleSec, tableSec],
      };
      sections.push(docSec);
    }
    console.log("🚀templates:", pages);
    const doc = new DOCX.Document({
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
      data.partyDuesSummary[i] = { name, sum, ...item };
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
        const label = { text: item.label, width: 20 };
        const content = { text: data[item.prop], width: 20 };
        rows[index].push(label, content);
      } else if ("indent" in item) {
        rows[index].push({
          indent: item.indent,
          text: data[item.prop],
          colSpan: form.colSpan,
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
      width: item.width,
    }));
    const tableRows = data.map((item) =>
      table.data.map((cell) => ({
        text: item[cell.prop],
        width: cell.width,
      }))
    );
    return { rows: [tableHeader, ...tableRows], ...table };
  }

  createTitle(active) {
    const TIT_TEXT = new DOCX.TextRun({
      text: CONSTANTS.MAP[active],
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
      columnWidths,
    };

    const rows = await this.handleTemplate(template.rows, template.type);
    return new DOCX.Table({
      rows,
      ...opt,
      width: {
        size: 100,
        type: DOCX.WidthType.AUTO,
      },
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
      for (const cell of row) {
        const paragraph = [];

        // 表单内容的标题
        if (cell.indent) {
          paragraph.push(this.createTextRun(cell.indent));
        }

        // 单元格文字内容
        if (cell.text) {
          const opt = cell.indent ? { break: 1 } : {};
          paragraph.push(this.createTextRun(cell.text, opt));
        }

        // 表单中的富文本
        if (cell.html) {
          // paragraph.push(new DOCX.TextRun(tableCell.richText));
        }

        // 表单中的图片
        if (cell.img) {
          const img = await this.createImageRun(cell.img);
          paragraph.push(img);
        }
        // 每个cell里套一层paragraph
        const tableCell = this.createParagraph(paragraph);

        const isTableHeader = type === "TABLE" && rowIndex === "0";

        // 把一串cell放到一行row里
        tableRow.push(
          new DOCX.TableCell({
            columnSpan: cell.colSpan ?? 1,
            verticalAlign: DOCX.VerticalAlign.CENTER,
            textDirection: DOCX.TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
            margins: {
              top: 40,
              bottom: 40,
              right: 200,
              left: 200,
            },
            shading: isTableHeader
              ? {
                  type: DOCX.ShadingType.CLEAR,
                  color: "auto",
                  fill: "F7F7F7",
                }
              : undefined,
            children: [tableCell],
          })
        );
      }
      tableRows.push(
        new DOCX.TableRow({
          tableHeader: rowIndex === 0,
          children: tableRow,
        })
      );
    }
    return tableRows;
  }
  save(doc) {
    DOCX.Packer.toBlob(doc)
      .then((blob) => {
        saveAs(blob, "2023党支部套打文档.docx");
        renderAsync(blob, document.getElementById("bodyContainer"), null, {
          ignoreLastRenderedPageBreak: false,
        });
      })
      .catch(console.error);
  }
}

export default DocumentCreator;
