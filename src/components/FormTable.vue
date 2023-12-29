<template>
  <table>
    <tr>
      <td colspan="4">
        会议主题或主要内容：
        <div>{{ form.topic }}</div>
      </td>
    </tr>
    <tr>
      <td colspan="4">
        出席：
        <div>{{ form.attend }}</div>
      </td>
    </tr>
    <tr>
      <td colspan="4">
        缺席：
        <div>{{ form.member }}</div>
      </td>
    </tr>
    <tr>
      <td>主持人</td>
      <td>{{ form.compere }}</td>
      <td>记录人</td>
      <td>{{ form.recorder }}</td>
    </tr>
    <tr>
      <td colspan="4">
        会议记录：
        <div>{{ form.record }}</div>
      </td>
    </tr>
    <tr>
      <td>备注</td>
      <td colspan="3">{{ form.remark }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "CustomTable",
  data() {
    return {
      // 示例表格数据
      form: {
        topic: "第⼀党⽀部四季度党员⼤会",
        attend: "全体出席",
        absent: "无",
        compere: "李四",
        recorder: "张三",
        record: `1、党课《弘扬党的光荣传统，践⾏党的优良作⻛》；
                    ——公司领导陈冠雄
                    2、2023年度⽀部⼯作总结；
                    3、2024年度⽀部⼯作计划；
                    4、“元旦、春节”节前党⻛廉政教育学习；
                    5、公司领导讲话。`,
        remark: "备注",
      },
    };
  },
};
</script>

<style>
table {
  border-collapse: collapse;
  width: 100%;
}

td {
  border: 1px solid black;
  text-align: left;
  padding: 20px;
}
</style>
