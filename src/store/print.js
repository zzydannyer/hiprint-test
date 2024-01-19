const state = {
  templateInstances: {
    // 支部情况
    支部情况_instance: null,
    // 党支部委员名单
    党支部委员名单_instance: null,
    // 党小组长名单
    党小组长名单_instance: null,
    // 党小组管理
    党小组管理_instance: null,
    // 党员名册
    党员名册_instance: null,
    // 党员调动记录
    党员调动记录_instance: null,
    // 帮困记录
    帮困记录_instance: null,
    // 谈心谈话
    谈心谈话_instance: null,
    // 发展党员
    发展党员_instance: null,
    // 党支部大会记录
    党支部大会记录_instance: null,
    // 党支委会会议
    党支委会会议_instance: null,
    // 党小组会议
    党小组会议_instance: null,
    // 党课记录
    党课记录_instance: null,
    // 主题党日
    主题党日_instance: null,
    // 支部年度工作计划
    支部年度工作计划_instance: null,
    // 支部年度工作总结
    支部年度工作总结_instance: null,
    // 党费
    党费_instance: null,
    // 民主生活会
    民主生活会_instance: null,
    // 党员民主评议管理
    党员民主评议管理_instance: null,
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
