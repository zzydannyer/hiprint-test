<template>
  <!-- <el-dialog> -->
  <section class="print-dialog">
    <!-- <div class="print-container-bg" > -->
    <div style="width: 794px" id="print-container">
      <!-- <Template1 :data="tData" v-for="tData in data" :key="tData.uid" /> -->
      <CanvasTemplate2 :data="data" />
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
      type: Array | Object,
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
