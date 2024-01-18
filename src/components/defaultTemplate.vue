<!-- 支部情况 -->
<template>
  <section class="form-section" :id="containerId" v-if="data?.uid" />
</template>

<script>
import PrintCore from "@/utils/core";
import { Loading } from "element-ui";

export default {
  name: "defaultTemplate",
  props: {
    data: {
      type: Object,
      default: () => null,
    },
    tempIndex: {
      type: Number,
      require: true,
    },
  },
  inject: ["PPI"],
  data() {
    return {
      printCore: null,
      headerHeight: 80,
      footerHeight: 80,
      leftPadding: 80,
      rightPadding: 80,
      // tempIndex: 1,
      inputTimeout: null,
      loadingOptions: {
        lock: true,
        text: "绘制中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      },
    };
  },
  computed: {
    containerId() {
      return `temp_${this.tempIndex}_uid_${this.data.uid}_container`;
    },
  },
  watch: {
    data: {
      handler(val) {
        if (val?.uid) {
          this.$nextTick(() => {
            this.init(val);
            const container = document.getElementById(this.containerId);
            container.addEventListener("input", this.handleContentEdit);
          });
        }
      },
      deep: true,
      immediate: true,
    },
  },
  beforeDestroy() {
    const container = document.getElementById(this.containerId);
    container.removeEventListener("input", this.handleContentEdit);
  },
  methods: {
    init(data) {
      this.printCore = new PrintCore(
        data,
        this.tempIndex,
        `${this.headerHeight}px ${this.rightPadding}px ${this.footerHeight}px ${this.leftPadding}px`
      );
      const loadingInstance = Loading.service(this.loadingOptions);
      this.printCore.render().then(() => {
        loadingInstance.close();
      });
    },
    handleContentEdit(e) {
      if (this.inputTimeout) {
        clearTimeout(this.inputTimeout);
      }

      this.inputTimeout = setTimeout(() => {
        const newData = {
          ...this.data,
        };
        newData[e.target.dataset.key] = "";

        for (let i = 1; i <= this.printCore.pageIndex; i++) {
          const id = `temp_${this.tempIndex}_uid_${this.data.uid}_page_${i}_key_${e.target.dataset.key}`;
          const target = document.getElementById(id);
          if (target) {
            newData[e.target.dataset.key] += target.textContent;
          }
        }
        const loadingInstance = Loading.service(this.loadingOptions);
        const container = document.getElementById(this.containerId);
        container.innerHTML = "";
        this.printCore.render(newData).then(() => {
          loadingInstance.close();
        });
      }, 1000);
    },
  },
};
</script>
