<template>
  <section>
    <!-- 样式完全自定义 -->
    <div class="flex-row justify-center flex-wrap">
      <div class="title">基础元素</div>
      <!-- tid 与 defaultElementTypeProvider 中对应 -->
      <!-- 包含 class="ep-draggable-item" -->
      <div class="ep-draggable-item item" tid="defaultModule.text">
        <i class="iconfont sv-text" />
        <span>文本</span>
      </div>
      <div class="ep-draggable-item item" tid="defaultModule.image">
        <i class="iconfont sv-image" />
        <span>图片</span>
      </div>
      <div class="ep-draggable-item item" tid="defaultModule.table">
        <i class="iconfont sv-table" />
        <span>表格</span>
      </div>
    </div>
    <div class="flex-5 center">
      <!-- 设计器的 容器 -->
      <div id="hiprint-printTemplate"></div>
    </div>
  </section>
</template>

<script>
import { hiprint, defaultElementTypeProvider } from "vue-plugin-hiprint";
export default {
  name: "PrintDesign",
  data() {
    return {
      hiprintTemplate: null,
    };
  },
  created() {
    hiprint.init({
      providers: [defaultElementTypeProvider()],
    });
  },
  mounted() {
    this.buildLeftElement();
    this.buildDesigner();
  },
  methods: {
    buildLeftElement() {
      hiprint.PrintElementTypeManager.buildByHtml($(".ep-draggable-item"));
    },
    buildDesigner() {
      $("#hiprint-printTemplate").empty(); // 先清空, 避免重复构建
      this.hiprintTemplate = new hiprint.PrintTemplate({
        settingContainer: "#PrintElementOptionSetting", // 元素参数容器
      });
      // 构建 并填充到 容器中
      this.hiprintTemplate.design("#hiprint-printTemplate");
    },
  },
};
</script>

<style lang="scss" scoped></style>
