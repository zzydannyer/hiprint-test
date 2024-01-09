<template>
  <div>
    <el-button type="primary" size="mini" @click="printByPrintPartial">
      printPartial
    </el-button>
    <el-button type="primary" size="mini" @click="printByPrintJS">
      PrintJS
    </el-button>
    <el-button type="primary" size="mini" @click="printByhtml2canvas">
      html2canvas
    </el-button>
    <el-button type="primary" size="mini" @click="printByhtml2canvasAndjsPdf">
      html2canvas->jsPdf
    </el-button>
    <el-button type="primary" size="mini" @click="printPage">
      printPage
    </el-button>
    <el-button type="primary" size="mini" @click="printByhtml2pdf">
      html2pdf
    </el-button>
  </div>
</template>

<script>
import { printPartial } from "../utils";
import printJS from "print-js";
import html2canvas from "html2canvas";
import jsPdf from "jspdf";
import html2pdf from "html2pdf.js";

export default {
  name: "ToolBar",
  methods: {
    printByPrintPartial() {
      const element = document.getElementById("print-container");
      printPartial(element, {
        title: "test",
        mode: this.mode,
      });
    },
    printByPrintJS() {
      printJS({
        printable: "print-container",
        type: "html",
        header: "PrintJS - Print HTML Elements",
      });
    },
    printByhtml2canvas() {
      const option = {
        width: 794,
        x: 0,
        // y: 1123,
        useCORS: true,
      };
      const element = document.getElementById("print-container");
      html2canvas(element, option).then((canvas) => {
        // document.body.appendChild(canvas);
        const url = canvas.toDataURL("image/jpg");
        const img = document.createElement("img");
        img.src = url;
        img.width = 794;
        img.style.border = "1px solid red";
        img.onload = () => {
          document.body.appendChild(img);
        };
      });
    },
    printByhtml2canvasAndjsPdf() {
      const element = document.getElementById("print-container");
      html2canvas(element, {
        onclone: (document) => {
          // document.getElementById("print-button").style.visibility = "hidden";
        },
      })
        .then((canvas) => {
          const img = canvas.toDataURL("image/png");
          const pdf = new jsPdf();
          pdf.addImage(img, "JPEG", 0, 0, 794, 1123);
          const pdfBlob = new Blob([pdf], { type: "application/pdf" });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const printWindow = window.open(pdfUrl);
          printWindow.print();
          printWindow.close();
          URL.revokeObjectURL(pdfUrl);
          // pdf.save("test.pdf");
        })
        .catch(console.error);
    },
    printByhtml2pdf() {
      const element = document.getElementById("print-container");
      const opt = {
        html2canvas: {
          // allowTaint: true,
          useCORS: true,
        },
      };
      html2pdf().set(opt).from(element).save();
    },
    printPage() {
      let iframe = document.getElementById("print-iframe");
      if (iframe) {
        document.body.removeChild(iframe);
      }
      let el = document.getElementById("print-container");
      iframe = document.createElement("iframe");
      iframe.setAttribute("id", "print-iframe");
      iframe.setAttribute(
        "style",
        "position:absolute;width:0px;height:0px;left:-500px;top:-500px;"
      );
      document.body.appendChild(iframe);
      iframe.contentDocument.body.innerHTML = `
                <style>
                    @page {margin-bottom: 0mm;margin-top: 0mm;}
                    #print-preview .pageSeparator{visibility:hidden; page-break-after:always; overflow:hidden; height:0px;}
                    #print-preview {padding: 10px 97x;text-align:center;color:#333333;font-family: "宋体";}
                    #print-preview .top-text{position: relative;left: 350px;font-size: 18px;margin: 130px 0 50px 0;}
                    #print-preview .title {font-size:35px;color:#333333;line-height:44px;font-weight: bold;margin-top:140px;}
                    #print-preview .cover-title1 {font-size:52px;font-weight: bold;margin-top:30px;}
                    #print-preview .cover-title2 {font-size:52px;font-weight: bold;margin: 80px 0 250px;}
                    #print-preview .cover-body {font-size: 32px;margin-left: 60px;padding-left: 140px;text-align: left;font-weight: bold;}
                    #print-preview .cover-body .text {margin: 0px 20px;}
                    #print-preview .cover-body .date {margin:0 30px}
                    #print-preview .cover-body .line {margin: -4px 0 60px 160px;width: 550px;background-color: #666;height: 2px;border: 0;}
                    #print-preview .cover-bottom {font-size:28px;font-weight: bold;margin:570px 0 18px 0;padding-bottom: 220px;}
                    #print-preview .page2-title {font-size: 48px;font-weight: bold;padding: 100px 0 30px 0;}
                    #print-preview .page3-title {font-size: 36px;font-weight: bold;margin-top: 550px;padding-top: 70px}
                    #print-preview .fr {float: right;}
                    #print-preview .table-header {font-size: 16px;font-weight: bold;}
                    #print-preview .table-child-header {text-align: left;padding-left: 20px;}
                    #print-preview table {width: 906px;border-bottom:1px solid #999999;border-left:1px solid #999999;text-align:center;margin: 80px 50px 50px;}
                    #print-preview table td {border-top:1px solid #999999;border-right:1px solid #999999;box-sizing: border-box;height: 50px;line-height: 50px;}
                    #print-preview .TI2 {text-indent: 2em;text-align: left;}
                    #print-preview .agreement {text-align: left;font-size: 24px;padding-left: 20px;margin:24px 0 15px 0;}
                    #print-preview .indent {text-indent: 1.5em;}
                    #print-preview .agreement-indent {margin:24px 0 15px 0;text-indent: 1.5em;}
                    #print-preview .whole-text {border-bottom: 1px solid #999999;line-height: 36px;height: 36px;margin-left:20px;text-align: left;font-size: 16px;}
                    #print-preview .whole-text span {position: relative;left: -20px;}
                    #print-preview .text-line {display: inline-block;border-bottom: 1px solid #999999;text-align: center;text-indent: 0;height: 26px;vertical-align: text-bottom;}
                    #print-preview .insert-text {line-height: 32px;}
                </style>
                <div id="print-container">${el.innerHTML}</div>
            `;
      let resumeWindow = iframe.contentWindow;
      if (!window.showModalDialog) {
        setTimeout(function () {
          resumeWindow.print();
        }, 100);
      } else {
        // 兼容IE8,不加前面这两句,只能打印出整个页面的预览效果,并不是简历原件的内容
        resumeWindow.document.body.className += " ext-ie";
        resumeWindow.document.execCommand("print", false, null);
        setTimeout(function () {
          resumeWindow.print();
        }, 100);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
