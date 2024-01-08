<!-- 支部情况 -->
<template>
  <section
    class="form-section"
    v-loading="loading"
    :id="`temp_1_uid_${data.uid}_container`"
  >
    <div
      class="form-container"
      :id="`temp_1_uid_${data.uid}_page_1`"
      :style="{
        padding: `${headerHeight}px ${rightPadding}px ${footerHeight}px ${leftPadding}px`,
      }"
    >
      <table class="form-table">
        <caption class="form-header">
          <span class="form-title">支部情况</span>
        </caption>
        <!-- <thead>
        <tr>
          <th>表头1</th>
          <th>表头2</th>
        </tr>
      </thead> -->
        <tbody class="form-tbody">
          <tr>
            <td width="64">支部名称</td>
            <td>{{ data.orgName }}</td>
          </tr>
          <!-- <tr>
          <td colspan="2">
            支部介绍
            <p :id="'支部介绍Page1'" class="textarea" v-html="data.introduce" />
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
        </tr> -->
          <!-- 表格内容 -->
        </tbody>
      </table>
      <div class="dashed-line"></div>
    </div>
  </section>
</template>

<script>
import { mmToPx } from "@/utils";
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
      loading: false,
      headerHeight: 80,
      footerHeight: 80,
      leftPadding: 80,
      rightPadding: 80,
      tdPadding: 20,
      borderWidth: 1,
      fontSize: 16, // 字体大小
      lineHeight: 20, // 行高
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      // 示例使用
      // let text = "这是一段测试文本，其中包含\n换行符。";
      const maxWidth =
        794 -
        (this.leftPadding +
          this.rightPadding +
          this.tdPadding * 2 +
          this.borderWidth * 2); // 容器最大宽度
      const maxHeight =
        1123 -
        (this.headerHeight +
          this.footerHeight +
          this.tdPadding * 2 +
          this.borderWidth * 3 +
          61); // 容器最大高度

      const result = this.handlePaging(
        this.data.introduce,
        maxWidth,
        maxHeight
      );
      const page_1_tbody = document.querySelector(
        `#temp_1_uid_${this.data.uid}_page_1 table tbody`
      );
      this.insertElement(page_1_tbody, 2, result.untruncated.text, "支部介绍:");
      console.log("result:", result);

      const container = document.querySelector(
        `#temp_1_uid_${this.data.uid}_container`
      );
      const page_2 = document.createElement("div");
      const page_2_table = document.createElement("table");
      const page_2_tbody = document.createElement("tbody");
      page_2.setAttribute("class", "form-container");
      page_2.setAttribute("id", `temp_1_uid_${this.data.uid}_page_2`);
      page_2.style.padding = `${this.headerHeight}px ${this.rightPadding}px ${this.footerHeight}px ${this.leftPadding}px`;
      page_2_table.setAttribute("class", "form-table");
      page_2_tbody.setAttribute("class", "form-tbody");
      this.insertElement(page_2_tbody, 2, result.truncated.text);
      page_2_table.appendChild(page_2_tbody);
      page_2.appendChild(page_2_table);
      container.appendChild(page_2);
      // console.log("未截断的文本:", result.untruncated.text);
      // console.log("截断的文本:", result.truncated.text);
      this.loading = false;
    },
    handlePaging(text, maxWidth, maxHeight) {
      // 创建临时div元素
      const tempDiv = document.createElement("td");
      tempDiv.style.width = maxWidth + "px";
      tempDiv.style.fontSize = this.fontSize + "px";
      tempDiv.style.lineHeight = this.lineHeight + "px";
      // tempDiv.style.visibility = "hidden";
      tempDiv.style.position = "absolute";
      tempDiv.style.whiteSpace = "pre-wrap";
      tempDiv.style.overflowWrap = "break-word";
      tempDiv.style.border = "1px solid red";
      // tempDiv.style.left = "80px";
      // tempDiv.style.top = "211px";

      document.body.appendChild(tempDiv);

      // 存储未截断和截断的文本
      let untruncatedText = "";
      let truncatedText = "";

      // 逐字添加文本并计算行数
      for (let i = 0; i < text.length; i++) {
        tempDiv.textContent += text[i];
        if (tempDiv.offsetHeight >= maxHeight) {
          // 超出最大高度，截断文本
          untruncatedText = text.slice(0, i);
          truncatedText = text.slice(i);
          break;
        }
      }

      // document.body.removeChild(tempDiv);

      return {
        untruncated: {
          text: untruncatedText,
          lines: Math.floor(tempDiv.offsetHeight / this.lineHeight),
          height: tempDiv.offsetHeight,
        },
        truncated: {
          text: truncatedText,
          // 对截断文本的行数和高度计算可以类似地进行
        },
      };
    },
    insertElement(targetElement, colspan, text, textTitle) {
      // 创建td元素
      const td = document.createElement("td");
      td.setAttribute("colspan", colspan);
      td.style.whiteSpace = "pre-wrap";
      // tempDiv.style.overflowWrap = "break-word";
      td.textContent = textTitle ? textTitle + "\n" + text : text;
      // 创建一个新行 (tr) 并将 td 添加到其中
      const tr = document.createElement("tr");
      tr.appendChild(td);
      // 将 tr 添加到 tbody
      targetElement.appendChild(tr);
    },
  },
};
</script>

<style scoped></style>
