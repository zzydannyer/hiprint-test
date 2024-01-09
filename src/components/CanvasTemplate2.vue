<template>
  <div id="container" style="position: relative">
    <canvas ref="canvas"></canvas>
    <div ref="div" style="position: absolute; top: 10px"></div>
  </div>
</template>

<script>
import { SIZE } from "@/utils/constants";
export default {
  name: "CanvasTemplate2",
  props: {
    data: {
      type: Array | Object,
      default: () => null,
    },
  },
  data() {
    return {
      dataHeader: ["⽇期", "出席⼈员（签名）", "会议主要议题"],
      //   data: [
      //     {
      //       name: "改动",
      //       number1: 53,
      //       number2: 35,
      //       number3: 753,
      //       number4: 35,
      //       number5: 3138,
      //     },
      //     {
      //       name: "好地方",
      //       number1: 4,
      //       number2: 35,
      //       number3: 35,
      //       number4: 38,
      //       number5: 3540,
      //     },
      //     {
      //       name: "和人",
      //       number1: 10,
      //       number2: 8,
      //       number3: 52,
      //       number4: 35,
      //       number5: 7,
      //     },
      //   ],
      lastX: 0,
      lastY: 0,
      boxW: 100,
      boxH: 50,
      lineHeight: 20,
    };
  },
  mounted() {
    this.init();
    // this.$refs.canvas.addEventListener("click", this.eventHandler);
  },
  beforeUnmount() {
    // this.$refs.canvas.removeEventListener("click", this.eventHandler);
  },
  methods: {
    init() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");

      canvas.width = SIZE.WIDTH;
      canvas.height = SIZE.HEIGHT;
      canvas.style.border = "1px solid #222";

      // 设置文字格式
      context.textAlign = "center";
      context.textBaseline = "middle";

      // 画出头部信息
      context.font = "bold 18px Microsoft YaHei";
      this.dataHeader.forEach((item, i) => {
        context.strokeStyle = "#ffff00";
        context.fillText(item, this.boxW * i + this.boxW / 2, this.boxH / 2);
      });

      // 画出tbody信息
      context.font = "16px Microsoft YaHei";
      this.data.forEach((item, index) => {
        Object.keys(item)
          .filter((i) => ["actualDate", "attenders", "detail"].includes(i))
          .forEach((d, i) => {
            context.strokeStyle = "#ff0000";
            context.fillText(
              item[d],
              this.boxW * i + this.boxW / 2,
              this.boxH * index + this.boxH + this.boxH / 2
            );
            context.strokeStyle = "#222";
            // 画出竖边框
            context.moveTo(i * this.boxW, 0);
            context.lineTo(i * this.boxW, this.boxH * (this.data.length + 1));
            context.stroke();
          });
        // 画出最后一个竖边框 ->最右侧的
        context.moveTo(Object.keys(item).length * this.boxW, 0);
        context.lineTo(
          Object.keys(item).length * this.boxW,
          this.boxH * (this.data.length + 1)
        );
        context.stroke();
      });
      // 画出横边框
      for (let i = 0; i < this.data.length + 2; i++) {
        context.moveTo(0, i * this.boxH);
        context.lineTo(canvas.width, i * this.boxH);
        context.stroke();
      }
    },
    eventHandler(evt) {
      const div = this.$refs.div;
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");
      let x = Math.floor(evt.offsetX / this.boxW); // 获取点击的位置，转换成按钮的 X索引
      let y = Math.floor(evt.offsetY / this.boxH); // 获取点击的位置，转换成按钮的 Y索引
      /**
       * // 全部重绘逻辑
       * // context.clearRect(0, 0, 999, 999); // 清楚canvas，重绘
       * // setCanvas(); // 重绘
       * // 全部重绘逻辑结束
       */
      // 还原的方式重绘逻辑 减少内存消耗
      // （每次只删除添加的边框，并不删除重绘整个canvas）
      if (this.lastX >= 0 && this.lastY >= 0) {
        let newX = this.boxW * this.lastX;
        let newY = this.boxH * this.lastY;
        context.clearRect(newX + 1, newY + 1, 1, this.boxH - 2);
        context.clearRect(newX + 1, newY + 1, this.boxW - 2, 1);
        context.clearRect(newX + this.boxW - 2, newY + 1, 1, this.boxH - 2);
        context.clearRect(newX + 1, newY + this.boxH - 2, this.boxW - 2, 1);
      }
      this.lastX = x;
      this.lastY = y;
      // 重绘逻辑结束

      context.strokeRect(
        this.boxW * x + 1,
        this.boxH * y + 1,
        this.boxW - 2,
        this.boxH - 2
      ); // 绘制点击的边框

      this.data.forEach((item, index) => {
        // 循环获取data对象中点击的数据
        if (index === y - 1) {
          item &&
            Object.keys(item).forEach((itemData, i) => {
              if (i === x) {
                div.style.left = this.boxW * this.dataHeader.length + 20 + "px";
                div.innerHTML = item[itemData];
              }
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
