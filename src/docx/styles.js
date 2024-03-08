import * as DOCX from 'docx'
export default {
	default: {
		document: {
			run: {
				font: 'SimSun',
			},
		},
	},
	paragraphStyles: [
		{
			id: 'pageTitle',
			name: 'pageTitle',
			basedOn: 'Normal',
			next: 'Normal',
			run: {
				color: '000000',
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
			id: 'cellParagraph',
			name: 'cellParagraph',
			basedOn: 'Normal',
			next: 'Normal',
			run: {
				color: '000000',
				size: 14,
			},
			// paragraph: {
			//   spacing: {
			//     // 段前距离，以磅为单位
			//     before: 140,
			//     // 段后距离
			//     after: 100, // 100磅 = 大约1行
			//     // 行间距（240 = 单倍行距，360 = 1.5倍行距，480 = 双倍行距）
			//     line: 276, //
			//   },
			//   indent: {
			//     left: 100, // 左边距
			//     right: 100, // 右边距
			//   },
			// },
		},
	],
}

export const pageTitleStyle = {
	style: 'pageTitle',
	alignment: DOCX.AlignmentType.CENTER, // 文字居中
	shading: {
		type: DOCX.ShadingType.CLEAR, // 背景类型
		color: 'auto',
		fill: 'F7F7F7', // 背景颜色为 #f7f7f7
	},
	border: {
		top: {
			color: 'F7F7F7',
			size: 40,
			space: 0,
			style: DOCX.BorderStyle.SINGLE,
		},
		bottom: {
			color: 'F7F7F7',
			size: 40,
			space: 0,
			style: DOCX.BorderStyle.SINGLE,
		},
	},
}

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
}

// 预览是插入DOM的样式
export const previewStyle = ({ parentOrgNameTop, nameTop }) => {
	return `
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
      top: ${parentOrgNameTop}px !important;
      left: 310px !important;
    }
    .docx-preview-document-wrapper .docx-preview-document:first-child article p:nth-child(3){
      top: ${nameTop}px !important;
      left: 310px !important;
    }
	.docx-preview-document-wrapper .docx-preview-document article table table{
		width: 100% !important;
	}
	.docx-preview-document-wrapper .docx-preview-document article table table colgroup col{
		width: auto !important;
	}
	.docx-preview-document-wrapper .docx-preview-document article table table,
	.docx-preview-document-wrapper .docx-preview-document article table table td{
		border: 1pt solid #aaa !important;
	}
`
}
