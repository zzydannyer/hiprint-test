<template>
  <div id="app">
    <!-- :style="{
      width: `${page.width + 2}px`,
      minHeight: `${page.height + 2}px`,
    }" -->
    <div style="text-align: center">
      <el-button type="primary" size="mini" @click="printByPrintJS">
        PrintJS
      </el-button>
      <el-button type="primary" size="mini" @click="printByhtml2canvasAndjsPdf">
        html2canvas->jsPdf
      </el-button>
      <el-button type="primary" size="mini" @click="printByhtml2pdf">
        html2pdf
      </el-button>
      <el-button type="primary" size="mini" @click="printByHiprint">
        hiprint
      </el-button>
      <el-button type="primary" size="mini" @click="printByPrintThis">
        printThis
      </el-button>
      <el-button type="primary" size="mini" @click="printByPrintPartial">
        printPartial
      </el-button>
      <div id="editor" style="display: none">
        <input type="number" id="fontSizeInput" value="16" min="10" max="36" />
        pt
        <button id="applyFontSize">应用字体大小</button>
      </div>
    </div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <DragTable />
    <FormTable />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import DragTable from "@/components/DragTable";
import FormTable from "@/components/FormTable";
import printJS from "print-js";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import html2pdf from "html2pdf.js";
import { hiprint, defaultElementTypeProvider } from "vue-plugin-hiprint";
import { printPartial } from "./utils";
import "../public/printThis.js";

// 计算分辨率
const arrDPI = [];
const tmpNode = document.createElement("div");
tmpNode.style.cssText =
  "width:1in;height:1in;position:absolute;left:0;top:0;z-index:99;visibility:hidde";
document.body.appendChild(tmpNode);
arrDPI[0] = parseInt(tmpNode.offsetWidth);
arrDPI[1] = parseInt(tmpNode.offsetHeight);
tmpNode.parentNode.removeChild(tmpNode);
const DPI = Math.min(...arrDPI);

$(document).ready(function () {
  var selectedText = "";
  var $selectedCell = null;

  function getSelectedText() {
    if (window.getSelection) {
      var selection = window.getSelection();
      if (selection.rangeCount > 0) {
        return selection.getRangeAt(0).toString();
      }
    } else if (document.selection && document.selection.type != "Control") {
      return document.selection.createRange().text;
    }
    return "";
  }

  $("#app td").mouseup(function (e) {
    selectedText = getSelectedText();
    if (selectedText) {
      $selectedCell = $(e.target);
      $("#editor").show().css({
        top: e.pageY,
        left: e.pageX,
      });
    } else {
      $("#editor").hide();
    }
  });

  $("#applyFontSize").click(function () {
    if (selectedText && $selectedCell) {
      const fontSize = $("#fontSizeInput").val();
      const modifiedHtml = $selectedCell
        .html()
        .replace(
          new RegExp(`(${selectedText})`, "g"),
          `<span style="font-size:${fontSize}px;">$1</span>`
        );
      $selectedCell.html(modifiedHtml);
      $("#editor").hide();
    }
  });
});

export default {
  name: "App",
  components: {
    HelloWorld,
    DragTable,
    FormTable,
  },
  beforeCreate() {
    hiprint.init({
      providers: [new defaultElementTypeProvider()],
    });
  },
  mounted() {
    console.log($(".header"));
    this.hiprintTemplate = new hiprint.PrintTemplate();
  },
  data() {
    return {
      hiprintTemplate: null,
      previewVisible: false,
      mode: "Portrait", // 打印横竖方向，竖portrait，横Landscape
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
    printByPrintJS() {
      printJS({
        printable: "app",
        type: "html",
        header: "PrintJS - Print HTML Elements",
      });
    },
    printByhtml2canvasAndjsPdf() {
      const element = document.getElementById("app");
      html2canvas(element, {
        onclone: (document) => {
          // document.getElementById("print-button").style.visibility = "hidden";
        },
      })
        .then((canvas) => {
          const img = canvas.toDataURL("image/png");
          const pdf = new jsPdf();
          pdf.addImage(img, "JPEG", 0, 0, 842, 595);
          pdf.save("test.pdf");
        })
        .catch(console.error);
    },
    printByhtml2pdf() {
      const element = document.getElementById("app");
      const opt = {
        margin: 1,
        filename: "test.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2 },
        jsPDF: {
          unit: "in",
          format: "letter",
          orientation: "portrait",
        },
      };
      html2pdf().set(opt).from(element).save();
    },
    printByHiprint() {
      const element = document.getElementById("app");
      this.hiprintTemplate.print(element);
    },
    printByPrintThis() {
      $("#app").printThis();
    },
    printByPrintPartial() {
      const element = document.getElementById("app");
      printPartial(element, {
        title: "test",
        mode: this.mode,
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
