<template>
  <div>
    <canvas ref="myCanvas" :width="SIZE.WIDTH" :height="SIZE.HEIGHT"></canvas>
    <div v-for="(page, index) in pages" :key="index">
      <img :src="page" class="printed-page" />
    </div>
  </div>
</template>

<script>
import { SIZE } from "@/utils/constants";
export default {
  name: "CanvasTemplate1",
  data() {
    return {
      SIZE,
      pages: [],
      lineHeight: 20,
      marginTop: 50,
      marginLeft: 50,
      currentY: 0,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    addPage() {
      const canvas = document.createElement("canvas");
      canvas.width = this.SIZE.WIDTH;
      canvas.height = this.SIZE.HEIGHT;
      const ctx = canvas.getContext("2d");
      this.pages.push(canvas.toDataURL()); // Store the initial blank page
      this.currentY = this.marginTop; // Reset current Y position
    },
    init() {
      const canvas = this.$refs.myCanvas;
      const ctx = canvas.getContext("2d");

      // Set up your table data and headers
      const data = []; // Your data array
      const headers = []; // Your headers array

      // Draw headers and data, checking for page breaks
      headers.forEach((header) => {
        this.checkForPageBreak(canvas);
        ctx.fillText(header, this.marginLeft, this.currentY);
        this.currentY += this.lineHeight;
      });

      data.forEach((row) => {
        this.checkForPageBreak(canvas);
        ctx.fillText(row, this.marginLeft, this.currentY);
        this.currentY += this.lineHeight;
      });
    },
    checkForPageBreak(canvas) {
      if (this.currentY > this.SIZE.HEIGHT - this.marginTop) {
        // Finish the current page
        this.pages[this.pages.length - 1] = canvas.toDataURL();

        // Start a new page
        this.addPage();

        // Clear canvas for the next page
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, this.SIZE.WIDTH, this.SIZE.HEIGHT);
      }
    },
  },
};
</script>
<style scoped>
.printed-page {
  width: 100%;
  border: 1px solid black; /* 方便看到页面边界 */
  page-break-after: always; /* 用于打印时分页 */
}
</style>
