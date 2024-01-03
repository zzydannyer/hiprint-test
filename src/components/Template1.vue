<template>
  <section style="width: 794px; font-size: 16px">
    <table>
      <caption
        style="
          color: #323232;
          text-align: center;
          font-size: 18px;
          font-weight: 500;
          padding: 10px 0;
          background: #f9f9f9;
          margin-bottom: 10mm;
        "
      >
        支部情况
      </caption>
      <!-- <thead>
        <tr>
          <th>表头1</th>
          <th>表头2</th>
        </tr>
      </thead> -->
      <tbody>
        <tr>
          <td width="80">支部名称</td>
          <td>{{ data.orgName }}</td>
        </tr>
        <tr>
          <td colspan="2">
            支部介绍：
            <p class="textarea" v-html="data.introduce" />
          </td>
        </tr>
        <!-- 表格内容 -->
      </tbody>
    </table>
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
};
</script>

<style scoped></style>
