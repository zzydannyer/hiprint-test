export const SIZE = {
  WIDTH: 794,
  HEIGHT: 1123,
};

export const TEMP_ENUM = {
  1: "支部情况",
  2: "党支部委员名单",
  3: "党小组长名单",
  4: "党小组管理",
  5: "党员名册",
  6: "党员调动记录",
  7: "帮困记录",
  8: "谈心谈话",
  9: "发展党员",
  10: "党支部大会记录",
  11: "党支委会会议",
  12: "党小组会议",
  13: "党课记录",
  14: "主题党日",
  15: "支部年度工作计划",
  16: "支部年度工作总结",
  17: "党费",
  18: "民主生活会",
  19: "党员民主评议管理",
};

export const TEMPLATES = {
  1: (data) => ({
    theader: null,
    tbody: [
      [
        { key: "label", content: "支部名称", width: 64, editable: false },
        { key: "orgName", content: data.orgName, editable: true },
      ],
      [
        {
          title: "支部介绍：",
          key: "introduce",
          content: data.introduce,
          colspan: 2,
          editable: true,
        },
      ],
      [
        {
          title: "照片：",
          key: "imgUrl",
          img: data.imgUrl,
          colspan: 2,
          editable: false,
        },
      ],
    ],
  }),
  2: (data) => ({
    theader: [
      { content: "姓名", width: 32 },
      { content: "岗位职务", width: 64 },
      { content: "入党时间", width: 32 },
      { content: "分工内容", width: 64 },
    ],
    tbody: data.map((item) => [
      { content: item.name, editable: true },
      { content: item.position, editable: true },
      { content: item.joinTime, editable: true },
      { content: item.work, editable: true },
    ]),
  }),
};
