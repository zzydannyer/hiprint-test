<template>
  <section class="form-section" :id="'支部情况container' + data.uid">
    <div :id="'支部名称page' + pageIndex">
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
            <td width="80">支部名称</td>
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
    </div>
  </section>
</template>

<script>
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
      pageIndex: 1,
    };
  },
  methods: {
    findRemainingTextAfterPageBreak(id, text) {
      let page = document.getElementById("page");
      page.innerHTML = "";

      let words = text.split(" ");
      let currentPageText = "";

      for (let i = 0; i < words.length; i++) {
        page.innerHTML = currentPageText + words[i] + " ";
        if (page.scrollHeight > page.offsetHeight) {
          // 返回从当前单词开始到文本结束的部分
          return words.slice(i).join(" ");
        }
        currentPageText += words[i] + " ";
      }
      return ""; // 如果整个文本都适合一页，则没有剩余的文本
    },
  },
};
</script>

<style scoped></style>
