<template>
  <!-- <el-dialog> -->
  <section class="print-dialog" style="width: 794px; min-height: 1123px">
    <!-- <div class="print-container-bg" > -->
    <div
      style="width: 794px; min-height: 1123px; box-sizing: border-box"
      id="print-container"
    >
      <template v-if="true">
        <Template1
          v-for="tData in data.template1"
          :key="tData.uid"
          :data="tData"
        />
      </template>
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
import Template1 from "@/components/Template1.vue";
import CanvasTemplate2 from "./CanvasTemplate2.vue";

export default {
  name: "PrintContainer",
  props: {
    data: {
      type: Object,
      default: () => null,
    },
  },
  components: {
    DragTable,
    FormTable,
    Template1,
    CanvasTemplate2,
  },
};
</script>

<style lang="scss" scoped></style>
