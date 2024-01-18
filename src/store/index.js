import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import print from "./print";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  modules: [print],
  plugins: [vuexLocal.plugin],
});
