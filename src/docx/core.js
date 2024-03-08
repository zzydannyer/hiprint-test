import CONSTANTS, { compatibility } from '@/utils/constants'
import TEMP_DATA from '@/data'
import { renderAsync } from 'docx-preview'
import styles, { pageTitleStyle, sectionStyle, previewStyle } from './styles'
import { saveAs } from 'file-saver'
import { cloneDeep } from 'lodash'
import { convertImageToBase64 } from '@/utils'
import { dictsMap, wrapTextNum, previewOpt } from '@/utils/constants'
import { createCover } from './cover'
import { headers, footers } from './header'
import {
	Document,
	WidthType,
	PageOrientation,
	TextRun,
	Paragraph,
	ImageRun,
	Table,
	TableCell,
	TableRow,
	VerticalAlign,
	TextDirection,
	ShadingType,
	TableBorders,
	Packer,
} from 'docx'
// import { Buffer } from "buffer";
// window.Buffer = Buffer;
const actives = [
	// 'branchInfo',
	// 'committeeLeader',
	// 'groupLeader',
	// 'memberGroup',
	// 'formalMember',
	// 'memberTransfer',
	// 'help',
	// 'talk',
	// 'developMember',
	// 'branch',
	// 'brach',
	// 'orgLifeRecord',
	// 'lessonRecord',
	'plan',
	// 'summary',
	// 'partyDuesSummary',
	// 'deliberation',
]
const TEST_NAME = '明东公司工程技术部党总支-工程技术部综合设施组党支部'
// 生成文档
class DocumentCreator {
	blob
	parentOrgName
	name
	constructor({ parentOrgName, name, year }) {
		this.parentOrgName = parentOrgName ?? TEST_NAME
		this.name = name ?? TEST_NAME
		this.year = year ?? new Date().getFullYear()
	}
	async create() {
		const DATA = this.processingData(TEMP_DATA)
		const _pages = []

		for (let active of actives) {
			const temp = CONSTANTS.TEMPLATES[active]
			if (temp.type === 'FORM') {
				const formDatas = DATA[active]
				for (let formData of formDatas) {
					_pages.push(this.convertForm(temp, formData))
				}
			} else if (temp.type === 'TABLE') {
				_pages.push(this.convertTable(temp, DATA[active]))
			} else {
				throw new Error('Invalid template type')
			}
		}
		const pages = await Promise.all(_pages)
		const sections = []

		for (let sec of pages) {
			const titleSec = this.createTitle(sec.title)
			const tableSec = await this.createTable(sec)
			const LANDSCAPE = {
				page: {
					size: {
						orientation: PageOrientation.LANDSCAPE,
					},
				},
			}

			const docSec = {
				properties: sec.title === '党费' ? LANDSCAPE : sectionStyle,
				headers,
				footers,
				children: [titleSec, tableSec],
			}
			sections.push(docSec)
		}

		// 添加封面和封底
		const { frontPage, backPage } = await createCover({
			parentOrgName: this.parentOrgName,
			name: this.name,
			year: this.year,
		})

		sections.unshift(frontPage)
		sections.push(backPage)

		const doc = new Document({
			// 兼容性
			compatibility,
			styles,
			sections,
		})
		return this.toBlob(doc)
	}
	// 数据处理
	processingData(_data) {
		const data = cloneDeep(_data)
		// 把branchInfo转成数组
		data.branchInfo = [_data.branchInfo]
		// 处理发展对象 人员阶段字典项
		data.developMember = _data.developMember.map((item) => ({
			...item,
			status: dictsMap.developMemberStatus[item.status],
		}))
		// 处理党费
		for (let i = 0; i < _data.partyDuesSummary.length; i++) {
			let sum = 0
			const { name, datas } = _data.partyDuesSummary[i]
			const item = datas.reduce((acc, cur) => {
				sum += Number(cur.collectionMoney)
				const month = cur.collectionMonth.split('-')[1]
				acc[month] = cur.collectionMoney
				return acc
			}, {})
			let summary = sum.toFixed(2)
			data.partyDuesSummary[i] = { name, summary, ...item }
		}
		return data
	}
	convertForm(form, data) {
		const rows = []
		let index = 0
		for (let item of form.data) {
			if (!rows[index]) {
				rows[index] = []
			}
			// 换行
			const total = rows[index].reduce((acc, cur) => acc + cur.colSpan, 0)
			if (total > form.colSpan) {
				throw new Error('Invalid form item')
			} else if (total === form.colSpan) {
				rows[++index] = []
			} else {
			}

			if ('label' in item) {
				const [labelWidth, valueWidth] = item.widths
				const label = {
					text: item.label,
					type: item.type,
					colSpan: 1,
					width: labelWidth,
				}
				const content = {
					text: data[item.prop],
					type: item.type,
					colSpan: item.colSpan - 1,
					width: valueWidth,
				}
				rows[index].push(label, content)
			} else if ('indent' in item) {
				rows[index].push({
					indent: item.indent,
					text: data[item.prop],
					colSpan: form.colSpan,
					type: item.type,
					width: 9010,
				})
			} else {
				throw new Error('Invalid form item')
			}
		}

		return { rows, ...form }
	}
	convertTable(table, data) {
		const tableHeader = table.data.map((item) => ({
			text: item.label,
			type: item.type ?? 'text',
			width: item.width,
		}))
		const tableRows = data.map((item) =>
			table.data.map((cell) => ({
				text: item[cell.prop],
				type: item.type ?? 'text',
				width: cell.width,
			}))
		)
		return { rows: [tableHeader, ...tableRows], ...table }
	}

	createTitle(title) {
		const TIT_TEXT = new TextRun({
			text: title,
			color: '000000', // 文字颜色为黑色
			bold: true,
		})
		const TIT_PAR = new Paragraph({
			children: [TIT_TEXT],
			...pageTitleStyle,
		})
		return TIT_PAR
	}
	async createTable(template) {
		const columnWidths =
			template.type === 'FORM'
				? template.columnWidths
				: template.data.map((i) => i.width)
		const opt = {
			// columnWidths,
			margins: {
				top: 100,
				bottom: 100,
				left: 100,
				right: 100,
			},
			width: {
				size: template.title === '党费' ? 13970 : 9010,
				type: WidthType.DXA,
			},
			indent: {
				size: 100,
				type: WidthType.DXA,
			},
		}

		const rows = await this.handleTemplate(template.rows, template.type)
		return new Table({
			rows,
			...opt,
		})
	}

	// 生成文字
	createTextRun(text, opts = {}) {
		return new TextRun({
			text,
			break: opts.break || 0,
		})
	}
	// 生成段落
	createParagraph(children, opt = {}) {
		return new Paragraph({
			style: opt.style ?? 'cellParagraph',
			...opt,
			children,
		})
	}
	// 生成图片
	createImageRun(data, opt = {}) {
		return new Promise((resolve) => {
			const imgUrl = data ?? require('@/assets/branchInfo.png')
			convertImageToBase64(imgUrl, (imgData) => {
				const width = opt.width ?? 572
				const ratio = opt.ratio ?? imgData.ratio ?? 1
				const height = opt.height ?? width / ratio
				resolve(
					new ImageRun({
						data: imgData.url,
						transformation: {
							width,
							height,
						},
						...opt,
					})
				)
			})
		})
	}

	// 生成单元格
	createTableCell(children, cell, opt = {}) {
		return new TableCell({
			width: {
				size: cell.width,
				type: WidthType.DXA,
			},
			columnSpan: cell.colSpan ?? 1,
			verticalAlign: VerticalAlign.CENTER,
			textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
			...opt,
			children,
		})
	}
	// 生成表格行
	createTableRow(children, opt = {}) {
		return new TableRow({
			...opt,
			children,
		})
	}
	// 根据模板生成表单
	async handleTemplate(rows, type) {
		const tableRows = []
		for (const rowIndex in rows) {
			const row = rows[rowIndex]
			const tableRow = []
			const isTableHeader = type === 'TABLE' && rowIndex === '0'
			for (const cell of row) {
				const paragraph = []

				// 表单内容的标题
				if (cell.indent) {
					paragraph.push(this.createTextRun(cell.indent))
				}

				// 单元格文字内容
				if (cell.type === 'text') {
					const opt = cell.indent ? { break: 1 } : {}
					paragraph.push(this.createTextRun(cell.text, opt))
				} else if (cell.type === 'null') {
					paragraph.push(this.createTextRun(cell.text ?? ''))
				}
				// 每个cell里套一层paragraph
				let tableCell

				// 表单中的富文本
				if (cell.type === 'html') {
					let htmString = cell.text.replace(/[\t\n\r]/g, '')
					const htmlDOM = new DOMParser().parseFromString(
						htmString,
						'text/html'
					)
					const DOMContent = htmlDOM.body
					// document.body.appendChild(DOMContent)

					tableCell = this.HTML2DocxConfig(DOMContent)
				} else {
					tableCell = [this.createParagraph(paragraph)]
				}
				// 表单中的图片
				if (cell.type === 'img') {
					const img = await this.createImageRun(cell.text)
					tableCell.push(this.createParagraph([img]))
				}

				const headerCellStyle = {
					type: ShadingType.CLEAR,
					color: 'auto',
					fill: 'F7F7F7',
				}
				// 把一串cell放到一行row里
				tableRow.push(
					this.createTableCell(tableCell, cell, {
						shading: isTableHeader ? headerCellStyle : undefined,
					})
				)
			}
			tableRows.push(
				this.createTableRow(tableRow, {
					tableHeader: isTableHeader,
				})
			)
		}
		return tableRows
	}
	HTML2DocxConfig(element) {
		let docxElements = []
		let that = this
		function processParagraph(pElement) {
			const textRuns = Array.from(pElement.childNodes).map((node) => {
				if (node.nodeType === 3) {
					return that.createTextRun(node.textContent)
				} else if (node.nodeType === 1) {
					return that.createTextRun(node.innerHTML)
				}
			})
			return that.createParagraph(textRuns)
		}

		function processCell(cellElement) {
			const paragraphs = Array.from(cellElement.querySelectorAll('p')).map(
				processParagraph
			)
			const cellOptions = {
				children: paragraphs,
				verticalAlign: VerticalAlign.CENTER,
				textDirection: TextDirection.LEFT_TO_RIGHT_TOP_TO_BOTTOM,
			}

			if (cellElement.hasAttribute('colspan')) {
				cellOptions.columnSpan = cellElement.getAttribute('colspan') * 1
			}

			if (cellElement.hasAttribute('rowspan')) {
				cellOptions.rowSpan = cellElement.getAttribute('rowspan') * 1
			}

			return new TableCell(cellOptions)
		}

		function processRow(rowElement) {
			const cells = Array.from(rowElement.querySelectorAll('td, th')).map(
				processCell
			)
			return new TableRow({ children: cells })
		}

		function processTable(tableElement) {
			const rows = Array.from(tableElement.querySelectorAll('tr')).map(
				processRow
			)
			return new Table({
				rows,
				borders: TableBorders.NONE,
				margins: {
					top: 50,
					bottom: 50,
					left: 50,
					right: 50,
				},
				width: {
					size: 100, // 示例宽度
					type: WidthType.PERCENTAGE,
				},
				indent: {
					size: 50,
					type: WidthType.DXA,
				},
			})
		}

		function processElement(element) {
			switch (element.tagName) {
				case 'TABLE':
					docxElements.push(processTable(element))
					break
				case 'P':
					docxElements.push(processParagraph(element))
					break
				// 实现其他标签的处理逻辑...
			}
		}

		function traverseElements(element) {
			for (let e of element.children) {
				if (e.tagName) {
					processElement(e)
				}
			}
		}
		traverseElements(element) // 从给定的根元素开始遍历
		return docxElements
	}
	// 存储为blob
	toBlob(doc) {
		return new Promise(async (resolve, reject) => {
			try {
				const blob = await Packer.toBlob(doc)
				this.blob = blob
				resolve(blob)
			} catch (err) {
				console.error(err)
				reject(err)
			}
		})
	}
	// 保存
	save() {
		if (!this.blob) throw new Error('没有成功生成文档')
		const year = new Date().getFullYear()
		saveAs(this.blob, year + '年度党支部套打文档.docx')
	}
	// 预览
	preview() {
		if (!this.blob) throw new Error('没有成功生成文档')
		return new Promise(async (resolve, reject) => {
			const container = document.querySelector('#previewContainer')
			if (!container) {
				reject('没有找到预览容器')
				return
			}
			await renderAsync(this.blob, container, null, previewOpt)
			// 要插入的样式
			const parentOrgNameTop =
				this.parentOrgName.length > wrapTextNum ? 675 : 695
			const nameTop = this.name.length > wrapTextNum ? 745 : 765
			const customStyle = previewStyle({
				parentOrgNameTop,
				nameTop,
			})
			// 创建一个 style 元素
			const styleElement = document.createElement('style')
			const target = document.getElementById('previewContainer')
			// 插入样式内容
			styleElement.appendChild(document.createTextNode(customStyle))
			// 将样式插入到 head 元素中
			target.appendChild(styleElement)
			resolve(true)
		})
	}
}

export default DocumentCreator
