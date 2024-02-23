import * as DOCX from "docx";
import CONSTANTS from "@/utils/constants";
import TEMP_DATA from "@/data";
import { renderAsync } from "docx-preview";
import { saveAs } from "file-saver";
// import { Buffer } from "buffer";

// window.Buffer = Buffer;

const styles = {
  default: {
    document: {
      run: {
        font: "SimSun",
      },
    },
  },
  paragraphStyles: [
    {
      id: "pageTitle",
      name: "pageTitle",
      basedOn: "Normal",
      next: "Normal",
      run: {
        color: "000000",
        bold: true,
        size: 32,
      },
      paragraph: {
        spacing: {
          before: 0,
          after: 276,
        },
      },
    },
    {
      id: "cellParagraph",
      name: "cellParagraph",
      basedOn: "Normal",
      next: "Normal",
      run: {
        color: "000000",
        size: 20,
      },
      paragraph: {
        spacing: {
          line: 276,
          before: 140,
          after: 140,
          left: 200,
          right: 200,
        },
      },
    },
  ],
};

class DocumentCreator {
  async create() {
    const titleSec = this.createTitle("branchInfo");
    let tableSec = this.createTable("branchInfo", TEMP_DATA["branchInfo"]);
    if (tableSec instanceof Promise) {
      tableSec = await tableSec;
    }
    const docSec = [titleSec, tableSec];
    const doc = new DOCX.Document({
      styles,
      sections: [
        {
          properties: { type: DOCX.SectionType.CONTINUOUS },
          children: docSec,
        },
      ],
    });
    this.save(doc);
  }

  createTitle(title) {
    const TIT_TEXT = new DOCX.TextRun({
      text: CONSTANTS.MAP[title],
      color: "000000", // 文字颜色为黑色
      bold: true,
    });
    const TIT_PAR = new DOCX.Paragraph({
      children: [TIT_TEXT],
      style: "pageTitle",
      alignment: DOCX.AlignmentType.CENTER, // 文字居中
      shading: {
        type: DOCX.ShadingType.CLEAR, // 背景类型
        color: "auto",
        fill: "F7F7F7", // 背景颜色为 #f7f7f7
      },
      border: {
        top: {
          color: "F7F7F7",
          size: 40,
          space: 0,
          style: DOCX.BorderStyle.SINGLE,
        },
        bottom: {
          color: "F7F7F7",
          size: 40,
          space: 0,
          style: DOCX.BorderStyle.SINGLE,
        },
      },
    });
    return TIT_PAR;
  }
  async createTable(temp, data) {
    const tempFn = CONSTANTS.TEMPLATES[temp];
    let template = tempFn(data);
    if (!tempFn || !template) return null;

    let rows;
    if (template instanceof Promise) {
      template = await template;
    }
    rows = this.handleTemplate(template);
    return new DOCX.Table({
      rows,
      width: {
        size: 100,
        type: DOCX.WidthType.PERCENTAGE,
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
  createParagraph(children, style = "cellParagraph") {
    return new DOCX.Paragraph({
      style,
      children,
    });
  }
  // 生成图片
  createImageRun(data, ratio, width = 572) {
    return new DOCX.ImageRun({
      data,
      transformation: {
        width,
        height: width / ratio,
      },
    });
  }
  // 根据模板生成表单
  handleTemplate(template) {
    const rows = [];
    for (let tableRow of template.tableRows) {
      const row = [];
      for (let tableCell of tableRow.tableCells) {
        const paragraph = [];

        // 表单内容的标题
        if (tableCell.indentText) {
          paragraph.push(this.createTextRun(tableCell.indentText));
        }

        // 单元格文字内容
        if (tableCell.text) {
          const opt = tableCell.indentText ? { break: 1 } : {};
          paragraph.push(this.createTextRun(tableCell.text, opt));
        }

        // 表单中的富文本
        if (tableCell.html) {
          // paragraph.push(new DOCX.TextRun(tableCell.richText));
        }

        // 表单中的图片
        if (tableCell.img) {
          paragraph.push(
            this.createImageRun(tableCell.img.base64, tableCell.img.ratio)
          );
        }

        // 每个cell里套一层paragraph
        const cell = this.createParagraph(paragraph);

        // 把一串cell放到一行row里
        row.push(
          new DOCX.TableCell({
            columnSpan: tableCell.colSpan ?? 1,
            width: {
              size: tableCell.width ?? 100,
              type: DOCX.WidthType.PERCENTAGE,
            },
            // margins: {
            //   top: 140,
            //   bottom: 140,
            //   right: 200,
            //   left: 200,
            // },
            verticalAlign: DOCX.VerticalAlign.CENTER,
            textDirection: DOCX.TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
            children: [cell],
          })
        );
      }
      rows.push(
        new DOCX.TableRow({
          children: row,
        })
      );
    }
    return rows;
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
