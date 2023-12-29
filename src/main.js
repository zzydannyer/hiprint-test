import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// main.js
import { autoConnect, disAutoConnect } from "vue-plugin-hiprint";
console.log("disAutoConnect"); // 为了检验执行顺序
disAutoConnect(); // 取消自动连接
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  render: function (h) {
    return h(App);
  },
}).$mount("#app");
