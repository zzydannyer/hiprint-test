import { getType } from "./index.js";
import { TEMPLATES } from "./constants.js";

class PrintCore {
  constructor(data, tempName) {
    this.data = data;
    this.tempName = tempName;
    // 获取当前模板
    this.template = TEMPLATES[this.tempName](this.data);
    // 获取当前模板的内边距
    this.pagePadding = this.template.pagePadding || "80px";
  }
  // 数据
  data;
  // 模板的索引
  tempName;
  // 当前模板
  template;
  // 页面的内边距
  pagePadding;
  // 页面索引
  pageIndex = 1;
  // 基础id
  baseId = "";
  // 当前页的id
  currentPageId = "";
  // 当前页的tbody的id
  currentTargetId = "";
  // 是否可编辑
  mode = "edit";
  // 生成表格
  addTr(options, remainHeight) {
    // 新建tr
    const tr = document.createElement("tr");
    // 挂载tr
    const targetElement = document.getElementById(this.currentTargetId);
    targetElement.appendChild(tr);

    // 截断的部分
    const truncatedList = [];
    for (let option of options) {
      const truncated = this.addTd(tr, option, remainHeight);
      truncatedList.push(truncated);
    }
    if (truncatedList.some((item) => item.content || item.img)) {
      this.pageIndex = this.pageIndex + 1;
      this.addPage();
      // 重新渲染
      const reRenderOption = truncatedList.map((item, index) => ({
        ...options[index],
        content: item.content,
        img: item.img,
        title: remainHeight > 100 ? "" : options[index].title,
      }));
      this.paging(reRenderOption);
    }
  }
  addTd(targetElement, option, maxHeight) {
    const td = document.createElement("td");
    td.style.verticalAlign = "top";

    targetElement.appendChild(td);

    option.colspan && td.setAttribute("colspan", option.colspan); // 设置跨列
    option.width && td.setAttribute("width", option.width); // 设置宽度
    option.align && td.setAttribute("align", option.align); // 设置对齐方式
    option.style && (td.style = option.style); // 设置样式
    // 设置title
    if (option.title) {
      const textNode = document.createTextNode(option.title + "\n");
      td.appendChild(textNode);
    }
    // 截断的部分
    let truncated = {};
    // 设置图片
    if (option.img) {
      const img = document.createElement("img");
      img.setAttribute("src", option.img);
      img.style.width = "100%";
      if (img.offsetHeight >= maxHeight) {
        truncated.img = option.img;
      }
      if (!truncated.img) {
        td.appendChild(img);
      }
    }
    // 设置内容
    if (option.content) {
      const div = document.createElement("div");
      div.style.fontSize = "inherit";
      // 内容区域都加上id
      if (option.key !== "label") {
        div.setAttribute("id", this.currentPageId + "_key_" + option.key);
        div.setAttribute("data-key", option.key);
      }
      // 编辑状态可以编辑
      if (this.mode === "edit" && option.editable) {
        div.setAttribute("contenteditable", "true");
      }
      // div.style.fontSize = "16px";
      td.appendChild(div);
      // 计算分页分割的内容
      for (let i = 0; i < option.content.length; i++) {
        div.textContent += option.content[i];
        if (td.offsetHeight >= maxHeight) {
          // 超出最大高度，截断文本
          div.textContent = div.textContent.slice(0, -1);
          // 给td设置高度消除误差
          td.style.height = maxHeight - 40 + "px";
          // untruncated = textContent.slice(0, i - 1);
          truncated.content = option.content.slice(i - 1);
          break;
        }
      }
    }
    // 判断是否以 "\n" 开头
    if (truncated.content && truncated.content.startsWith("\n")) {
      // 如果是，去掉开头的 "\n"
      truncated.content = truncated.content.substring(1);
    }

    return truncated;
  }

  calcRemainHeight(targetElement) {
    // 获取div的clientHeight
    let totalHeight = targetElement.clientHeight;

    // 获取div的垂直内边距
    let style = window.getComputedStyle(targetElement);
    let paddingTop = parseInt(style.paddingTop, 10);
    let paddingBottom = parseInt(style.paddingBottom, 10);
    paddingTop = isNaN(paddingTop) ? 0 : paddingTop;
    paddingBottom = isNaN(paddingBottom) ? 0 : paddingBottom;

    // 计算内部元素的总高度
    let innerElementsHeight = 0;
    for (let child of targetElement.children) {
      let childStyle = window.getComputedStyle(child);
      let marginTop = parseInt(childStyle.marginTop, 10);
      let marginBottom = parseInt(childStyle.marginBottom, 10);
      marginTop = isNaN(marginTop) ? 0 : marginTop;
      marginBottom = isNaN(marginBottom) ? 0 : marginBottom;

      innerElementsHeight += child.offsetHeight + marginTop + marginBottom;
    }

    // 计算剩余高度（考虑内边距）
    return totalHeight - (innerElementsHeight + paddingTop + paddingBottom);
  }

  /**
   * @description 插入标题
   * @param {*} targetElement tbody
   */
  addCaption(targetElement) {
    const caption = document.createElement("caption");
    caption.setAttribute("class", "form-header");
    caption.textContent = this.tempName;
    targetElement.appendChild(caption);
    return caption;
  }

  /**
   * @description 新建空白页
   * @
   * @param {Boolean} showPageTitle 是否显示标题
   */
  addPage(showPageTitle) {
    // 当前模板下单条数据所展示的页面容器
    const container = document.getElementById(this.baseId + "_container");
    // 单页面的容器
    const page = document.createElement("div");
    // 页面表单
    const page_table = document.createElement("table");
    // 表单内容
    const page_tbody = document.createElement("tbody");
    // 分割线
    const page_divider = document.createElement("div");
    // 设置当前页的id
    this.currentPageId = `${this.baseId}_page_${this.pageIndex}`;
    // 设置当前页的tbody的id
    this.currentTargetId = `${this.currentPageId}_tbody`;
    // 设置当前页面容器样式
    page.setAttribute("class", "form-container");
    // 设置当前页面容器id
    page.setAttribute("id", this.currentPageId);
    // 设置当前页面容器内边距
    page.style.padding = this.pagePadding;
    // 设置页面表单table样式
    page_table.setAttribute("class", "form-table");
    // 设置页面表单tbody样式
    page_tbody.setAttribute("class", "form-tbody");
    // 设置页面表单tbodyid
    page_tbody.setAttribute("id", this.currentTargetId);
    // 设置分割线样式
    page_divider.setAttribute("class", "dashed-line");
    // 设置分割线属性，不参与截图
    page_divider.setAttribute("data-html2canvas-ignore", "");
    // 挂载当前页，顺序不能变
    // 1. 添加当前空白页到容器中
    container.appendChild(page);
    // 2. 添加表单到当前空白页中
    page.appendChild(page_table);
    // 3. 添加分割线
    page.appendChild(page_divider);
    // 4. 添加tbody到表单中
    page_table.appendChild(page_tbody);
    // 5. 添加标题到表单tbody
    showPageTitle && this.addCaption(page_table);
    // 如果有表头，添加表头
    if (this.template.theader) {
      const theader = document.createElement("thead");
      const theader_tr = document.createElement("tr");
      theader.appendChild(theader_tr);
      page_table.appendChild(theader);
      for (let tdOptions of this.template.theader) {
        this.addTd(theader_tr, tdOptions, 1000);
      }
    }
  }
  // 渲染tr前判断是否还有高度，是否需要新建一页
  paging(options) {
    // 获取当前页
    const currentPage = document.getElementById(this.currentPageId);
    // 计算当前页剩余高度
    const remainHeight = this.calcRemainHeight(currentPage);
    // 如果剩余高度大于0，继续渲染
    if (remainHeight > 0) {
      this.addTr(options, remainHeight);
    } else {
      // 否则新建一页
      this.pageIndex = this.pageIndex + 1;
      this.addPage();
      this.addTr(options, remainHeight);
    }
  }
  render() {
    return new Promise((resolve, reject) => {
      // 获取当前模板下单条数据所展示的页面容器 根据uid分
      this.baseId = `${this.tempName}_uid_${this.data.uid}`;
      const container = document.getElementById(this.baseId + "_container");
      // 查看状态不能选择
      if (this.mode === "view") {
        container.style.userSelect = "none";
      }
      requestIdleCallback(() => {
        // 添加第一页
        this.addPage(true);
        // 循环添加内容
        for (let tdOptions of this.template.tbody) {
          // requestIdleCallback(() => {
          this.paging(tdOptions);
          // });
        }
      });
      resolve();
    });
  }
}

export default PrintCore;
