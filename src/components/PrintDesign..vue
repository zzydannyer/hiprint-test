<template>
  <section>
    <section class="header" style="margin: 20px auto">
      <el-button size="small" @click="previewVisible = true">预览</el-button>
      <el-button size="small" @click="print">浏览器打印</el-button>
      <el-button size="small" @click="print2">直接打印</el-button>
      <el-button size="small" @click="exportJson">导出模板</el-button>
      <el-button size="small" @click="importJson">导入模板</el-button>
      <el-button size="small" @click="toPDF">导出PDF</el-button>
    </section>
    <!-- <div id="panelsBox"></div> -->
    <section
      style="
        width: 1120px;
        display: grid;
        grid-template-columns: auto 320px;
        margin: 0 auto;
      "
    >
      <!-- <div id="providerBox"></div> -->
      <div id="designerBox"></div>
      <div id="optionBox"></div>
    </section>
    <el-dialog
      title="预览"
      :visible.sync="previewVisible"
      width="50%"
      @open="preview"
    >
      <div id="preview-container"></div>
    </el-dialog>
  </section>
</template>

<script>
import { hiprint, defaultElementTypeProvider } from "vue-plugin-hiprint";
export default {
  name: "PrintDesign",
  data() {
    return {
      hiprintTemplate: null,
      previewVisible: false,
    };
  },
  beforeCreate() {
    hiprint.init({
      providers: [new defaultElementTypeProvider()],
    });
  },
  mounted() {
    console.log($(".header"));
    this.init();
  },
  methods: {
    init() {
      // hiprint.PrintElementTypeManager.buildByHtml($(".ep-draggable-item"));
      hiprint.PrintElementTypeManager.build($("#providerBox"), "defaultModule");

      this.hiprintTemplate = new hiprint.PrintTemplate({
        // template: {
        //   panels: [
        //     {
        //       width: 210, //mm
        //       height: 297,
        //       printElements: [
        //         {
        //           options: {
        //             left: 10, //pt
        //             top: 10,
        //             width: 100,
        //             height: 100,
        //             title: "文本222",
        //           },
        //           printElements: [
        //             {
        //               title: "文本",
        //               type: "image",
        //             },
        //           ],
        //         },
        //       ],
        //     },
        //   ],
        // },
        settingContainer: $("#optionBox"),
        // paginationContainer: $("#panelsBox"),
      });
      this.hiprintTemplate.design($("#designerBox"), { grid: false });
    },
    preview() {
      let printData = [6666];
      let jqObj = this.hiprintTemplate.getHtml(printData);
      $("#preview-container").html(jqObj);
      console.log("🚀 jqObj", jqObj);
    },
    print() {
      let printData = [{}, {}];
      this.hiprintTemplate.print(printData);
    },
    print2() {
      let printData = {};
      this.hiprintTemplate.print2(printData, {
        printer: "Microsoft Print to PDF",
      });
      this.hiprintTemplate.on("printSuccess", () => {
        console.log("printSuccess");
      });
      this.hiprintTemplate.on("printError", () => {
        console.log("printError");
      });
    },
    exportJson() {
      let json = this.hiprintTemplate.getJson();
      console.log("🚀 exportJson", json);
    },
    toPDF() {
      let printData = {};
      this.hiprintTemplate.toPdf(printData, "test.pdf");
    },
    importJson() {
      let json = {};
      this.hiprintTemplate.update(json);
    },
  },
};
</script>
