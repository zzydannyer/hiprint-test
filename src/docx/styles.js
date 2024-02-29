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
        size: 18,
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
        size: 14,
      },
      paragraph: {
        spacing: {
          after: 140, // 下边距
          before: 140, // 上边距
          line: 200, // 行间距，可用于调整文本之间的距离
        },
        indent: {
          left: 140, // 左边距
          right: 140, // 右边距
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

export const sectionStyle = {
  page: {
    type: DOCX.SectionType.NEXT_PAGE,
    // margin: {
    //   top: DOCX.convertMillimetersToTwip(24),
    //   right: DOCX.convertMillimetersToTwip(24),
    //   bottom: DOCX.convertMillimetersToTwip(24),
    //   left: DOCX.convertMillimetersToTwip(24),
    // },
  },
};
