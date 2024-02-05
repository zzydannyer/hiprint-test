import { SIZE } from "./constants.js";
class PrintCore {
  // 绘制方法
  draw(continerId, headerCellInfo = {}, bodyCellInfo = {}) {
    const container = document.getElementById(continerId);
    if (!container) return;
    const page1 = document.createElement("canvas");
    container.appendChild(page1);
    page1.width = SIZE.WIDTH;
    page1.height = SIZE.HEIGHT;
    const ctx = page1.getContext("2d");
    requestAnimationFrame(() => {
      ctx.textBaseline = "middle";
      this.drawBody("center");
      this.drawHeader("center");
      this.drawSummary("center");

      if (this.maxScrollWidth > 0) {
        if (this.scrollX > 0) {
          this.drawShadow(this.ctx, this.fixedLeftWidth, "left");
        }
        if (this.scrollX < this.maxScrollWidth) {
          this.drawShadow(this.ctx, this.fixedRightWidth, "right");
        }
      }

      this.ctx.clearRect(-1, 0, this.fixedLeftWidth, this.wrapperHeight);
      this.ctx.clearRect(
        this.wrapperWidth - this.fixedRightWidth,
        0,
        this.fixedRightWidth,
        this.wrapperHeight + 1
      );

      this.drawBody("left");
      this.drawBody("right");

      this.drawNoData();

      this.drawSummary("left");
      this.drawSummary("right");

      this.drawHeader("left");
      this.drawHeader("right");
      if (this.border) {
        this.drawBorder(0, 0, this.wrapperWidth - 1, this.wrapperHeight - 1);
      } else if (!this.hideHeader) {
        this.drawBorder(0, 0, this.wrapperWidth - 1, this.wrapperHeight - 1, {
          direction: "bottom",
        });
      }
    });
  }
  drawBody() {}
}
export default {};
