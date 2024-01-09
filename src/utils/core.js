import { getType } from "./index.js";
import { TEMP_ENUM } from "./constants.js";

class PrintCore {
  // 数据的uid
  dataUid = "";
  // 模板的索引
  tempIndex = 0;
  // 页面索引
  pageIndex = 1;
  init(dataUid, tempIndex) {
    this.dataUid = dataUid;
    this.tempIndex = tempIndex;
  }
  // 生成表格
  addTr(options) {
    if (!options) return;
    let type = getType(options);
    let tr = document.createElement("tr");
    let tds = [];
    // 挂载tr
    let targetElement = document.querySelector(
      `#temp_${this.tempIndex}_uid_${this.dataUid}_page_${this.pageIndex} tbody`
    );
    targetElement.appendChild(tr);
    let result = null;

    function addTd(option) {
      const td = document.createElement("td");
      tr.appendChild(td);
      const _type = getType(option);
      if (_type === "Object") {
        option.colspan && td.setAttribute("colspan", option.colspan); // 设置跨列
        option.width && td.setAttribute("width", option.width); // 设置宽度
        option.align && td.setAttribute("align", option.align); // 设置对齐方式
        // 设置title
        if (option.title) {
          const textNode = document.createTextNode(option.title + "\n");
          td.appendChild(textNode);
        }
        // 设置内容
        if (option.content) {
          td.textContent += option.content;
        }
        // 设置图片
        if (option.img) {
          const img = document.createElement("img");
          img.setAttribute("src", option.img);
          img.style.width = "100%";
          td.appendChild(img);
        }
      } else {
        // 如果传入option是字符串
        td.textContent += option;
      }

      tds.push(td);
    }
    // 如果传入options是数组
    if (type === "Array") {
      for (let option of options) {
        addTd(option);
      }
    } else {
      addTd(options);
    }

    return {
      tr,
      tds,
    };
  }

  // 计算分页分割的内容
  paging() {}

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
    let remainHeight =
      totalHeight - (innerElementsHeight + paddingTop + paddingBottom);
    return remainHeight;
  }
  addCaption(targetElement) {
    let caption = document.createElement("caption");
    caption.setAttribute("class", "form-header");
    caption.textContent = TEMP_ENUM[this.tempIndex];
    targetElement.appendChild(caption);
    return caption;
  }

  /**
   * 新建空白页
   * @param {*} tempIndex  模板索引 constants/TEMP_ENUM
   * @param {*} dataUid  数据的uid
   * @param {*} pagePadding 页面的边距
   * @param {*} pageTitle 页面标题
   */
  addPage(tempIndex, pagePadding, hasPageTitle) {
    const container = document.querySelector(
      `#temp_${tempIndex}_uid_${this.dataUid}_container`
    );

    const page = document.createElement("div");
    const page_table = document.createElement("table");
    const page_tbody = document.createElement("tbody");
    const page_divider = document.createElement("div");

    page.setAttribute("class", "form-container");
    page.setAttribute(
      "id",
      `temp_${tempIndex}_uid_${this.dataUid}_page_${this.pageIndex}`
    );
    page.style.padding = pagePadding;
    page_table.setAttribute("class", "form-table");
    page_tbody.setAttribute("class", "form-tbody");
    page_divider.setAttribute("class", "dashed-line");
    page_divider.setAttribute("data-html2canvas-ignore", "");

    container.appendChild(page);
    page.appendChild(page_table);
    // 添加分割线
    page.appendChild(page_divider);
    // 添加标题
    const page_title = hasPageTitle && this.addCaption(page_table);
    page_table.appendChild(page_tbody);
    return [page, page_tbody, page_title];
  }
}

export default PrintCore;
