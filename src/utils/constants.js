const SIZE = {
  WIDTH: 794,
  HEIGHT: 1123,
};
export const wrapTextNum = 14;
const theaderStyle = `
font-size:13px;
white-space:nowrap;
color:#000;
background-color:#f7f7f7;
padding:10px;`;

const MAP = {
  branchInfo: "支部情况",
  committeeLeader: "党支部委员名单",
  groupLeader: "党小组长名单",
  memberGroup: "党小组管理",
  formalMember: "党员名册",
  memberTransfer: "党员调动记录",
  help: "帮困记录",
  talk: "谈心谈话",
  developMember: "发展党员",
  branch: "党支部大会记录", //日期
  brach: "党支委会会议", //日期
  orgLifeRecord: "党小组会议", //日期
  lessonRecord: "党课记录", //日期
  // partyDay: "主题党日",
  plan: "支部年度工作计划",
  summary: "支部年度工作总结",
  partyDuesSummary: "党费",
  deliberation: "党员民主评议管理",
};

export const dictsMap = {
  // 人员阶段
  statusMap: {
    1: "申请人",
    2: "积极分子",
    3: "发展对象",
    4: "预备党员",
    5: "正式党员",
    6: "党小组长",
  },
};

export const compatibility = {
  useSingleBorderforContiguousCells: true,
  wordPerfectJustification: true,
  noTabStopForHangingIndent: true,
  noLeading: true,
  spaceForUnderline: true,
  noColumnBalance: true,
  balanceSingleByteDoubleByteWidth: true,
  noExtraLineSpacing: true,
  doNotLeaveBackslashAlone: true,
  underlineTrailingSpaces: true,
  doNotExpandShiftReturn: true,
  spacingInWholePoints: true,
  lineWrapLikeWord6: true,
  printBodyTextBeforeHeader: true,
  printColorsBlack: true,
  spaceWidth: true,
  showBreaksInFrames: true,
  subFontBySize: true,
  suppressBottomSpacing: true,
  suppressTopSpacing: true,
  suppressSpacingAtTopOfPage: true,
  suppressTopSpacingWP: true,
  suppressSpBfAfterPgBrk: true,
  swapBordersFacingPages: true,
  convertMailMergeEsc: true,
  truncateFontHeightsLikeWP6: true,
  macWordSmallCaps: true,
  usePrinterMetrics: true,
  doNotSuppressParagraphBorders: true,
  wrapTrailSpaces: true,
  footnoteLayoutLikeWW8: true,
  shapeLayoutLikeWW8: true,
  alignTablesRowByRow: true,
  forgetLastTabAlignment: true,
  adjustLineHeightInTable: true,
  autoSpaceLikeWord95: true,
  noSpaceRaiseLower: true,
  doNotUseHTMLParagraphAutoSpacing: true,
  layoutRawTableWidth: true,
  layoutTableRowsApart: true,
  useWord97LineBreakRules: true,
  doNotBreakWrappedTables: true,
  doNotSnapToGridInCell: true,
  selectFieldWithFirstOrLastCharacter: true,
  applyBreakingRules: true,
  doNotWrapTextWithPunctuation: true,
  doNotUseEastAsianBreakRules: true,
  useWord2002TableStyleRules: true,
  growAutofit: true,
  useFELayout: true,
  useNormalStyleForList: true,
  doNotUseIndentAsNumberingTabStop: true,
  useAlternateEastAsianLineBreakRules: true,
  allowSpaceOfSameStyleInTable: true,
  doNotSuppressIndentation: true,
  doNotAutofitConstrainedTables: true,
  autofitToFirstFixedWidthCell: true,
  underlineTabInNumberingList: true,
  displayHangulFixedWidth: true,
  splitPgBreakAndParaMark: true,
  doNotVerticallyAlignCellWithSp: true,
  doNotBreakConstrainedForcedTable: true,
  ignoreVerticalAlignmentInTextboxes: true,
  useAnsiKerningPairs: true,
  cachedColumnBalance: true,
};

const TEMPLATES = {
  branchInfo: (data) => ({
    theader: null,
    data: data,
    tbody: [
      [
        {
          key: "label",
          content: "支部名称",
          width: 64,
          editable: false,
          breakInside: false,
        },
        {
          key: "orgName",
          content: data.orgName,
          editable: false,
          breakInside: false,
        },
      ],
      [
        {
          title: "支部介绍：",
          key: "introduce",
          content: data.introduce,
          colSpan: 2,
          editable: false,
          breakInside: true,
        },
      ],
      [
        {
          title: "照片：",
          key: "imgUrl",
          img: data.imgUrl,
          colSpan: 2,
          editable: false,
          breakInside: false,
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
      {
        content: item.memberName,
        editable: false,
        breakInside: false,
        width: 32,
      },
      {
        content: item.adminPost,
        editable: false,
        breakInside: false,
        width: 64,
      },
      {
        content: item.joinDate,
        editable: false,
        breakInside: false,
        width: 32,
      },
      {
        content: item.workDep,
        editable: false,
        breakInside: false,
        width: 64,
      },
    ]),
  }),
  groupLeader: (data) => ({
    theader: [
      { content: "姓名", width: 32, style: theaderStyle },
      { content: "岗位职务", width: 64, style: theaderStyle },
      { content: "入党时间", width: 32, style: theaderStyle },
      { content: "分工内容", width: 64, style: theaderStyle },
    ],
    tbody: Array.from({ length: 5 }, () => [
      {
        content: "王伦星",
        editable: false,
        breakInside: false,
        width: 32,
      },
      {
        content: "组织委员",
        editable: false,
        breakInside: false,
        width: 64,
      },
      {
        content: "2005-05-27",
        editable: false,
        breakInside: false,
        width: 32,
      },
      {
        content: "全⾯负责⽀部⼯作",
        editable: false,
        breakInside: false,
        width: 32,
      },
    ]),
  }),
  memberGroup: () => ({
    theader: [
      { content: "小组名称", width: 60, style: theaderStyle },
      { content: "负责人", width: 40, style: theaderStyle },
    ],
    tbody: Array.from({ length: 5 }, () => [
      {
        content: "⼯程技术部设施组党⼩组",
        editable: false,
        breakInside: false,
        width: 60,
      },
      {
        content: "唐丽楠",
        editable: false,
        breakInside: false,
        width: 40,
      },
    ]),
  }),
  // 党员名册
  formalMember: () => ({
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
    tbody: Array.from({ length: 5 }, () => [
      {
        content: "秦涛",
        width: 60,
        editable: false,
        breakInside: false,
      },
      {
        content: "男",
        width: 40,
        editable: false,
        breakInside: false,
      },
      {
        content: "1993-12-20",
        width: 40,
        editable: false,
        breakInside: false,
      },
      {
        content: "2005-05-27",
        width: 40,
        editable: false,
        breakInside: false,
      },
      {
        content: "硕士",
        width: 40,
        editable: false,
        breakInside: false,
      },
      {
        content: "宣传委员",
        width: 40,
        editable: false,
        breakInside: false,
      },
      {
        content: "复兴公司船务部党总⽀-张华浜区域党⽀部",
        width: 40,
        editable: false,
        breakInside: false,
      },
      {
        content: "第⼀党⼩组",
        width: 40,
        editable: false,
        breakInside: false,
      },
    ]),
  }),
  memberTransfer: () => ({
    theader: [
      { content: "党员姓名", width: 60, style: theaderStyle },
      { content: "由何处调出", width: 40, style: theaderStyle },
      { content: "由何处调⼊", width: 40, style: theaderStyle },
      { content: "调出⽇期", width: 40, style: theaderStyle },
      { content: "调⼊⽇期", width: 40, style: theaderStyle },
    ],
    tbody: Array.from({ length: 5 }, () => [
      {
        content: "秦涛",
        width: 60,
        editable: false,
        breakInside: false,
      },
      {
        content: "上港物流国际货运分公司党⽀部 ",
        width: 40,
        editable: false,
        breakInside: false,
      },
      {
        content: "街道",
        width: 40,
        editable: false,
        breakInside: false,
      },
      {
        content: "2023-12-02",
        width: 40,
        editable: false,
        breakInside: false,
      },
      {
        content: "2023-12-20",
        width: 40,
        editable: false,
        breakInside: false,
      },
    ]),
  }),
  help: () => ({
    theader: [
      { content: "姓名", width: 60, style: theaderStyle },
      { content: "性别", width: 40, style: theaderStyle },
      { content: "政治面貌", width: 40, style: theaderStyle },
      { content: "谈话时间", width: 40, style: theaderStyle },
      { content: "困难情况", width: 40, style: theaderStyle },
    ],
    tbody: Array.from({ length: 5 }, () => [
      {
        content: "王晓军",
        width: 60,
        editable: false,
        breakInside: false,
      },
      {
        content: "男",
        width: 40,
        editable: false,
        breakInside: false,
      },
      {
        content: "党员",
        width: 40,
        editable: false,
        breakInside: false,
      },
      {
        content: "2023-12-04",
        width: 40,
        editable: false,
        breakInside: false,
      },
      {
        content: "本⼈住院⼿术，11⽉份党费补助党员",
        width: 40,
        editable: false,
        breakInside: false,
      },
    ]),
  }),
  talk: () => ({
    theader: [
      { content: "姓名", width: 60, style: theaderStyle },
      { content: "性别", width: 40, style: theaderStyle },
      { content: "政治面貌", width: 40, style: theaderStyle },
      { content: "困难情况", width: 40, style: theaderStyle },
    ],
    tbody: Array.from({ length: 5 }, () => [
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
  developMember: () => ({
    theader: [
      { content: "党员姓名", width: 60, style: theaderStyle },
      { content: "所属党⽀部", width: 40, style: theaderStyle },
      { content: "所属党⼩组", width: 40, style: theaderStyle },
      { content: "出⽣⽇期", width: 40, style: theaderStyle },
      { content: "⼈员阶段", width: 40, style: theaderStyle },
    ],
    tbody: Array.from({ length: 5 }, () => [
      { content: "秦涛", width: 60 },
      { content: "⼯程指挥部⼯程党⽀部", width: 40 },
      { content: "第⼀党⼩组", width: 40 },
      { content: "2005-05-27", width: 40 },
      { content: "申请⼈", width: 40 },
    ]),
  }),
  党支部大会记录: (data) => ({
    theader: null,
    data: data,
    tbody: [
      [
        {
          title: "会议主题或主要内容：",
          key: "main",
          content: "第⼀党⽀部四季度党员⼤会",
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        {
          title: "出席：",
          key: "showup",
          content: "全体出席",
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        {
          title: "缺席：",
          key: "quexi",
          content: "",
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        { key: "label", content: "主持人", width: 64, editable: false },
        { key: "orgName", content: "", width: 100, editable: false },
        { key: "label", content: "记录⼈", width: 64, editable: false },
        { key: "orgName", content: "", width: 100, editable: false },
      ],
      [
        {
          title: "会议记录：",
          key: "quexi",
          content: `1、党课《弘扬党的光荣传统，践⾏党的优良作⻛》；
          ——公司领导陈冠雄
          2、2023年度⽀部⼯作总结；
          3、2024年度⽀部⼯作计划；
          4、“元旦、春节”节前党⻛廉政教育学习；
          5、公司领导讲话"`,
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        { key: "label", content: "备注", width: 64, editable: false },
        { key: "orgName", content: "无备注", colSpan: 3, editable: false },
      ],
    ],
  }),
  党支委会会议: () => ({
    theader: [
      { content: "⽇期", width: 60, style: theaderStyle },
      { content: "出席⼈员（签名）", width: 40, style: theaderStyle },
      { content: "会议主要议题", width: 40, style: theaderStyle },
    ],
    tbody: Array.from({ length: 5 }, () => [
      { content: "2023-12-20", width: 60 },
      { content: "全体⼈员", width: 40 },
      {
        content: `1、学习贯彻习近平总书记重要讲话和重要指示批示精神。结合主题教育开展期
        间检视问题以及召开专题⺠主⽣活会（组织⽣活会）查摆问题情况，对按期完
        成整改任务情况汇报，持续夯实整改实效。2、对开展以“⼤⼒弘扬宪法精神，
        建设社会主义法治⽂化”为主题法治宣传周活动情况汇报。3、开展党⻛廉政教
        育⽉活动情况汇报。4、部⻔开展帮困送温暖各项⼯作情况汇报。开展双节部⻔
        困难员⼯排摸，并如实上报补助申请。开展双节前⼤病员⼯慰问，确保员⼯队
        伍总体稳定。5、对落实好现场安全⽣产管控、⽹络安全、“冬季五防”安全防范
        各项措施、⼯艺执标，以及综合治理、安保维稳、舆情管理等落实、管控⼯作
        相关要点和注意事项进⾏布置。重点抓好“守底线”各项措施的有效落实，严格
        值班制度。加强⽹络安全防护、现场安全⽣产检查和监督，确保理货安全⽣
        产、服务质量平稳有序，确保守好年关开好头。6、开展《公司党⻛廉政学习材
        料2023年12⽉》教育，积极构建⻛清⽓正的部⻔和谐氛围。`,
        width: 40,
      },
    ]),
  }),
  党小组会议: (data) => ({
    theader: null,
    data: data,
    tbody: [
      [
        {
          title: "会议主题或主要内容：",
          key: "main",
          content: `1、学习习近平总书记在上海、江苏盐城考察时的重要讲话激励⼴⼤⼲部群众坚定信⼼、勇毅前⾏ 2、学习《习近平新时代中国特⾊社会主义思想专题摘编》之坚定不移
          ⾼举中国特⾊社会主义伟⼤旗帜（坚定中国特⾊社会主义道路⾃信、理论⾃信、制定⾃信、⽂化⾃信》 3、学习⼆⼗⼤报告百问节选之九 4、以“⼤⼒弘扬宪法精神，建
          设社会主义法治⽂化”为主题法治宣传周活动 5、中央纪委国家监委公开通报七起违反中央⼋项规定精神典型问题 6、同盛物流公司关于开展第⼆⼗四次党⻛廉政教育活
          动的通知 7、结合学习内容和⼯作实际开展主题业务交流：⽆纸化办公，洋⼭物流安监部采⽤电⼦整改单经验分享。 8、党建⽹评论质量确保每⽉党员6 条评论，专兼职
          党务⼯作⼈员10 条评论；提⾼党《学习强国》参与率，党员每天上线按时进⾏学习，专兼职党务⼯作⼈员每⽉不少于800 积分`,
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        {
          title: "出席：",
          key: "showup",
          content: "全体出席",
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        {
          title: "缺席：",
          key: "quexi",
          content: "",
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        { key: "label", content: "主持人", width: 64, editable: false },
        { key: "orgName", content: "", width: 100, editable: false },
        { key: "label", content: "记录⼈", width: 64, editable: false },
        { key: "orgName", content: "", width: 100, editable: false },
      ],
      [
        {
          title: "会议记录：",
          key: "quexi",
          content: `1、党课《弘扬党的光荣传统，践⾏党的优良作⻛》；
          ——公司领导陈冠雄
          2、2023年度⽀部⼯作总结；
          3、2024年度⽀部⼯作计划；
          4、“元旦、春节”节前党⻛廉政教育学习；
          5、公司领导讲话"`,
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        { key: "label", content: "备注", width: 64, editable: false },
        { key: "orgName", content: "无备注", colSpan: 3, editable: false },
      ],
    ],
  }),
  党课记录: (data) => ({
    theader: null,
    data: data,
    tbody: [
      [
        {
          title: "课题：",
          key: "main",
          content:
            "公司党委副书记总经理上廉政党课《警钟⻓鸣始于⼼，⻛清正⽓践于⾏》",
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        {
          title: "出席：",
          key: "showup",
          content:
            "任胜华、詹永忠、林中芳、陈建清、卫锋、周向军、陈玲⼦、赵平、袁慧强、刘兵、⾼强、张毅、朱专东、陈健",
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        {
          title: "缺席：",
          key: "quexi",
          content: "彭⽴卫",
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        { key: "label", content: "主持人", width: 64, editable: false },
        { key: "orgName", content: "", width: 100, editable: false },
        { key: "label", content: "记录⼈", width: 64, editable: false },
        { key: "orgName", content: "", width: 100, editable: false },
      ],
      [
        {
          title: "会议记录：",
          key: "quexi",
          content: `党⻛廉政教育⽉专题党课
          12⽉20⽇上午09:00点，市场安监党⽀部在⽀部党员活动室召开党员⼤会，由公司党委副书记总经理任胜华给全体党员上廉政党课
          ⼀、 回顾这⼀年来集团在廉政⽅⾯情况
          2023年对集团来说是不平凡的⼀年，集团内部发⽣许多事，特别是集团⾼层涉案，给集团内部特别是员⼯队伍的稳定产⽣很⼤的影响，可以说是
          波动较⼤的⼀年
          ⼆、 公司廉政建设
          1、党⻛廉政建设永远在路上
           中央⼋项规定出台已经有11年啦，11年来中央在反腐⽅⾯⼀直有⾼的要求，严的举措，反映了党中央对反腐倡廉的⾼度重视。把它提升到治国
          理政的⾼度。这⼏年⽼⻁⼀直在打，从严要求⼀直在延续，我们任何⼈都要遵章守纪
          2、不要有任何侥幸⼼理
           ⻰吴的环境及客户群体较复杂，我们讲廉政，讲反腐就是要做到没⼈想腐、没⼈敢腐、没⼈能腐。坚持做到常在河边⾛就是不湿鞋。要有底线
          思维，要坚守到退休
          3、要直⾯未来、坚守初⼼，做⼀个正直、忠诚的⼈
          ⼈的能⼒有⼤⼩。但⼈品是可以塑造的。作为上港员⼯要忠诚于集团的发展、忠诚于公司、忠诚于岗位。作为党员要起表率作⽤。⽬前国家经济
          正在转型，虽然困难但要有信⼼，要有攻坚克难的准备。只有良好的党⻛才能营造良好的范围。
          最后，感谢⼤家，在2023年即将过去的时候，感谢⼤家⼀年来的付出，特别是疫情过后市场形势不佳，⼤家在岗位上的付出，做出贡献，谢谢⼤
          家`,
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        { key: "label", content: "备注", width: 64, editable: false },
        { key: "orgName", content: "无备注", colSpan: 3, editable: false },
      ],
    ],
  }),
  partyDay: (data) => ({
    theader: null,
    data: data,
    tbody: [
      [
        {
          title: "课题：",
          key: "main",
          content:
            "公司党委副书记总经理上廉政党课《警钟⻓鸣始于⼼，⻛清正⽓践于⾏》",
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        {
          title: "出席：",
          key: "showup",
          content:
            "任胜华、詹永忠、林中芳、陈建清、卫锋、周向军、陈玲⼦、赵平、袁慧强、刘兵、⾼强、张毅、朱专东、陈健",
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        {
          title: "缺席：",
          key: "quexi",
          content: "彭⽴卫",
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        { key: "label", content: "主持人", width: 64, editable: false },
        { key: "orgName", content: "", width: 100, editable: false },
        { key: "label", content: "记录⼈", width: 64, editable: false },
        { key: "orgName", content: "", width: 100, editable: false },
      ],
      [
        {
          title: "会议记录：",
          key: "quexi",
          content: `党⻛廉政教育⽉专题党课
          12⽉20⽇上午09:00点，市场安监党⽀部在⽀部党员活动室召开党员⼤会，由公司党委副书记总经理任胜华给全体党员上廉政党课
          ⼀、 回顾这⼀年来集团在廉政⽅⾯情况
          2023年对集团来说是不平凡的⼀年，集团内部发⽣许多事，特别是集团⾼层涉案，给集团内部特别是员⼯队伍的稳定产⽣很⼤的影响，可以说是
          波动较⼤的⼀年
          ⼆、 公司廉政建设
          1、党⻛廉政建设永远在路上
           中央⼋项规定出台已经有11年啦，11年来中央在反腐⽅⾯⼀直有⾼的要求，严的举措，反映了党中央对反腐倡廉的⾼度重视。把它提升到治国
          理政的⾼度。这⼏年⽼⻁⼀直在打，从严要求⼀直在延续，我们任何⼈都要遵章守纪
          2、不要有任何侥幸⼼理
           ⻰吴的环境及客户群体较复杂，我们讲廉政，讲反腐就是要做到没⼈想腐、没⼈敢腐、没⼈能腐。坚持做到常在河边⾛就是不湿鞋。要有底线
          思维，要坚守到退休
          3、要直⾯未来、坚守初⼼，做⼀个正直、忠诚的⼈
          ⼈的能⼒有⼤⼩。但⼈品是可以塑造的。作为上港员⼯要忠诚于集团的发展、忠诚于公司、忠诚于岗位。作为党员要起表率作⽤。⽬前国家经济
          正在转型，虽然困难但要有信⼼，要有攻坚克难的准备。只有良好的党⻛才能营造良好的范围。
          最后，感谢⼤家，在2023年即将过去的时候，感谢⼤家⼀年来的付出，特别是疫情过后市场形势不佳，⼤家在岗位上的付出，做出贡献，谢谢⼤
          家`,
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        { key: "label", content: "备注", width: 64, editable: false },
        { key: "orgName", content: "无备注", colSpan: 3, editable: false },
      ],
    ],
  }),
  plan: (data) => ({
    theader: null,
    data: data,
    tbody: [
      [
        { key: "label", content: "标题", width: 64, editable: false },
        {
          key: "orgName",
          content:
            "公司党委副书记总经理上廉政党课《警钟⻓鸣始于⼼，⻛清正⽓践于⾏》",
          editable: false,
          breakInside: false,
        },
      ],
      [
        { key: "label", content: "年度", width: 64, editable: false },
        { key: "orgName", content: "", editable: false },
      ],
      [
        {
          title: "会议记录：",
          key: "quexi",
          content: `党⻛廉政教育⽉专题党课
          12⽉20⽇上午09:00点，市场安监党⽀部在⽀部党员活动室召开党员⼤会，由公司党委副书记总经理任胜华给全体党员上廉政党课
          ⼀、 回顾这⼀年来集团在廉政⽅⾯情况
          2023年对集团来说是不平凡的⼀年，集团内部发⽣许多事，特别是集团⾼层涉案，给集团内部特别是员⼯队伍的稳定产⽣很⼤的影响，可以说是
          波动较⼤的⼀年
          ⼆、 公司廉政建设
          1、党⻛廉政建设永远在路上
           中央⼋项规定出台已经有11年啦，11年来中央在反腐⽅⾯⼀直有⾼的要求，严的举措，反映了党中央对反腐倡廉的⾼度重视。把它提升到治国
          理政的⾼度。这⼏年⽼⻁⼀直在打，从严要求⼀直在延续，我们任何⼈都要遵章守纪
          2、不要有任何侥幸⼼理
           ⻰吴的环境及客户群体较复杂，我们讲廉政，讲反腐就是要做到没⼈想腐、没⼈敢腐、没⼈能腐。坚持做到常在河边⾛就是不湿鞋。要有底线
          思维，要坚守到退休
          3、要直⾯未来、坚守初⼼，做⼀个正直、忠诚的⼈
          ⼈的能⼒有⼤⼩。但⼈品是可以塑造的。作为上港员⼯要忠诚于集团的发展、忠诚于公司、忠诚于岗位。作为党员要起表率作⽤。⽬前国家经济
          正在转型，虽然困难但要有信⼼，要有攻坚克难的准备。只有良好的党⻛才能营造良好的范围。
          最后，感谢⼤家，在2023年即将过去的时候，感谢⼤家⼀年来的付出，特别是疫情过后市场形势不佳，⼤家在岗位上的付出，做出贡献，谢谢⼤
          家`,
          colSpan: 2,
          editable: false,
          breakInside: false,
        },
      ],
    ],
  }),
  summary: (data) => ({
    theader: null,
    data: data,
    tbody: [
      [
        { key: "label", content: "标题", width: 64, editable: false },
        {
          key: "orgName",
          content:
            "公司党委副书记总经理上廉政党课《警钟⻓鸣始于⼼，⻛清正⽓践于⾏》",
          editable: false,
          breakInside: false,
        },
      ],
      [
        { key: "label", content: "年度", width: 64, editable: false },
        { key: "orgName", content: "", editable: false },
      ],
      [
        {
          title: "会议记录：",
          key: "quexi",
          content: `党⻛廉政教育⽉专题党课
          12⽉20⽇上午09:00点，市场安监党⽀部在⽀部党员活动室召开党员⼤会，由公司党委副书记总经理任胜华给全体党员上廉政党课
          ⼀、 回顾这⼀年来集团在廉政⽅⾯情况
          2023年对集团来说是不平凡的⼀年，集团内部发⽣许多事，特别是集团⾼层涉案，给集团内部特别是员⼯队伍的稳定产⽣很⼤的影响，可以说是
          波动较⼤的⼀年
          ⼆、 公司廉政建设
          1、党⻛廉政建设永远在路上
           中央⼋项规定出台已经有11年啦，11年来中央在反腐⽅⾯⼀直有⾼的要求，严的举措，反映了党中央对反腐倡廉的⾼度重视。把它提升到治国
          理政的⾼度。这⼏年⽼⻁⼀直在打，从严要求⼀直在延续，我们任何⼈都要遵章守纪
          2、不要有任何侥幸⼼理
           ⻰吴的环境及客户群体较复杂，我们讲廉政，讲反腐就是要做到没⼈想腐、没⼈敢腐、没⼈能腐。坚持做到常在河边⾛就是不湿鞋。要有底线
          思维，要坚守到退休
          3、要直⾯未来、坚守初⼼，做⼀个正直、忠诚的⼈
          ⼈的能⼒有⼤⼩。但⼈品是可以塑造的。作为上港员⼯要忠诚于集团的发展、忠诚于公司、忠诚于岗位。作为党员要起表率作⽤。⽬前国家经济
          正在转型，虽然困难但要有信⼼，要有攻坚克难的准备。只有良好的党⻛才能营造良好的范围。
          最后，感谢⼤家，在2023年即将过去的时候，感谢⼤家⼀年来的付出，特别是疫情过后市场形势不佳，⼤家在岗位上的付出，做出贡献，谢谢⼤
          家`,
          colSpan: 2,
          editable: false,
          breakInside: false,
        },
      ],
    ],
  }),
  党费: () => ({
    pagePadding: "10px",
    theader: [
      { content: "党组织", width: 120, style: theaderStyle },
      { content: "1月", width: 20, style: theaderStyle },
      { content: "2月", width: 20, style: theaderStyle },
      { content: "3月", width: 20, style: theaderStyle },
      { content: "4月", width: 20, style: theaderStyle },
      { content: "5月", width: 20, style: theaderStyle },
      { content: "6月", width: 20, style: theaderStyle },
      { content: "7月", width: 20, style: theaderStyle },
      { content: "8月", width: 20, style: theaderStyle },
      { content: "9月", width: 20, style: theaderStyle },
      { content: "10月", width: 20, style: theaderStyle },
      { content: "11月", width: 20, style: theaderStyle },
      { content: "12月", width: 20, style: theaderStyle },
      { content: "小计", width: 20, style: theaderStyle },
    ],
    tbody: Array.from({ length: 5 }, () => [
      { content: "国客中⼼投资企业党⽀部", width: 120 },
      { content: "1813", width: 20 },
      { content: "1830", width: 20 },
      { content: "1957", width: 20 },
      { content: "1807", width: 20 },
      { content: "1804", width: 20 },
      { content: "1811", width: 20 },
      { content: "1775", width: 20 },
      { content: "1730", width: 20 },
      { content: "1855", width: 20 },
      { content: "1799", width: 20 },
      { content: "2055", width: 20 },
      { content: "2032", width: 20 },
      { content: "22268", width: 20 },
    ]),
  }),
  deliberation: (data) => ({
    theader: null,
    data: data,
    tbody: [
      [
        {
          title: "评议标题：",
          key: "main",
          content:
            "公司党委副书记总经理上廉政党课《警钟⻓鸣始于⼼，⻛清正⽓践于⾏》",
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        {
          title: "出席：",
          key: "showup",
          content:
            "任胜华、詹永忠、林中芳、陈建清、卫锋、周向军、陈玲⼦、赵平、袁慧强、刘兵、⾼强、张毅、朱专东、陈健",
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        {
          title: "缺席：",
          key: "quexi",
          content: "彭⽴卫",
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        { key: "label", content: "主持人", width: 64, editable: false },
        { key: "orgName", content: "", width: 100, editable: false },
        { key: "label", content: "记录⼈", width: 64, editable: false },
        { key: "orgName", content: "", width: 100, editable: false },
      ],
      [
        {
          title: "会议记录：",
          key: "quexi",
          content: `开展批评与⾃我批评
          徐越男：按照组织要求学习才会学，缺乏主动去学的意识；在⼯作⽅⾯，对集装箱运⼒期货⽅⾯的知识要多了解，同时要加强客户维护，多⾛访
          客户进⾏沟通交流。
          符隽：公司下属企业财务⼈员变动较⼤，后期要加强培养⼒度，为梯队建设培养⼈才，更好地为企业服务。对于⾃身⽅⾯，就是要⽴⾜本职，理
          论联系实际，因为现在还兼任远海物流的财务⼯作，对于这块新领域也是⼀个新挑战。对于徐浩杰来到机关快10个⽉了，成⻓还是较快的，业务
          接受能⼒快，有创新，能梳理流程。希望今后全⾯学习，加强沟通，发现问题，解决问题，同时专业知识也要不断学习。
          丁⼠伦：⾃⼰对党的理论学习较少，缺乏主动学的意识，同时在业务上要不断开发新领域，增强业务知识。
          徐浩杰：要多学多问，明确学习的⽅向，努⼒完善不⾜之处。
          朱军：在业务上缺乏专业知识，要多向部⻔其他同事学习，带领好部⻔员⼯，努⼒开拓市场。
          张雪华：作为党⼩组⻓，可能也都按照组织要求学什么就学什么，主动学的意识不强，对于理论知识理解的还不透彻，还是要静下⼼来多读书，
          读好书。其次对于⼯作上，有时还不够仔细，在合同、投标资料上要更细⼼更专业。`,
          colSpan: 4,
          editable: false,
          breakInside: false,
        },
      ],
      [
        { key: "label", content: "备注", width: 64, editable: false },
        { key: "orgName", content: "无备注", colSpan: 4, editable: false },
      ],
    ],
  }),
};

/* function run(fn) {
  let cache = [];
  let i = 0;
  const originalFetch = window.fetch;
  window.fetch = (...args) => {
    if (cache[i]) {
      if (cache[i].status === "fulfilled") {
        return cache[i].data;
      } else if (cache[i].status === "rejected") {
        throw cache[i].err;
      }
    }
    const result = {
      status: "pending",
      data: null,
      err: null,
    };
    cache[i++] = result;
    const promise = originalFetch(...args)
      .then((resp) => resp.json())
      .then(
        (resp) => {
          result.status;
          result.data = resp;
        },
        (err) => {
          result.status = "rejected";
          result.err = err;
        }
      );
    throw promise;
  };
  try {
    fn();
  } catch (err) {
    if (err instanceof Promise) {
      const reRun = () => {
        i = 0;
        fn();
      };
      err.then(reRun, reRun);
    }
  }
} */

const TEMPLATES2 = {
  // 支部情况
  branchInfo: {
    title: "支部情况",
    type: "FORM",
    colSpan: 2,
    data: [
      {
        label: "支部名称",
        prop: "orgName",
        type: "text",
        colSpan: 2,
        widths: [1505, 8000],
      },
      { indent: "支部介绍", prop: "introduce", type: "text" },
      { indent: "照片", prop: "img", type: "img" },
    ],
    columnWidths: [1505, 8000],
  },
  // 党支部委员名单
  committeeLeader: {
    title: "党支部委员名单",
    type: "TABLE",
    data: [
      { label: "姓名", prop: "memberName" },
      { label: "岗位职务", prop: "adminPost" },
      { label: "入党时间", prop: "joinDate" },
      { label: "分工内容", prop: "workDep" },
    ],
  },
  // 党小组长名单
  groupLeader: {
    title: "党小组长名单",
    type: "TABLE",
    data: [
      { label: "姓名", prop: "memberName" },
      { label: "岗位职务", prop: "adminPost" },
      { label: "入党时间", prop: "joinDate" },
      { label: "分工内容", prop: "workDep" },
    ],
  },
  // 党小组管理
  memberGroup: {
    title: "党小组管理",
    type: "TABLE",
    data: [
      { label: "小组名称", prop: "groupName" },
      { label: "负责人", prop: "leader" },
    ],
  },
  // 党员名册
  formalMember: {
    title: "党员名册",
    type: "TABLE",
    data: [
      { label: "党员姓名", prop: "memberName" },
      { label: "性别", prop: "sex" },
      { label: "出生年月", prop: "birthday" },
      { label: "入党时间", prop: "joinDate" },
      { label: "学历", prop: "edu" },
      { label: "党内分工", prop: "adminPost" },
      { label: "所属党支部", prop: "orgName" },
      { label: "所属党小组", prop: "groupName" },
    ],
  },
  // 党员调动记录
  memberTransfer: {
    title: "党员调动记录",
    type: "TABLE",
    data: [
      { label: "党员姓名", prop: "memberName" },
      { label: "由何处调出", prop: "outOrgName" },
      { label: "由何处调⼊", prop: "inOrgName" },
      { label: "调出⽇期", prop: "outDate" },
      // { label: "调⼊⽇期", prop: "没有" },
    ],
  },
  // 帮困记录
  help: {
    title: "帮困记录",
    type: "TABLE",
    data: [
      { label: "姓名", prop: "helpName" },
      { label: "性别", prop: "sex" },
      { label: "政治面貌", prop: "zzmm" },
      { label: "困难情况", prop: "poorSitu" },
    ],
  },
  // 谈心谈话
  talk: {
    title: "谈心谈话",
    type: "TABLE",
    data: [
      { label: "姓名", prop: "helpName" },
      { label: "性别", prop: "sex" },
      { label: "政治面貌", prop: "zzmm" },
      { label: "谈话时间", prop: "talkTime" },
      { label: "困难情况", prop: "poorSitu" },
    ],
  },
  // 发展党员
  developMember: {
    title: "发展党员",
    type: "TABLE",
    data: [
      { label: "党员姓名", prop: "memberName", type: "text", width: 1505 },
      { label: "所属党⽀部", prop: "orgName", type: "text", width: 2000 },
      { label: "所属党⼩组", prop: "groupName", type: "text", width: 2000 },
      { label: "出⽣⽇期", prop: "birthday", type: "text", width: 2000 },
      {
        label: "⼈员阶段",
        prop: "status",
        type: "text",
        dict: "statusMap",
        width: 2000,
      },
    ],
    columnWidths: [1505, 2000, 2000, 2000, 2000],
  },
  // 党支部大会记录
  branch: {
    title: "党支部大会记录",
    type: "FORM",
    colSpan: 4,
    data: [
      { indent: "会议主题或主要内容：", prop: "title", type: "text" },
      {
        label: "日期",
        prop: "actualDate",
        type: "text",
        colSpan: 4,
        widths: [1505, 3000],
      },
      { indent: "出席：", prop: "attenders", type: "text" },
      { indent: "缺席：", prop: "absentees", type: "text" },
      {
        label: "主持人",
        prop: "hoster",
        type: "text",
        colSpan: 2,
        widths: [1505, 3000],
      },
      {
        label: "记录⼈",
        prop: "recorder",
        type: "text",
        colSpan: 2,
        widths: [1505, 3000],
      },
      { indent: "会议记录：", prop: "detail", type: "text" },
      // { label: "备注", prop: "", type: "null", colSpan: 3 },
    ],
    columnWidths: [1505, 3000, 1505, 3000],
  },
  // 党支委会会议
  brach: {
    title: "党支委会会议",
    type: "TABLE",
    data: [
      { label: "⽇期", prop: "actualDate", type: "text", width: 1505 },
      {
        label: "出席⼈员（签名）",
        prop: "attenders",
        type: "text",
        width: 2000,
      },
      { label: "会议主要议题", prop: "detail", type: "text", width: 6000 },
    ],
    columnWidths: [1505, 2000, 6000],
  },
  // 党小组会议
  orgLifeRecord: {
    title: "党小组会议",
    type: "FORM",
    colSpan: 4,
    data: [
      { indent: "会议主题或主要内容：", prop: "title", type: "text" },
      {
        label: "⽇期",
        prop: "actualDate",
        type: "text",
        colSpan: 4,
        widths: [1050, 3000],
      },
      { indent: "出席：", prop: "attenders", type: "text" },
      { indent: "缺席：", prop: "absentees", type: "text" },
      {
        label: "主持人",
        prop: "hoster",
        type: "text",
        colSpan: 2,
        widths: [1050, 3000],
      },
      {
        label: "记录⼈",
        prop: "recorder",
        type: "text",
        colSpan: 2,
        widths: [1050, 3000],
      },
      { indent: "会议记录：", prop: "detail", type: "text" },
      // { label: "备注", prop: "", type: "null", colSpan: 3 },
    ],
    columnWidths: [1505, 3000, 1505, 3000],
  },
  // 党课记录
  lessonRecord: {
    title: "党课记录",
    type: "FORM",
    colSpan: 4,
    data: [
      { indent: "课题：", prop: "title", type: "text" },
      {
        label: "⽇期",
        prop: "actualDate",
        type: "text",
        colSpan: 4,
        widths: [1050, 3000],
      },
      { indent: "出席：", prop: "attenders", type: "text" },
      { indent: "缺席：", prop: "absentees", type: "text" },
      // { label: "主持人", prop: "无此字段", type: "text" },
      // { label: "记录⼈", prop: "无此字段", type: "text" },
      { indent: "会议记录：", prop: "detail", type: "text" },
      // { label: "备注", prop: "", type: "null", colSpan: 3 },
    ],
    columnWidths: [1505, 3000, 1050, 3000],
  },
  // 主题党日 没了
  // partyDay: {
  //   type: "FORM",
  //   colSpan: 4,
  //   data: [
  //     { indent: "课题：", prop: "不知道", type: "text" },
  //     { indent: "出席：", prop: "不知道", type: "text" },
  //     { indent: "缺席：", prop: "不知道", type: "text" },
  //     { label: "主持人", prop: "不知道", type: "text" },
  //     { label: "记录⼈", prop: "不知道", type: "text" },
  //     { indent: "会议记录：", prop: "不知道", type: "text" },
  //     { label: "备注", prop: "不知道", type: "text" },
  //   ],
  //   columnWidths: [1505, 2000, 2505, 3000],
  // },
  // 支部年度工作计划
  plan: {
    title: "支部年度工作计划",
    type: "FORM",
    colSpan: 2,
    data: [
      {
        label: "标题",
        prop: "title",
        type: "text",
        colSpan: 2,
        widths: [1050, 8000],
      },
      {
        label: "年度",
        prop: "year",
        type: "text",
        colSpan: 2,
        widths: [1050, 8000],
      },
      { indent: "会议记录：", prop: "planDetail", type: "html" },
    ],
    columnWidths: [1050, 8000],
  },
  // 支部年度工作总结
  summary: {
    title: "支部年度工作总结",
    type: "FORM",
    colSpan: 2,
    data: [
      {
        label: "标题",
        prop: "title",
        type: "text",
        colSpan: 2,
        widths: [1050, 8000],
      },
      {
        label: "年度",
        prop: "year",
        type: "text",
        colSpan: 2,
        widths: [1050, 8000],
      },
      { indent: "会议记录：", prop: "summaryDetail", type: "html" },
    ],
    columnWidths: [1050, 8000],
  },
  // 党费 数据结构待处理
  partyDuesSummary: {
    title: "党费",
    type: "TABLE",
    data: [
      { label: "党组织", prop: "name", width: 1370 },
      { label: "1月", prop: "01", width: 990 },
      { label: "2月", prop: "02", width: 990 },
      { label: "3月", prop: "03", width: 990 },
      { label: "4月", prop: "04", width: 990 },
      { label: "5月", prop: "05", width: 990 },
      { label: "6月", prop: "06", width: 990 },
      { label: "7月", prop: "07", width: 990 },
      { label: "8月", prop: "08", width: 990 },
      { label: "9月", prop: "09", width: 990 },
      { label: "10月", prop: "10", width: 990 },
      { label: "11月", prop: "11", width: 990 },
      { label: "12月", prop: "12", width: 990 },
      { label: "小计", prop: "summary", width: 990 },
    ],
  },
  // 党员民主评议管理
  deliberation: {
    title: "党员民主评议管理",
    type: "FORM",
    colSpan: 4,
    data: [
      { indent: "评议标题：", prop: "title", type: "text" },
      { indent: "出席：", prop: "participants", type: "text" },
      { indent: "缺席：", prop: "absentee", type: "text" },
      // { label: "主持人", prop: "无此字段", type: "text" },
      // { label: "记录⼈", prop: "无此字段", type: "text" },
    ],
    columnWidths: [1505, 2000, 2505, 3000],
  },
};
export default {
  SIZE,
  MAP,
  TEMPLATES: TEMPLATES2,
};
