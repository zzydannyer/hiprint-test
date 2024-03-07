import { createImageRun } from "./utils";
import {
  Header,
  FrameAnchorType,
  HorizontalPositionAlign,
  VerticalPositionAlign,
  Paragraph,
  TextRun,
} from "docx";
import { wrapTextNum } from "@/utils/constants";

// 封面 和 封底
const frontCover = require("@/assets/frontCover.png");
const backCover = require("@/assets/backCover.png");
const properties = {
  page: {
    margin: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
};

const opt = {
  floating: {
    horizontalPosition: {
      offset: 0,
    },
    verticalPosition: {
      offset: 0,
    },
  },
  width: 794,
  // height: 1123,
};

const frontStyle = {
  bold: true,
  size: 32,
  color: "000000",
};
const frontFrame = {
  type: "absolute",
  width: 4500,
  height: 120,
  anchor: {
    horizontal: FrameAnchorType.MARGIN,
    vertical: FrameAnchorType.MARGIN,
  },
  alignment: {
    x: HorizontalPositionAlign.CENTER,
    y: VerticalPositionAlign.BOTTOM,
  },
};

function createParagraph({ x,y, text }) {
  return new Paragraph({
    frame: {
        position: {
          x: 4600,
          y: 9400,
        },
        ...frontFrame,
      },
      children: [
        new TextRun({
          text: year + "度",
          ...frontStyle,
        }),
      ],
  });
}

export async function createCover({ parentOrgName, name, year }) {
  const frontCoverData = await createImageRun(frontCover, opt);
  const backCoverData = await createImageRun(backCover, opt);
  // 封面
  const frontPage = {
    properties,
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [frontCoverData],
          }),
        ],
      }),
    },
    children: [
      new Paragraph({
        frame: {
          position: {
            x: 4600,
            y: 9400,
          },
          ...frontFrame,
        },
        children: [
          new TextRun({
            text: year + "度",
            ...frontStyle,
          }),
        ],
      }),
      new Paragraph({
        frame: {
          position: {
            x: 4600,
            y: parentOrgName.length > wrapTextNum ? 10000 : 10400,
          },
          ...frontFrame,
        },
        ...frontStyle,
        children: [
          new TextRun({
            text: parentOrgName,
            ...frontStyle,
          }),
        ],
      }),
      new Paragraph({
        frame: {
          position: {
            x: 4600,
            y: name.length > wrapTextNum ? 11000 : 11400,
          },
          ...frontFrame,
        },
        ...frontStyle,
        children: [
          new TextRun({
            text: name,
            ...frontStyle,
          }),
        ],
      }),
    ],
  };
  // 封底
  const backPage = {
    properties,
    children: [
      new Paragraph({
        children: [backCoverData],
      }),
    ],
  };
  return { frontPage, backPage };
}
