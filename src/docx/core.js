import * as DOCX from "docx";
import CONSTANTS from "@/utils/constants";
import TEMP_DATA from "@/data";
import { saveAs } from "file-saver";
import { Buffer } from "buffer";

window.Buffer = Buffer;

class DocumentCreator {
  constructor() {}
  imgBlob;
  async create() {
    const titleSec = this.createTitle("branchInfo");
    const tableSec = await this.createTable(
      "branchInfo",
      TEMP_DATA["branchInfo"]
    );
    const docSec = [titleSec, tableSec];
    const doc = new DOCX.Document({
      sections: [
        {
          properties: { type: DOCX.SectionType.CONTINUOUS },
          children: [docSec],
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
      alignment: DOCX.AlignmentType.CENTER, // 文字居中
      shading: {
        type: DOCX.ShadingType.CLEAR, // 背景类型
        color: "auto",
        fill: "F7F7F7", // 背景颜色为 #f7f7f7
      },
      padding: {
        top: 100,
        bottom: 100,
        left: 100,
        right: 100,
      },
      borders: {
        top: {
          color: "FFFFFF", // 设置边框颜色为白色，相当于无边框效果
          size: 0,
          space: 0,
        },
        bottom: {
          color: "FFFFFF",
          size: 0,
          space: 0,
        },
        left: {
          color: "FFFFFF",
          size: 0,
          space: 0,
        },
        right: {
          color: "FFFFFF",
          size: 0,
          space: 0,
        },
      },
    });
    return TIT_PAR;
  }
  createTable(temp, data) {
    return new Promise((resolveTable) => {
      const tempFn = CONSTANTS.TEMPLATES[temp];
      const template = tempFn(data);
      if (!tempFn || !template) return null;

      const imgPromise = [];

      for (let tableRow of template.tableRows) {
        for (let cellIndex in tableRow.tableCells) {
          const tableCell = tableRow.tableCells[cellIndex];
          const cellChildren = [];
          // 表单内容的标题
          if (tableRow.indentText) {
            cellChildren[cellIndex] = new DOCX.Paragraph(tableRow.indentText);
          }
          // 表单中的图片
          if (tableRow.img) {
            const imgUrl = require("@/assets/branchInfo.png");
            imgPromise.push(
              this.getImageAsBlob(imgUrl).then((blob) => {
                const url = URL.createObjectURL(blob);
                console.log(blob, url);

                cellChildren[cellIndex] = new DOCX.ImageRun({
                  data: blob,
                  transformation: { width: 100, height: 100 },
                });
                new DOCX.TableCell({ children: cellChildren });
              })
            );
          }
        }
      }

      Promise.all(rowsPromises).then((rows) => {
        // 过滤掉可能因错误解析为null的行
        const filteredRows = rows.filter((row) => row !== null);

        const TABLE = new DOCX.Table({
          rows: filteredRows,
          width: {
            size: 100,
            type: DOCX.WidthType.PERCENTAGE,
          },
        });

        resolveTable(TABLE);
      });
    });
  }
  save(doc) {
    DOCX.Packer.toBlob(doc)
      .then((blob) => {
        saveAs(blob, "2023党支部套打文档.docx");
      })
      .catch(console.error);
  }
  async getImageAsBlob(imageUrl) {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Network response was not ok");
      const imageBlob = await response.blob();
      return imageBlob;
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }
  // 清理所有Blob数据
  clearBlobs() {
    // 如果你为Blob创建了Object URLs，需要先撤销它们
    this.imgBlobs.forEach((blob) => {
      const url = URL.createObjectURL(blob);
      URL.revokeObjectURL(url);
    });

    // 清空数组，移除对Blob的引用
    this.imgBlobs = [];
  }
}

export default DocumentCreator;
