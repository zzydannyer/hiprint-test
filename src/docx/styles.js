import * as DOCX from "docx";
export default {
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

export const pageTitleStyle = {
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
};
