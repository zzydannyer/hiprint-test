<template>
  <div class="table-drag">
    <table>
      <caption>
        标题
      </caption>
      <thead>
        <tr>
          <th
            v-for="(h, i) in tableHeader"
            :key="i"
            @mousedown="mouseDown"
            @mouseup="mouseUp"
            @mousemove="mouseMove"
          >
            {{ h }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(b, i) in tableBody" :key="i">
          <td v-for="(d, j) in b" :key="j">{{ d }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "table-drag",
  data() {
    return {
      tableHeader: ["#", "⽇期", "出席⼈员（签名）", " 会议主要议题"],
      tableBody: [
        [
          "1",
          "2023-12-20",
          "全体⼈员",
          `1、学习贯彻习近平总书记重要讲话和重要指示批示精神。结合主题教育开展期
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
        ],
        [
          "1",
          "2023-12-20",
          "全体⼈员",
          `1、学习贯彻习近平总书记重要讲话和重要指示批示精神。结合主题教育开展期
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
        ],
        [
          "1",
          "2023-12-20",
          "全体⼈员",
          `1、学习贯彻习近平总书记重要讲话和重要指示批示精神。结合主题教育开展期
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
            料2023年12⽉》教育，积极构建⻛清⽓正的部⻔和谐氛围。1、学习贯彻习近
            平总书记重要讲话和重要指示批示精神。结合主题教育开展期
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
        ],
      ],
      localTd: null,
    };
  },
  methods: {
    /** 鼠标按下 */
    mouseDown(e) {
      // 记录单元格
      if (!(e && e.target)) return;
      this.localTd = e.target;
      if (e.offsetX > this.localTd.offsetWidth - 10) {
        this.localTd.mouseDown = true;
        this.localTd.oldX = e.x;
        this.localTd.oldWidth = this.localTd.offsetWidth;
      }
    },
    /** 鼠标抬起 */
    mouseUp(e) {
      // 结束宽度调整
      if (!(e && e.target)) return;
      if (!this.localTd) this.localTd = e.target;
      this.localTd.mouseDown = false;
      this.localTd.style.cursor = "default";
    },
    /** 鼠标移动 */
    mouseMove(e) {
      if (!(e && e.target)) return;
      const vm = e.target;
      // 更改鼠标样式
      if (e.offsetX > vm.offsetWidth - 10) {
        vm.style.cursor = "col-resize";
      } else {
        vm.style.cursor = "default";
      }
      // 取出暂存的Table Cell
      if (!this.localTd) this.localTd = vm;
      if (this.localTd.mouseDown !== null && this.localTd.mouseDown === true) {
        this.localTd.style.cursor = "default";
        if (this.localTd.oldWidth + (e.x - this.localTd.oldX) > 0) {
          this.localTd.width =
            this.localTd.oldWidth + (e.x - this.localTd.oldX);
        }
        // 调整列宽
        this.localTd.style.width = this.localTd.width;
        this.localTd.style.cursor = "col-resize";
        // 调整该列中的每个Cell
        let table = this.localTd;
        while (table.tagName !== "TABLE") table = table.parentElement;
        for (let j = 0; j < table.rows.length; j++) {
          table.rows[j].cells[this.localTd.cellIndex].width =
            this.localTd.width;
        }
      }
    },
  },
};
</script>

<style>
.table-drag {
  padding-top: 50px;
  table {
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #909399;
    color: #363636;
    width: 100%;
    text-align: center;
    table-layout: auto;
    margin: 0 auto;
  }
  td,
  th {
    border: 1px solid #909399;
    padding: 5px;
    word-break: break-all;
  }
}
</style>
