export default {
  // 绘制方法
  draw() {
    if (this.scrollX > this.maxScrollWidth) this.scrollX = this.maxScrollWidth;
    if (this.scrollY > this.maxScrollHeight)
      this.scrollY = this.maxScrollHeight;

    requestAnimationFrame(() => {
      this.ctx.clearRect(-1, -1, this.wrapperWidth + 1, this.wrapperHeight + 1);
    });
  },
};
