export const SIZE = {
  WIDTH: 794,
  HEIGHT: 1123,
};
const theaderStyle = `
font-size:13px;
white-space:nowrap;
color:#000;
background-color:#f7f7f7;
padding:10px;`;
export const TEMPLATES = {
  支部情况: (data) => ({
    theader: null,
    data: data,
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
  党支部委员名单: (data) => ({
    theader: [
      { content: "姓名", width: 32, style: theaderStyle },
      { content: "岗位职务", width: 64, style: theaderStyle },
      { content: "入党时间", width: 32, style: theaderStyle },
      { content: "分工内容", width: 64, style: theaderStyle },
    ],
    tbody: data.map((item) => [
      { content: item.memberName, editable: true, width: 32 },
      { content: item.adminPost, editable: true, width: 64 },
      { content: item.joinDate, editable: true, width: 32 },
      { content: item.workDep, editable: true, width: 64 },
    ]),
  }),
  党小组长名单: (data) => ({
    theader: [
      { content: "姓名", width: 32, style: theaderStyle },
      { content: "岗位职务", width: 64, style: theaderStyle },
      { content: "入党时间", width: 32, style: theaderStyle },
      { content: "分工内容", width: 64, style: theaderStyle },
    ],
    tbody: Array.from({ length: 20 }, () => [
      { content: "王伦星", editable: true, width: 32 },
      { content: "组织委员", editable: true, width: 64 },
      { content: "2005-05-27", editable: true, width: 32 },
      { content: "全⾯负责⽀部⼯作", editable: true, width: 32 },
    ]),
  }),
  党小组管理: () => ({
    theader: [
      { content: "小组名称", width: 60, style: theaderStyle },
      { content: "负责人", width: 40, style: theaderStyle },
    ],
    tbody: Array.from({ length: 20 }, () => [
      { content: "⼯程技术部设施组党⼩组", editable: true, width: 60 },
      { content: "唐丽楠", editable: true, width: 40 },
    ]),
  }),
  党员名册: () => ({
    theader: [
      { content: "党员姓名", width: 60, style: theaderStyle },
      { content: "性别", width: 40, style: theaderStyle },
      { content: "出⽣年⽉", width: 40, style: theaderStyle },
      { content: "⼊党年⽉", width: 40, style: theaderStyle },
      { content: "学历", width: 40, style: theaderStyle },
      { content: "党内分⼯", width: 40, style: theaderStyle },
      { content: "所属党⽀部", width: 40, style: theaderStyle },
      { content: "所属党⼩组", width: 40, style: theaderStyle },
    ],
    tbody: Array.from({ length: 20 }, () => [
      { content: "秦涛", width: 60 },
      { content: "男", width: 40 },
      { content: "1993-12-20", width: 40 },
      { content: "2005-05-27", width: 40 },
      { content: "硕士", width: 40 },
      { content: "宣传委员", width: 40 },
      { content: "复兴公司船务部党总⽀-张华浜区域党⽀部", width: 40 },
      { content: "第⼀党⼩组", width: 40 },
    ]),
  }),
  党员调动记录: () => ({
    theader: [
      { content: "党员姓名", width: 60, style: theaderStyle },
      { content: "由何处调出", width: 40, style: theaderStyle },
      { content: "由何处调⼊", width: 40, style: theaderStyle },
      { content: "调出⽇期", width: 40, style: theaderStyle },
      { content: "调⼊⽇期", width: 40, style: theaderStyle },
    ],
    tbody: Array.from({ length: 20 }, () => [
      { content: "秦涛", width: 60 },
      { content: "上港物流国际货运分公司党⽀部 ", width: 40 },
      { content: "街道", width: 40 },
      { content: "2023-12-02", width: 40 },
      { content: "2023-12-20", width: 40 },
    ]),
  }),
  帮困记录: () => ({
    theader: [
      { content: "姓名", width: 60, style: theaderStyle },
      { content: "性别", width: 40, style: theaderStyle },
      { content: "政治面貌", width: 40, style: theaderStyle },
      { content: "谈话时间", width: 40, style: theaderStyle },
      { content: "困难情况", width: 40, style: theaderStyle },
    ],
    tbody: Array.from({ length: 20 }, () => [
      { content: "王晓军", width: 60 },
      { content: "男", width: 40 },
      { content: "党员", width: 40 },
      { content: "2023-12-04", width: 40 },
      { content: "本⼈住院⼿术，11⽉份党费补助党员", width: 40 },
    ]),
  }),
  谈心谈话: () => ({
    theader: [
      { content: "姓名", width: 60, style: theaderStyle },
      { content: "性别", width: 40, style: theaderStyle },
      { content: "政治面貌", width: 40, style: theaderStyle },
      { content: "困难情况", width: 40, style: theaderStyle },
    ],
    tbody: Array.from({ length: 20 }, () => [
      { content: "王晓军", width: 60 },
      { content: "男", width: 40 },
      { content: "党员", width: 40 },
      {
        content:
          "公司党委副书记、纪委书记兼⼯会主席李军对新⼀届⽀委班⼦成员进⾏集体谈话，提出⼯作要求",
        width: 40,
      },
    ]),
  }),
  发展党员: () => ({
    theader: [
      { content: "党员姓名", width: 60, style: theaderStyle },
      { content: "所属党⽀部", width: 40, style: theaderStyle },
      { content: "所属党⼩组", width: 40, style: theaderStyle },
      { content: "出⽣⽇期", width: 40, style: theaderStyle },
      { content: "⼈员阶段", width: 40, style: theaderStyle },
    ],
    tbody: Array.from({ length: 20 }, () => [
      { content: "秦涛", width: 60 },
      { content: "⼯程指挥部⼯程党⽀部", width: 40 },
      { content: "第⼀党⼩组", width: 40 },
      { content: "2005-05-27", width: 40 },
      { content: "申请⼈", width: 40 },
    ]),
  }),
  党支部大会记录: () => ({ theader: null, tbody: [] }),
  党支委会会议: () => ({ theader: null, tbody: [] }),
  党小组会议: () => ({ theader: null, tbody: [] }),
  党课记录: () => ({ theader: null, tbody: [] }),
  主题党日: () => ({ theader: null, tbody: [] }),
  支部年度工作计划: () => ({ theader: null, tbody: [] }),
  支部年度工作总结: () => ({ theader: null, tbody: [] }),
  党费: () => ({ theader: null, tbody: [] }),
  民主生活会: () => ({ theader: null, tbody: [] }),
  党员民主评议管理: () => ({ theader: null, tbody: [] }),
};
