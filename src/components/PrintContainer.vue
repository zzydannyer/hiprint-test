<template>
  <!-- <el-dialog> -->
  <section class="print-dialog" style="width: 794px; min-height: 1123px">
    <!-- <div class="print-container-bg" > -->
    <div
      style="width: 794px; min-height: 1123px; box-sizing: border-box"
      id="print-container"
    >
      <div id="test-id">
        777777777777777777 777777777777777777 777777777777777777
        777777777777777777 777777777777777777 777777777777777777
        777777777777777777 777777777777777777 777777777777777777
        777777777777777777 777777777777777777 777777777777777777
        777777777777777777 777777777777777777 777777777777777777
        777777777777777777 777777777777777777 777777777777777777
      </div>
      <!-- <section
        v-for="tempName in defaultTemplateIndexs"
        :key="tempName"
        :id="tempName"
      >
        <DefaultTemplate
          v-for="tData in data[tempName]"
          :temp-name="tempName"
          :key="tData.uid"
          :data="tData"
        />
      </section> -->
      <!-- <CanvasTemplate2 :data="data" /> -->
      <!-- <div
        style="
          border: 1px dashed red;
          width: 100%;
          height: 1px;
          position: absolute;
          top: 297mm;
          left: 0;
        "
      ></div> -->
    </div>
    <!-- </div> -->
  </section>

  <!-- </el-dialog> -->
</template>

<script>
import DragTable from "@/components/DragTable";
import FormTable from "@/components/FormTable";
import DefaultTemplate from "@/components/defaultTemplate.vue";
import CanvasTemplate2 from "./CanvasTemplate2.vue";

export default {
  name: "PrintContainer",
  props: {
    data: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      console,
      defaultTemplateIndexs: [
        "支部情况",
        "党支部委员名单",
        "党小组长名单",
        "党小组管理",
        "党员名册",
        "党员调动记录",
        "帮困记录",
        "谈心谈话",
        "发展党员",
        "党支部大会记录",
        "党支委会会议",
        "党小组会议",
        "党课记录",
        "主题党日",
        "支部年度工作计划",
        "支部年度工作总结",
        "党费",
        "民主生活会",
        "党员民主评议管理",
      ],
    };
  },
  components: {
    DragTable,
    FormTable,
    DefaultTemplate,
    CanvasTemplate2,
  },
};
</script>

<style>
#test-id {
  padding: 20px;
  background-color: #fff;
  border: 1px solid red;
  font-size: 60px;
  page-break-inside: avoid; /* 防止div跨页 */
}

/* 第一页底边 */
#test-id:first-child {
  border-bottom: none;
}

/* 第二页顶边 */
#test-id:last-child {
  border-top: none;
}
</style>
