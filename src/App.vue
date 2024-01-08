<template>
  <div id="app">
    <!-- :style="{
      width: `${page.width + 2}px`,
      minHeight: `${page.height + 2}px`,
    }" -->

    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="handleClose"> &times; </span>
        <div> -->

    <PrintContainer :data="templateData.template1" />
    <ToolBar />
    <div style="text-align: center">
      <el-button type="primary" size="mini" @click="handleOpen">
        编辑打印
      </el-button>

      <el-button type="primary" size="mini" @click="printByHiprint">
        hiprint
      </el-button>
      <el-button type="primary" size="mini" @click="printByPrintThis">
        printThis
      </el-button>

      <div id="editor" style="display: none">
        <input type="number" id="fontSizeInput" value="16" min="10" max="36" />
        pt
        <button id="applyFontSize">应用字体大小</button>
      </div>
    </div>
    <!-- </div>
      </div>
    </div> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <CanvasEditor /> -->
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import ToolBar from "@/components/ToolBar.vue";
import PrintContainer from "@/components/PrintContainer.vue";

import "../public/printThis.js";
import templateData from "./data";

import CanvasEditor from "./components/CanvasEditor.vue";

// 计算分辨率

// $(document).ready(function () {
//   var selectedText = "";
//   var $selectedCell = null;

//   function getSelectedText() {
//     if (window.getSelection) {
//       var selection = window.getSelection();
//       if (selection.rangeCount > 0) {
//         return selection.getRangeAt(0).toString();
//       }
//     } else if (document.selection && document.selection.type != "Control") {
//       return document.selection.createRange().text;
//     }
//     return "";
//   }

//   $("#app td").mouseup(function (e) {
//     selectedText = getSelectedText();
//     if (selectedText) {
//       $selectedCell = $(e.target);
//       $("#editor").show().css({
//         top: e.pageY,
//         left: e.pageX,
//       });
//     } else {
//       $("#editor").hide();
//     }
//   });

//   $("#applyFontSize").click(function () {
//     if (selectedText && $selectedCell) {
//       const fontSize = $("#fontSizeInput").val();
//       const modifiedHtml = $selectedCell
//         .html()
//         .replace(
//           new RegExp(`(${selectedText})`, "g"),
//           `<span style="font-size:${fontSize}px;">$1</span>`
//         );
//       $selectedCell.html(modifiedHtml);
//       $("#editor").hide();
//     }
//   });
// });

export default {
  name: "App",
  components: {
    HelloWorld,
    ToolBar,
    PrintContainer,
    CanvasEditor,
  },
  provide() {
    return {
      PPI: this.PPI,
    };
  },
  beforeCreate() {
    // hiprint.init({
    //   providers: [new defaultElementTypeProvider()],
    // });
  },
  mounted() {
    console.log("PPI", this.getPPI());
    // this.hiprintTemplate = new hiprint.PrintTemplate();
  },
  data() {
    return {
      // hiprintTemplate: null,
      PPI: this.getPPI(),
      previewVisible: false,
      mode: "Portrait", // 打印横竖方向，竖portrait，横Landscape
      templateData,
    };
  },
  computed: {
    page() {
      // const width = 8.27 * DPI;
      // const height = 11.69 * DPI;
      // if (this.mode === "Landscape") {
      //   return { width: height, height: width };
      // }
      // return { width, height };
    },
    /** 边距 */
    padding() {
      // 1英寸 = 25.4 毫米
      // 边距为10mm
      // return (1 / 25.4) * 10 * DPI;
    },
  },
  methods: {
    getPPI() {
      const arrDPI = [];
      const tmpNode = document.createElement("div");
      tmpNode.style.cssText =
        "width:1in;height:1in;position:absolute;left:0;top:0;z-index:99;visibility:hidde";
      document.body.appendChild(tmpNode);
      arrDPI[0] = parseInt(tmpNode.offsetWidth);
      arrDPI[1] = parseInt(tmpNode.offsetHeight);
      tmpNode.parentNode.removeChild(tmpNode);
      return Math.min(...arrDPI);
      // const div = document.createElement("div");
      // div.style.width = "1in";
      // document.body.appendChild(div);
      // const ppi = div.offsetWidth;
      // document.body.removeChild(div);
      // return ppi;
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
};
</script>

<style>
@import "@/styles/printStyle.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
