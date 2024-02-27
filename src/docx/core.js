import * as DOCX from "docx";
import CONSTANTS from "@/utils/constants";
import TEMP_DATA from "@/data";
import { renderAsync } from "docx-preview";
import styles, { pageTitleStyle } from "./styles";
import { saveAs } from "file-saver";

// import { Buffer } from "buffer";
// window.Buffer = Buffer;

const actives = ["branchInfo", "committeeLeader"];
class DocumentCreator {
  async create() {
    const _templates = actives.map((active) => {
      const temp = CONSTANTS.TEMPLATES[active];
      if (temp.type === "FORM") {
        return this.convertForm(temp, TEMP_DATA[active]);
      } else if (temp.type === "TABLE") {
        return this.convertTable(temp, TEMP_DATA[active]);
      } else {
        throw new Error("Invalid template type");
      }
    });
    const templates = await Promise.all(_templates);
    const sections = [];
    for (let index in templates) {
      const template = templates[index];
      const titleSec = this.createTitle(actives[index]);
      const tableSec = await this.createTable(template);
      const docSec = {
        properties: { type: DOCX.SectionType.NEXT_PAGE },
        children: [titleSec, tableSec],
      };
      sections.push(docSec);
    }
    console.log("🚀templates:", templates);
    const doc = new DOCX.Document({
      styles,
      sections,
    });
    this.save(doc);
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
      text: item.text,
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

    const rows = await this.handleTemplate(template.rows);
    return new DOCX.Table({
      rows,
      ...opt,
      width: {
        size: 9010,
        type: DOCX.WidthType.DXA,
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
  createParagraph(children, opt) {
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
  async handleTemplate(rows) {
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
        const tableCell = this.createParagraph(paragraph, {
          margins: {
            top: 40,
            bottom: 40,
            right: 200,
            left: 200,
          },
          shading:
            rowIndex === "0"
              ? {
                  type: DOCX.ShadingType.CLEAR,
                  color: "auto",
                  fill: "F7F7F7",
                }
              : undefined,
        });

        // 把一串cell放到一行row里
        tableRow.push(
          new DOCX.TableCell({
            columnSpan: cell.colSpan ?? 1,
            verticalAlign: DOCX.VerticalAlign.CENTER,
            textDirection: DOCX.TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
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
      console.log(
        "🚀 ~ DocumentCreator ~ handleTemplate ~ tableRows:",
        tableRows
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
