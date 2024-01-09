<!-- 支部情况 -->
<template>
  <section
    class="form-section"
    v-loading="loading"
    :id="`temp_1_uid_${data.uid}_container`"
  >
    <!--     <div
      class="form-container"
      :id="`temp_1_uid_${data.uid}_page_1`"
      :style="{
        padding: `${headerHeight}px ${rightPadding}px ${footerHeight}px ${leftPadding}px`,
      }"
    >
    <table class="form-table">
        <caption class="form-header">
          支部情况
        </caption>
       <thead>
        <tr>
          <th>表头1</th>
          <th>表头2</th>
        </tr>
      </thead> 
        <tbody class="form-tbody">
          <tr :id="`temp_1_uid_${data.uid}_orgName`">
            <td width="64">支部名称</td>
            <td>{{ data.orgName }}</td>
          </tr>
          <tr>
          <td colspan="2">
            支部介绍
            <p :id="'支部介绍page_1'" class="textarea" v-html="data.introduce" />
          </td>
        </tr>
        <tr>
          <td colspan="2">
            照片
            <img
              style="width: 100%"
              src="https://p0.ssl.qhmsg.com/t01da1e4ef25adfd30a.jpg"
            />
          </td>
        </tr> 
        </tbody>
      </table>
      <div class="dashed-line" data-html2canvas-ignore></div>
    </div>-->
  </section>
</template>

<script>
import { mmToPx, getType } from "@/utils";
import { SIZE, TEMP_ENUM } from "@/utils/constants";
// import { addTr, calcRemainHeight } from "@/utils/core";
import PrintCore from "@/utils/core";
export default {
  name: "Template1",
  props: {
    data: {
      type: Array | Object,
      default: () => null,
    },
  },
  inject: ["PPI"],
  data() {
    return {
      printCore: new PrintCore(),
      loading: false,
      headerHeight: 80,
      footerHeight: 80,
      leftPadding: 80,
      rightPadding: 80,
      fontSize: 16, // 字体大小
      lineHeight: 20, // 行高
      pageIndex: 1,
      tempIndex: 1,
      pageTitleHeight: 71,
    };
  },
  computed: {
    templateData() {
      return {
        dataUid: this.data.uid,
        title: {
          name: TEMP_ENUM[1],
        },
        theader: null,
        tbody: [
          [{ content: "支部名称", width: 64 }, this.data.orgName],
          { title: "支部介绍", content: this.data.introduce, colspan: 2 },
          { title: "照片", img: this.data.imgUrl, colspan: 2 },
        ],
      };
    },
  },
  watch: {
    data: {
      handler(val) {
        if (val?.uid) {
          // this.init();
          let template = {
            dataUid: val.uid,
            theader: null,
            tbody: [
              [{ content: "支部名称", width: 64 }, val.orgName],
              { title: "支部介绍", content: val.introduce, colspan: 2 },
              { title: "照片", img: val.imgUrl, colspan: 2 },
            ],
          };
          this.$nextTick(() => {
            this.init2(val, template);
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    init() {
      this.loading = true;
      // 新建第一页
      const [page_1, page_1_tbody, page_1_title] = this.addPage(1, "支部情况");
      // 添加支部名称
      const [org_name_tr] = this.addOrgName(page_1_tbody);
      // 计算标题高度
      const page_1_title_height =
        page_1_title.offsetHeight +
        parseInt(window.getComputedStyle(page_1_title).marginBottom);
      // 计算支部名称高度
      const org_name_tr_height = org_name_tr.offsetHeight;
      // 计算支部介绍宽度和高度
      const introduce_max_width =
        SIZE.WIDTH - this.leftPadding - this.rightPadding; // 容器最大宽度
      const introduce_page_1_max_height =
        SIZE.HEIGHT -
        this.headerHeight -
        this.footerHeight -
        org_name_tr_height -
        page_1_title_height; // 容器最大高度
      // 添加第一页支部介绍
      const [introduce_page_1_tr, introduce_page_1, introduce_page_2] =
        this.addIntroduce(
          page_1_tbody,
          introduce_max_width,
          introduce_page_1_max_height
        );

      // 如果分到第二页
      if (introduce_page_2.length > 0) {
        const [page_2, page_2_tbody, _] = this.addPage(2);
        const introduce_page_2_max_height =
          SIZE.HEIGHT - this.headerHeight - this.footerHeight;

        const [introduce_page_2_tr, introduce_page_2, introduce_page_3] =
          this.addIntroduce(
            page_2_tbody,
            introduce_max_width,
            introduce_page_2_max_height
          );
        if (introduce_page_3.length > 0) {
          const [page_3, page_3_tbody, _] = this.addPage(3);
          const introduce_page_3_max_height =
            SIZE.HEIGHT - this.headerHeight - this.footerHeight;
          const [introduce_page_3_tr, introduce_page_3, introduce_page_4] =
            this.addIntroduce(
              page_3_tbody,
              introduce_max_width,
              introduce_page_3_max_height
            );
        }
      } else {
        //
      }

      this.loading = false;
    },
    init2(data, template) {
      this.printCore.init(data.uid, this.tempIndex);
      this.printCore.addPage(
        this.tempIndex,
        `${this.headerHeight}px ${this.rightPadding}px ${this.footerHeight}px ${this.leftPadding}px`,
        true
      );
      for (let tdOptions of template.tbody) {
        this.printCore.addTr(tdOptions);
      }
      const page1 = document.querySelector(
        `#temp_1_uid_${data.uid}_page_${this.pageIndex}`
      );
      const remaiHeight = this.printCore.calcRemainHeight(page1);
      console.log("🚀 ~ init2 ~ remaiHeight:", remaiHeight);
    },
    // 新建一个空白表单
    addPage(pageIndex, pageTitle) {
      const container = document.querySelector(
        `#temp_1_uid_${this.data.uid}_container`
      );
      const page = document.createElement("div");
      const page_table = document.createElement("table");
      const page_tbody = document.createElement("tbody");
      const page_divider = document.createElement("div");

      page.setAttribute("class", "form-container");
      page.setAttribute("id", `temp_1_uid_${this.data.uid}_page_${pageIndex}`);
      page.style.padding = `${this.headerHeight}px ${this.rightPadding}px ${this.footerHeight}px ${this.leftPadding}px`;
      page_table.setAttribute("class", "form-table");
      page_tbody.setAttribute("class", "form-tbody");
      page_divider.setAttribute("class", "dashed-line");
      page_divider.setAttribute("data-html2canvas-ignore", "");

      container.appendChild(page);
      page.appendChild(page_table);
      // 添加分割线
      page.appendChild(page_divider);
      // 添加标题
      const page_title = pageTitle && this.addCaption(page_table, pageTitle);
      page_table.appendChild(page_tbody);
      return [page, page_tbody, page_title];
    },
    addCaption(targetElement, pageTitle) {
      const caption = document.createElement("caption");
      caption.setAttribute("class", "form-header");
      caption.textContent = pageTitle;
      targetElement.appendChild(caption);
      return caption;
    },

    // addTr,
    addOrgName(targetElement) {
      const tr = document.createElement("tr");
      const titleTd = document.createElement("td");
      const contentTd = document.createElement("td");
      const titleText = document.createTextNode("支部名称");
      const contentText = document.createTextNode(this.data.orgName);
      titleTd.setAttribute("width", "64");
      titleTd.appendChild(titleText);
      contentTd.appendChild(contentText);
      tr.appendChild(titleTd);
      tr.appendChild(contentTd);
      targetElement.appendChild(tr);
      return [tr];
    },
    addIntroduce(targetElement, maxWidth, maxHeight) {
      const tr = document.createElement("tr");
      const [untruncated, truncated] = this.handlePaging(
        this.data.introduce,
        targetElement,
        maxWidth,
        maxHeight,
        "支部介绍:",
        2
      );
      return [tr, untruncated, truncated];
    },
    handlePaging(
      textContent,
      targetElement,
      maxWidth,
      maxHeight,
      blockTitle,
      colspan = 1
    ) {
      // 创建临时div元素
      const td = document.createElement("td");
      td.setAttribute("colspan", colspan);
      td.style.width = maxWidth + "px";
      td.style.fontSize = this.fontSize + "px";
      td.style.whiteSpace = "pre-wrap";
      td.style.overflowWrap = "break-word";
      td.style.boxSizing = "border-box";
      const tr = document.createElement("tr");
      tr.appendChild(td);
      targetElement.appendChild(tr);
      // 存储未截断和截断的文本
      let untruncated = "";
      let truncated = "";

      if (blockTitle) {
        td.textContent += blockTitle + "\n";
      }
      // 逐字添加文本并计算行数
      for (let i = 0; i < textContent.length; i++) {
        td.textContent += textContent[i];
        if (td.offsetHeight >= maxHeight) {
          // 超出最大高度，截断文本
          td.textContent = td.textContent.slice(0, -1);
          // 给td设置高度消除误差
          td.style.height = maxHeight + "px";
          untruncated = textContent.slice(0, i - 1);
          truncated = textContent.slice(i - 1);
          break;
        }
      }
      return [untruncated, truncated];
    },
  },
};
</script>
