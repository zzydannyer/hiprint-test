import { hiprint, defaultElementTypeProvider } from "vue-plugin-hiprint";
import { DPI } from "./App.vue.js";

export default (await import("vue")).defineComponent({
  name: "App",
  components: {
    HelloWorld,
    ToolBar,
    PrintContainer,
    CanvasEditor,
  },
  beforeCreate() {
    hiprint.init({
      providers: [new defaultElementTypeProvider()],
    });
  },
  mounted() {
    console.log(this.getPPI());
    this.hiprintTemplate = new hiprint.PrintTemplate();
  },
  data() {
    return {
      hiprintTemplate: null,
      previewVisible: false,
      mode: "Portrait", // 打印横竖方向，竖portrait，横Landscape
      templateData,
    };
  },
  computed: {
    page() {
      const width = 8.27 * DPI;
      const height = 11.69 * DPI;
      if (this.mode === "Landscape") {
        return { width: height, height: width };
      }
      return { width, height };
    },
    /** 边距 */
    padding() {
      // 1英寸 = 25.4 毫米
      // 边距为10mm
      return (1 / 25.4) * 10 * DPI;
    },
  },
  methods: {
    getPPI() {
      // 创建一个空的div元素
      var div = document.createElement("div");
      div.style.width = "1in"; // 设置宽度为1英寸
      document.body.appendChild(div); // 添加到文档中

      // 获取该元素的宽度（以像素为单位）
      var ppi = div.offsetWidth;

      // 清理：从文档中移除div
      document.body.removeChild(div);

      // 返回PPI值
      return ppi;
    },

    handleOpen() {
      const modal = document.getElementById("myModal");
      modal.style.display = "block";
    },
    handleClose() {
      const modal = document.getElementById("myModal");
      modal.style.display = "none";
    },

    printByHiprint() {
      const element = document.getElementById("app");
      this.hiprintTemplate.print(element);
    },
    printByPrintThis() {
      $("#app").printThis();
    },
  },
});
