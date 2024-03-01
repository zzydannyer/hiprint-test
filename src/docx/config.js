// Example of how to change page borders

import { Document, HeadingLevel, Packer, Paragraph, Tab, TextRun } from "docx";

const doc = new Document({
    sections: [
        {
            properties: {
                page: {
                    // 页边距
                    margin: {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                    },
                },
            },
            children: [
                new Paragraph({
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({
                            text: "Foo bar",
                            bold: true,
                        }),
                        new TextRun({
                            children: [new Tab(), "Github is the best"],
                            bold: true,
                        }),
                    ],
                }),
                new Paragraph({
                    text: "Hello World",
                    heading: HeadingLevel.HEADING_1,
                }),
                new Paragraph("Foo bar"),
                new Paragraph("Github is the best"),
            ],
        },
    ],
});

export default {

}