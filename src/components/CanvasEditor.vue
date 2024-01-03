<template>
  <div>
    <div class="canvas-editor" style="border: 1px solid gray"></div>
  </div>
</template>

<script>
import Editor, { RowFlex } from "@hufe921/canvas-editor";
export default {
  name: "CanvasEditor",
  data() {
    return {
      editor: null,
    };
  },
  mounted() {
    this.editor = new Editor(
      document.querySelector(".canvas-editor"),
      {
        main: [
          {
            value: "Hello World",
          },
        ],
      },
      {
        margins: [100, 120, 100, 120],
        watermark: "我是水印",
        maskMargin: [60, 0, 30, 0], // 菜单栏高度60，底部工具栏30为遮盖层
      }
    );
  },
};
</script>

<style lang="scss" scoped></style>
