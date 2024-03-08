import {
	Header,
	Footer,
	PageNumber,
	AlignmentType,
	Paragraph,
	TextRun,
} from 'docx'
// 页眉
export const headers = {
	default: new Header({
		children: [
			//   new Paragraph({
			//     alignment: AlignmentType.CENTER,
			//     children: [
			//       new TextRun({
			//         text: sec.title,
			//         bold: true,
			//       }),
			//     ],
			//   }),
		],
	}),
}
// 页脚
export const footers = {
	default: new Footer({
		children: [
			new Paragraph({
				alignment: AlignmentType.CENTER,
				children: [
					new TextRun({
						children: [PageNumber.CURRENT, '/', PageNumber.TOTAL_PAGES],
						bold: true,
					}),
				],
			}),
		],
	}),
}
