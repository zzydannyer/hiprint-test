const state = {
  templateInstances: {
    // 支部情况
    template1Instance: null,
    // 党支部委员名单
    template2Instance: null,
    // 党小组长名单
    template3Instance: null,
    // 党小组管理
    template4Instance: null,
    // 党员名册
    template5Instance: null,
    // 党员调动记录
    template6Instance: null,
    // 帮困记录
    template7Instance: null,
    // 谈心谈话
    template8Instance: null,
    // 发展党员
    template9Instance: null,
    // 党支部大会记录
    template10Instance: null,
    // 党支委会会议
    template11Instance: null,
    // 党小组会议
    template12Instance: null,
    // 党课记录
    template13Instance: null,
    // 主题党日
    template14Instance: null,
    // 支部年度工作计划
    template15Instance: null,
    // 支部年度工作总结
    template16Instance: null,
    // 党费
    template17Instance: null,
    // 民主生活会
    template18Instance: null,
    // 党员民主评议管理
    template19Instance: null,
  },
};
const getters = {};
const mutations = {
  SET_TEMPLATE_INSTANCE(state, { templateId, instance }) {
    state.templateInstances[`template${templateId}Instance`] = instance;
  },
  RE_RENDER_TEMPLATE(state, { templateId, data }) {
    state.templateInstances[`template${templateId}Instance`].render(data);
  },
};
const actions = {};

export default {
  state,
  getters,
  mutations,
  actions,
};
