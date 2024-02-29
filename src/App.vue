<template>
  <div id="app">
    <!-- <el-button type="primary" @click="html2docx">点击html2docx</el-button> -->
    <el-button type="primary" @click="docxPlugin">点击docxPlugin</el-button>
    <el-button type="primary" @click="docxCore">点击docxCore</el-button>
    <div id="bodyContainer"></div>
    <!-- <div v-html="HTMLString.text"></div> -->
    <!-- :style="{
      width: `${page.width + 2}px`,
      minHeight: `${page.height + 2}px`,
    }" -->

    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="handleClose"> &times; </span>
        <div> -->
    <!-- <CanvasEditor /> -->
    <!-- <PrintContainer v-loading="loading" :data="templateData" /> -->
    <!-- <div id="html2docx">
      <table style="border: 0px">
        <tr style="border: 0px">
          <td
            style="
              width: 600px;
              text-align: center;
              padding: 6px;
              border: 0px;
              margin-bottom: 20px;
              background-color: #f7f7f7;
            "
          >
            <span>支部情况</span>
          </td>
        </tr>
      </table>
      <table>
        <tbody>
          <tr>
            <td style="width: 100px; font-size: 10pt">支部名称</td>

            
            <td style="width: 500px; font-size: 10pt">宜东分公司机关党支部</td>
          </tr>
          <tr>
            <td colspan="2" style="font-size: 10pt">内容</td>
          </tr>
        </tbody>
      </table>
      <div>
        <span>支部介绍</span>
        <div v-html="HTMLString.text"></div>
      </div>
      <span style="background-color: #f7f7f7; margin-bottom: 20px">
        支部情况
      </span>
      <table>
        <thead>
          <tr>
            <td>序号</td>
            <td>重点内容</td>
            <td>主要工作</td>
            <td>具体措施</td>
            <td>时间进度</td>
            <td>责任人</td>
          </tr>
        </thead>
        <tbody>
          <img src="" alt="" />
          <tr>
            <td colspan="6">
              <img :src="HTMLString.image" />
            </td>
          </tr>
        </tbody>
      </table>
    </div> -->
    <!-- <ToolBar /> -->
    <div style="text-align: center">
      <!-- <el-button type="primary" size="mini" @click="handleOpen">
        编辑打印
      </el-button>

      <el-button type="primary" size="mini" @click="printByHiprint">
        hiprint
      </el-button>
      <el-button type="primary" size="mini" @click="printByPrintThis">
        printThis
      </el-button> -->

      <!-- <div id="editor" style="display: none">
        <input type="number" id="fontSizeInput" value="16" min="10" max="36" />
        pt
        <button id="applyFontSize">应用字体大小</button>
      </div> -->
    </div>
    <!-- </div>
      </div>
    </div> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <!-- <CanvasEditor /> -->

    <p>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 机关党支部2023年工作任务清单
    </p>
    \r\n\r\n
    <table border="1" cellpadding="0" cellspacing="0" style="width: 949px">
      \r\n\t
      <thead>
        \r\n\t\t
        <tr>
          \r\n\t\t\t
          <th style="height: 21px; width: 32px">
            \r\n\t\t\t
            <p>序号</p>
            \r\n\t\t\t
          </th>
          \r\n\t\t\t
          <th style="height: 21px; width: 84px">
            \r\n\t\t\t
            <p>重点内容</p>
            \r\n\t\t\t
          </th>
          \r\n\t\t\t
          <th style="height: 21px; width: 104px">
            \r\n\t\t\t
            <p>主要工作</p>
            \r\n\t\t\t
          </th>
          \r\n\t\t\t
          <th style="height: 21px; width: 520px">
            \r\n\t\t\t
            <p>具体措施</p>
            \r\n\t\t\t
          </th>
          \r\n\t\t\t
          <th style="height: 21px; width: 84px">
            \r\n\t\t\t
            <p>时间进度</p>
            \r\n\t\t\t
          </th>
          \r\n\t\t\t
          <th style="height: 21px; width: 122px">
            \r\n\t\t\t
            <p>责任人</p>
            \r\n\t\t\t
          </th>
          \r\n\t\t
        </tr>
        \r\n\t
      </thead>
      \r\n\t
      <tbody>
        \r\n\t\t
        <tr>
          \r\n\t\t\t
          <td rowspan="3" style="height: 36px; width: 32px">
            \r\n\t\t\t
            <p>一</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td rowspan="3" style="height: 36px; width: 84px">
            \r\n\t\t\t
            <p>抓好政治理论学习教育，不断筑牢党员队伍思想根基</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 36px; width: 104px">
            \r\n\t\t\t
            <p>守牢政治纪律和政治规矩</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 36px; width: 520px">
            \r\n\t\t\t
            <p>
              教育引导全体党员、干部始终在政治立场、政治方向、政治原则、政治道路上同以习近平同志为核心的党中央保持高度一致，深刻领悟&ldquo;两个确立&rdquo;的决定性意义，坚决做到&ldquo;两个维护&rdquo;，不折不扣贯彻落实党的路线方针政策和党中央重大决策部署以及上级党组织的部署安排，对照集团巡察问题反馈清单，高标准落实党支部整改工作。
            </p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td rowspan="13" style="height: 36px; width: 84px">
            \r\n\t\t\t
            <p>全年</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td rowspan="2" style="height: 36px; width: 122px">
            \r\n\t\t\t
            <p>支部班子成员</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t
        </tr>
        \r\n\t\t
        <tr>
          \r\n\t\t\t
          <td style="height: 23px; width: 104px">
            \r\n\t\t\t
            <p>深入学习贯彻党的二十大精神</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 23px; width: 520px">
            \r\n\t\t\t
            <p>
              把学习宣传贯彻党的二十大精神作为当前和今后一个时期首要的政治任务抓实抓牢，根据公司党委学习要求，制定党支部学习计划，将全体党员的思想和行动统一到党的二十大精神上来。坚持学以致用，结合实际，努力把学习成果转化为推动公司发展的实际成效。
            </p>
            \r\n\t\t\t
          </td>
          \r\n\t\t
        </tr>
        \r\n\t\t
        <tr>
          \r\n\t\t\t
          <td style="height: 39px; width: 104px">
            \r\n\t\t\t
            <p>深入学习党章党规党纪</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 39px; width: 520px">
            \r\n\t\t\t
            <p>
              以学习新党章为抓手，坚决维护党章权威，遵守党的纪律，准则、条例、规则等党内法规，敢于斗争、善于斗争，牢固树立遵规守纪的意识，
            </p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 39px; width: 122px">
            \r\n\t\t\t
            <p>支部班子成员</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t
        </tr>
        \r\n\t\t
        <tr>
          \r\n\t\t\t
          <td rowspan="3" style="height: 34px; width: 32px">
            \r\n\t\t\t
            <p>二</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td rowspan="3" style="height: 34px; width: 84px">
            \r\n\t\t\t
            <p>着力强化党建责任，不断提高党支部规范化建设水平</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 34px; width: 104px">
            \r\n\t\t\t
            <p>严格落实党建工作责任制</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 34px; width: 520px">
            \r\n\t\t\t
            <p>
              根据集团《党支部规范化建设实施细则》和党建目标责任制考核要求，加强季度自查自纠，及时维护支部目视管理内容和党建平台数据信息，查缺补漏，落实落细党建目标责任制各项工作要求。
            </p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 34px; width: 122px">
            \r\n\t\t\t
            <p>党支部书记</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t
        </tr>
        \r\n\t\t
        <tr>
          \r\n\t\t\t
          <td style="height: 37px; width: 104px">
            \r\n\t\t\t
            <p>严格执行各项组织制度</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 37px; width: 520px">
            \r\n\t\t\t
            <p>
              重点执行落实好&ldquo;三会一课&rdquo;、党员领导干部双重组织生活、民主评议党员等基本制度。严格按照规范程序，开展党支部换届选举工作。充分运用市内红色资源，组织党员参观见学、观摩红色电影，进一步丰富党支部主题党日形式和内容，提高组织生活质量
            </p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td rowspan="2" style="height: 37px; width: 122px">
            \r\n\t\t\t
            <p>支部班子成员</p>
            \r\n\r\n\t\t\t
            <p>各党小组长</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t
        </tr>
        \r\n\t\t
        <tr>
          \r\n\t\t\t
          <td style="height: 36px; width: 104px">
            \r\n\t\t\t
            <p>严格队伍管理</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 36px; width: 520px">
            \r\n\t\t\t
            <p>
              围绕服务生产，结合党小组活动、志愿服务、党员培训等形式，强化党员教育管理，落实党员积分制制度和32学时集中学习培训制度，严格落实&ldquo;学习强国&rdquo;、集团党建网学习要求。加强党员8小时外的教育监督管理，引导党员时刻牢记身份，做遵规守纪的表率。落实好党员发展要求，上半年，完成2名发展对象的发展工作，继续加强1名入党积极份子的培养和考察工作，进一步充实优化党员队伍。
            </p>
            \r\n\t\t\t
          </td>
          \r\n\t\t
        </tr>
        \r\n\t\t
        <tr>
          \r\n\t\t\t
          <td rowspan="2" style="height: 22px; width: 32px">
            \r\n\t\t\t
            <p>三</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td rowspan="2" style="height: 22px; width: 84px">
            \r\n\t\t\t
            <p>积极融入中心、服务中心，不断提高服务保障能力</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 22px; width: 104px">
            \r\n\t\t\t
            <p>深入推进党建融合</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 22px; width: 520px">
            \r\n\t\t\t
            <p>
              围绕公司生产经营重点工作，组织党员干部积极开展立功竞赛、党员先锋岗等活动。把握引领、保障、服务三个环节，将党建力转化为推动公司发展的生产力，深刻融入生产经营中心工作。
            </p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 22px; width: 122px">
            \r\n\t\t\t
            <p>支部班子成员</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t
        </tr>
        \r\n\t\t
        <tr>
          \r\n\t\t\t
          <td style="height: 38px; width: 104px">
            \r\n\t\t\t
            <p>增强服务保障的驱动力</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 38px; width: 520px">
            \r\n\t\t\t
            <p>
              聚焦日常工作中的难点和瓶颈问题，以集团、公司党员攻坚行动、生产立功竞赛、评优评先活动等为抓手，不断激发党员引领示范效应和服务保障作用，助力公司生产保障。注重发挥支委班子的合力作用，以点带面促进支部建设整体提升，为公司各项生产经营目标的顺利实现提供保障。
            </p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 38px; width: 122px">
            \r\n\t\t\t
            <p>支部班子成员</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t
        </tr>
        \r\n\t
      </tbody>
      \r\n\t
      <thead>
        \r\n\t\t
        <tr>
          \r\n\t\t\t
          <th rowspan="2" style="height: 19px; width: 32px">
            \r\n\t\t\t
            <p>四</p>
            \r\n\t\t\t
          </th>
          \r\n\t\t\t
          <th rowspan="2" style="height: 19px; width: 84px">
            \r\n\t\t\t
            <p>持续推进党风廉政建设，不断强化党员纪律意识</p>
            \r\n\t\t\t
          </th>
          \r\n\t\t\t
          <th style="height: 19px; width: 104px">
            \r\n\t\t\t
            <p>严格执行党风廉政责任制</p>
            \r\n\t\t\t
          </th>
          \r\n\t\t\t
          <th style="height: 19px; width: 520px">
            \r\n\t\t\t
            <p>
              根据公司党风廉政建设年度工作要点和责任清单，认真开展党支部党风廉政建设责任分工。调整梳理党支部&ldquo;三级预控网络&rdquo;责任人队伍和廉洁风险预控源，细化预控措施。加强&ldquo;三检查一评议&rdquo;季度工作，以关键岗位为人员为主要对象，组织签订《廉洁承诺书》，严格落实廉洁从业季度报告制度，加强警示教育，促进廉洁从业。
            </p>
            \r\n\t\t\t
          </th>
          \r\n\t\t\t
          <th style="height: 19px; width: 122px">
            \r\n\t\t\t
            <p>党支部书记</p>
            \r\n\t\t\t
          </th>
          \r\n\t\t
        </tr>
        \r\n\t\t
        <tr>
          \r\n\t\t\t
          <th style="height: 46px; width: 104px">
            \r\n\t\t\t
            <p>持续改进作风</p>
            \r\n\t\t\t
          </th>
          \r\n\t\t\t
          <th style="height: 46px; width: 520px">
            \r\n\t\t\t
            <p>
              认真学习和落实公司关于加强党员干部作风建设的措施和要求，结合巡察整改、领导人员作风纪律专项整治教育和党风廉政教育月活动等，进一步加强党员干部作风教育，强化主动担当的意识，不断提高工作执行力，不折不扣落实好上级决策部署和工作要求，提高工作成效。
            </p>
            \r\n\t\t\t
          </th>
          \r\n\t\t\t
          <th style="height: 46px; width: 122px">
            \r\n\t\t\t
            <p>支部班子成员</p>
            \r\n\t\t\t
          </th>
          \r\n\t\t
        </tr>
        \r\n\t
      </thead>
      \r\n\t
      <tbody>
        \r\n\t\t
        <tr>
          \r\n\t\t\t
          <td rowspan="3" style="height: 34px; width: 32px">
            \r\n\t\t\t
            <p>五</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td rowspan="3" style="height: 34px; width: 84px">
            \r\n\t\t\t
            <p>坚持服务职工群众，不断促进和谐发展</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 34px; width: 104px">
            \r\n\t\t\t
            <p>关心关爱职工群众</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 34px; width: 520px">
            \r\n\t\t\t
            <p>
              以公司&ldquo;三会&rdquo;、厂情发布会、领导人员双重组织生活会等为抓手，加强形势任务宣传教育，凝聚职工思想共识。经常关心职工思想、工作和生活情况，加大关怀帮扶力度，积极开展帮困送温暖和家访慰问工作，了解掌握职工及家庭实际状况，稳妥化解和处理不稳定因素，稳定职工队伍。
            </p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 34px; width: 122px">
            \r\n\t\t\t
            <p>支部班子成员</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t
        </tr>
        \r\n\t\t
        <tr>
          \r\n\t\t\t
          <td style="height: 38px; width: 104px">
            \r\n\t\t\t
            <p>积极构建和谐家园</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 38px; width: 520px">
            \r\n\t\t\t
            <p>
              结合公司徒步走、周年庆等活动，适时组织开展形式多样职工文体活动，进一步丰富活动形式和内容。同时进一步做实服务职工实事项目，坚持做好劳动安全、防寒保暖、防暑降温等职工劳动保护工作。协助公司积极开展上海市文明单位创建工作，进一步提升企业良好形象和职工文明素养。
            </p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 38px; width: 122px">
            \r\n\t\t\t
            <p>支部班子成员</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t
        </tr>
        \r\n\t\t
        <tr>
          \r\n\t\t\t
          <td style="height: 38px; width: 104px">
            \r\n\t\t\t
            <p>大力支持团青工作</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 38px; width: 520px">
            \r\n\t\t\t
            <p>
              坚持贯彻党建带团建的要求，认真落实公司加强群团工作的要求，加强党对群团工作的领导，进一步增强群团组织的生机活力，发挥群团组织的优势，更好地促进公司生产发展。
            </p>
            \r\n\t\t\t
          </td>
          \r\n\t\t\t
          <td style="height: 38px; width: 122px">
            \r\n\t\t\t
            <p>支部班子成员</p>
            \r\n\t\t\t
          </td>
          \r\n\t\t
        </tr>
        \r\n\t
      </tbody>
      \r\n
    </table>
    \r\n\r\n
    <p>&nbsp;</p>
    \r\n
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import ToolBar from "@/components/ToolBar.vue";
import PrintContainer from "@/components/PrintContainer.vue";
import { SIZE } from "./utils/constants";
import { saveAs } from "file-saver";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
// import HTMLtoDOCX from "html-to-docx";
// import officegen from "officegen";
// import { Buffer } from "buffer";
import "../public/printThis.js";
import templateData from "./data";
import HTMLString from "./utils/htmlString";
import DocumentCreator from "@/docx/core";
import { renderAsync } from "docx-preview";
import {
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  VerticalAlign,
  TextDirection,
  ImageRun,
  WidthType,
} from "docx";

import CanvasEditor from "./components/CanvasEditor.vue";

// window.Buffer = Buffer;
function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
// 计算分辨率
// $(document).ready(function () {
//   const selectedText = "";
//   const $selectedCell = null;

//   function getSelectedText() {
//     if (window.getSelection) {
//       const selection = window.getSelection();
//       if (selection.rangeCount > 0) {
//         return selection.getRangeAt(0).toString();
//       }
//     } else if (document.selection && document.selection.type != "Control") {
//       return document.selection.createRange().text;
//     }
//     return "";
//   }

//   $("#app td").mouseup(function (e) {
//     selectedText = getSelectedText();
//     if (selectedText) {
//       $selectedCell = $(e.target);
//       $("#editor").show().css({
//         top: e.pageY,
//         left: e.pageX,
//       });
//     } else {
//       $("#editor").hide();
//     }
//   });

//   $("#applyFontSize").click(function () {
//     if (selectedText && $selectedCell) {
//       const fontSize = $("#fontSizeInput").val();
//       const modifiedHtml = $selectedCell
//         .html()
//         .replace(
//           new RegExp(`(${selectedText})`, "g"),
//           `<span style="font-size:${fontSize}px;">$1</span>`
//         );
//       $selectedCell.html(modifiedHtml);
//       $("#editor").hide();
//     }
//   });
// });
async function imageUrlToBlob(imageUrl) {
  const response = await fetch(imageUrl);
  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }
  const blob = await response.blob();
  return blob;
}

export default {
  name: "App",
  components: {
    HelloWorld,
    ToolBar,
    PrintContainer,
    CanvasEditor,
  },
  provide() {
    return {
      PPI: this.PPI,
      name: "xxxxxxxxxxxxxx支部",
    };
  },
  beforeCreate() {
    // hiprint.init({
    //   providers: [new defaultElementTypeProvider()],
    // });
  },
  data() {
    return {
      // hiprintTemplate: null,
      PPI: this.getPPI(),
      previewVisible: false,
      mode: "Portrait", // 打印横竖方向，竖portrait，横Landscape
      templateData: {},
      loading: false,
      SIZE,
      HTMLString,
      styleConfig: {
        fontSize: 18,
        cellMargin: 100,
        lineSpacing: 240,
      },
    };
  },
  computed: {
    page() {
      // const width = 8.27 * DPI;
      // const height = 11.69 * DPI;
      // if (this.mode === "Landscape") {
      //   return { width: height, height: width };
      // }
      // return { width, height };
    },
    /** 边距 */
    padding() {
      // 1英寸 = 25.4 毫米
      // 边距为10mm
      // return (1 / 25.4) * 10 * DPI;
    },
  },
  created() {
    // this.getData();
  },
  mounted() {
    // this.renderDoc();
    // this.docxPlugin();
  },
  methods: {
    docxCore() {
      const page = new DocumentCreator();
      page.create();
    },
    HTML2DocxConfig(element) {
      let docxElements = [];
      let that = this;
      function processCell(cellElement) {
        const paragraph = new Paragraph({
          text: cellElement.textContent,
          // 设置段落字体大小
          run: {
            size: that.styleConfig.fontSize,
          },
        });
        const cellOptions = {
          children: [paragraph],
          margins: {
            top: that.styleConfig.cellMargin,
            bottom: that.styleConfig.cellMargin,
            left: that.styleConfig.cellMargin,
            right: that.styleConfig.cellMargin,
          },
          verticalAlign: VerticalAlign.CENTER,
        };

        // 处理 colspan
        if (cellElement.hasAttribute("colspan")) {
          cellOptions.columnSpan = parseInt(
            cellElement.getAttribute("colspan"),
            10
          );
        }

        // 处理 rowspan
        if (cellElement.hasAttribute("rowspan")) {
          cellOptions.rowSpan = parseInt(
            cellElement.getAttribute("rowspan"),
            10
          );
        }

        return new TableCell(cellOptions);
      }

      function processRow(rowElement) {
        const cells = Array.from(rowElement.querySelectorAll("td, th")).map(
          processCell
        );
        return new TableRow({ children: cells });
      }

      function processTable(tableElement) {
        const rows = Array.from(tableElement.querySelectorAll("tr")).map(
          processRow
        );

        return new Table({
          rows,
          width: {
            size: 100, // 示例宽度，具体值应根据需要调整
            type: WidthType.PERCENTAGE,
          },
        });
      }

      function processElement(element) {
        switch (element.tagName) {
          case "TABLE":
            docxElements.push(processTable(element));
            break;
          // 实现其他标签的处理逻辑...
        }
      }

      function traverseElements(element) {
        if (element.tagName) {
          // 确保只处理元素节点
          processElement(element);
        }
        Array.from(element.children).forEach(traverseElements);
      }

      traverseElements(element); // 从给定的根元素开始遍历

      return docxElements;
    },
    docxPlugin() {
      const base64String = HTMLString.image;
      const match = base64String.match(/^data:image\/png;base64,(.*)$/);
      const base64Data = match ? match[1] : null;

      // const doc = new Document({
      //   sections: [
      //     {
      //       children: [
      //         new Table({
      //           rows: [
      //             new TableRow({
      //               children: [
      //                 new TableCell({
      //                   children: [
      //                     new Paragraph({
      //                       text: "支部名称",
      //                     }),
      //                   ],
      //                   verticalAlign: VerticalAlign.CENTER,
      //                 }),
      //                 new TableCell({
      //                   width: {
      //                     size: 1,
      //                     type: WidthType.DXA,
      //                   },
      //                   children: [
      //                     new Paragraph({
      //                       text: "xxxxxxxxxxxxxxxxxxx支部",
      //                     }),
      //                   ],
      //                   verticalAlign: VerticalAlign.CENTER,
      //                 }),
      //               ],
      //             }),
      //             new TableRow({
      //               children: [
      //                 new TableCell({
      //                   columnSpan: 2,
      //                   children: [
      //                     new Paragraph({
      //                       text: HTMLString.text,
      //                       heading: HeadingLevel.HEADING_1,
      //                     }),
      //                   ],
      //                 }),
      //               ],
      //             }),
      //             new TableRow({
      //               children: [
      //                 new TableCell({
      //                   columnSpan: 2,
      //                   children: [
      //                     new Paragraph({
      //                       children: [
      //                         new ImageRun({
      //                           data: Buffer.from(base64Data, "base64"),
      //                           transformation: {
      //                             width: 200,
      //                             height: 200,
      //                           },
      //                         }),
      //                       ],
      //                     }),
      //                   ],
      //                 }),
      //               ],
      //             }),
      //           ],
      //         }),
      //       ],
      //     },
      //   ],
      // });
      const htmlDOM = new DOMParser().parseFromString(
        HTMLString.text,
        "text/html"
      );
      const DOMContent = htmlDOM.body.firstChild;
      const docxConfig = this.HTML2DocxConfig(DOMContent);
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: docxConfig,
          },
        ],
      });

      Packer.toBuffer(doc).then((buffer) => {
        const blob = new Blob([buffer], { type: "application/octet-stream" });
        // saveAs(blob, "example.docx");
        renderAsync(blob, document.getElementById("bodyContainer"), null, {
          ignoreLastRenderedPageBreak: false,
        });
      });
    },
    renderDocx(options) {
      if (typeof window !== "undefined") {
        const {
          bodyContainer,
          styleContainer,
          buffer,
          docxOptions = {},
        } = options;
        const defaultOptions = {
          className: "docx",
          ignoreLastRenderedPageBreak: false,
        };
        const configuration = Object.assign({}, defaultOptions, docxOptions);
        if (bodyContainer) {
          return renderAsync(
            buffer,
            bodyContainer,
            styleContainer,
            configuration
          );
        } else {
          const contain = document.createElement("div");
          document.body.appendChild(contain);
          return renderAsync(buffer, contain, styleContainer, configuration);
        }
      }
    },
    officegenFunc() {
      const docx = officegen("docx");
      const table = [
        [
          {
            val: "No.",
            opts: {
              cellColWidth: 4261,
              b: true,
              sz: "48",
              shd: {
                fill: "7F7F7F",
                themeFill: "text1",
                themeFillTint: "80",
              },
              fontFamily: "Avenir Book",
            },
          },
          {
            val: "Title1",
            opts: {
              b: true,
              color: "A00000",
              align: "right",
              shd: {
                fill: "92CDDC",
                themeFill: "text1",
                themeFillTint: "80",
              },
            },
          },
          {
            val: "Title2",
            opts: {
              align: "center",
              cellColWidth: 42,
              b: true,
              sz: "48",
              shd: {
                fill: "92CDDC",
                themeFill: "text1",
                themeFillTint: "80",
              },
            },
          },
        ],
        [1, "All grown-ups were once children", ""],
        [
          2,
          "there is no harm in putting off a piece of work until another day.",
          "",
        ],
        [
          3,
          "But when it is a matter of baobabs, that always means a catastrophe.",
          "",
        ],
        [4, "watch out for the baobabs!", "END"],
      ];

      const tableStyle = {
        tableColWidth: 4261,
        tableSize: 24,
        tableColor: "ada",
        tableAlign: "left",
        tableFontFamily: "Comic Sans MS",
      };

      const data = [
        [
          {
            type: "text",
            val: "Simple",
          },
          {
            type: "text",
            val: " with color",
            opt: { color: "000088" },
          },
          {
            type: "text",
            val: "  and back color.",
            opt: { color: "00ffff", back: "000088" },
          },
          {
            type: "linebreak",
          },
          {
            type: "text",
            val: "Bold + underline",
            opt: { bold: true, underline: true },
          },
        ],
        {
          type: "horizontalline",
        },
        [
          { backline: "EDEDED" },
          {
            type: "text",
            val: "  backline text1.",
            opt: { bold: true },
          },
          {
            type: "text",
            val: "  backline text2.",
            opt: { color: "000088" },
          },
        ],
        {
          type: "text",
          val: "Left this text.",
          lopt: { align: "left" },
        },
        {
          type: "text",
          val: "Center this text.",
          lopt: { align: "center" },
        },
        {
          type: "text",
          val: "Right this text.",
          lopt: { align: "right" },
        },
        {
          type: "text",
          val: "Fonts face only.",
          opt: { font_face: "Arial" },
        },
        {
          type: "text",
          val: "Fonts face and size.",
          opt: { font_face: "Arial", font_size: 40 },
        },
        {
          type: "table",
          val: table,
          opt: tableStyle,
        },
        [
          {
            // arr[0] is common option.
            align: "right",
          },
          {
            type: "image",
            path: HTMLString.image,
          },
          {
            type: "image",
            path: HTMLString.image,
          },
        ],
        {
          type: "pagebreak",
        },
      ];

      docx.createByJson(data);
      saveAs(docx, "example.docx");
    },
    async html2docx() {
      const String = `<!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width,initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
             ${document.getElementById("html2docx").outerHTML}
            </body>
        </html>`;
      // const String = HTMLString.example;
      const fileBuffer = await HTMLtoDOCX(String, null, {
        table: { row: { cantSplit: false } },
        header: true,
        footer: true,
        pageNumber: true,
        fontSize: 16,
      });
      saveAs(fileBuffer, "html-to-docx.docx");
    },
    getPPI() {
      const arrDPI = [];
      const tmpNode = document.createElement("div");
      tmpNode.style.cssText =
        "width:1in;height:1in;position:absolute;left:0;top:0;z-index:99;visibility:hidde";
      document.body.appendChild(tmpNode);
      arrDPI[0] = parseInt(tmpNode.offsetWidth);
      arrDPI[1] = parseInt(tmpNode.offsetHeight);
      tmpNode.parentNode.removeChild(tmpNode);
      return Math.min(...arrDPI);
      // const div = document.createElement("div");
      // div.style.width = "1in";
      // document.body.appendChild(div);
      // const ppi = div.offsetWidth;
      // document.body.removeChild(div);
      // return ppi;
    },
    getData() {
      this.loading = true;
      setTimeout(() => {
        this.templateData = templateData;
        this.loading = false;
      }, 2000);
    },
    handleOpen() {
      const modal = document.getElementById("myModal");
      modal.style.display = "block";
    },
    handleClose() {
      const modal = document.getElementById("myModal");
      modal.style.display = "none";
    },

    printByHiprint() {
      const element = document.getElementById("app");
      this.hiprintTemplate.print(element);
    },
    printByPrintThis() {
      $("#app").printThis();
    },
    renderDoc() {
      loadFile("/test.docx", function (error, content) {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });
        doc.setData({
          name: "xxxxxx支部",
          content: Array(2)
            .fill(
              '<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 机关党支部2022年工作任务清单</p>\r\n\r\n<table border="1" cellpadding="0" cellspacing="0" style="width:949px">\r\n\t<thead>\r\n\t\t<tr>\r\n\t\t\t<th style="height:21px; width:32px">\r\n\t\t\t<p>序号</p>\r\n\t\t\t</th>\r\n\t\t\t<th style="height:21px; width:76px">\r\n\t\t\t<p>重点内容</p>\r\n\t\t\t</th>\r\n\t\t\t<th style="height:21px; width:113px">\r\n\t\t\t<p>主要工作</p>\r\n\t\t\t</th>\r\n\t\t\t<th style="height:21px; width:520px">\r\n\t\t\t<p>具体措施</p>\r\n\t\t\t</th>\r\n\t\t\t<th style="height:21px; width:85px">\r\n\t\t\t<p>时间进度</p>\r\n\t\t\t</th>\r\n\t\t\t<th style="height:21px; width:123px">\r\n\t\t\t<p>责任人</p>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody>\r\n\t\t<tr>\r\n\t\t\t<td rowspan="5" style="height:36px; width:32px">\r\n\t\t\t<p>1</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="5" style="height:36px; width:76px">\r\n\t\t\t<p>持续强化政治引领，不断推动思想政治建设</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="2" style="height:36px; width:113px">\r\n\t\t\t<p>带头做&ldquo;两个确立&rdquo;的坚决拥护者和&ldquo;两个维护&rdquo;的坚定践行者</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:36px; width:520px">\r\n\t\t\t<p>结合政治教育，教育全体党员深刻把握&ldquo;两个确立&rdquo;的决定性意义，坚决做到&ldquo;两个维护&rdquo;，始终不渝拥戴核心、紧跟核心、捍卫核心。</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="3" style="height:36px; width:85px">\r\n\t\t\t<p>全年</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="2" style="height:36px; width:123px">\r\n\t\t\t<p>党支部书记</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:36px; width:520px">\r\n\t\t\t<p>将按照巡察工作要求，全力支持配合集团巡察工作的开展，加强自查自纠，做好查漏补缺。</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:24px; width:113px">\r\n\t\t\t<p>学深悟透党的创新理论</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:24px; width:520px">\r\n\t\t\t<p>按照公司党委的学习安排，采取党小组集中学习、党员自学研读原文等方式，以学习党的十九届六中全会精神为重点巩固拓展党史学习教育成果，落实好全年党员学习时间不少于32学时的要求。</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:24px; width:123px">\r\n\t\t\t<p>支部班子成员 &nbsp;各党小组长</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td rowspan="2" style="height:39px; width:113px">\r\n\t\t\t<p>深入学习贯彻党的二十大精神</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:39px; width:520px">\r\n\t\t\t<p>围绕二十大的相关学习要求，认真组织研读相关学习材料，将全体党员的思想和行动统一到党的二十大作出的新部署、提出的新要求上。</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="2" style="height:39px; width:85px">\r\n\t\t\t<p>下半年</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="2" style="height:39px; width:123px">\r\n\t\t\t<p>党支部书记</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:42px; width:520px">\r\n\t\t\t<p>充分运用&ldquo;学习强国&rdquo;、党建网等平台，结合自身岗位和具体工作，坚持学以致用，努力把学习成果转化为促进落实的具体举措、解决问题的实际成效。</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td rowspan="7" style="height:27px; width:32px">\r\n\t\t\t<p>2</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="7" style="height:27px; width:76px">\r\n\t\t\t<p>巩固深化党建目标责任制，不断夯实支部建设基础</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="3" style="height:27px; width:113px">\r\n\t\t\t<p>严肃党内政治生活</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:27px; width:520px">\r\n\t\t\t<p>严格执行&ldquo;三会一课&rdquo;、党员领导干部双重组织生活、民主评议党员等基本制度。</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="2" style="height:27px; width:85px">\r\n\t\t\t<p>全年</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:27px; width:123px">\r\n\t\t\t<p>党支部书记 &nbsp;&nbsp;&nbsp;各党小组长</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:36px; width:520px">\r\n\t\t\t<p>充分运用市内红色资源，组织党员参观见学、观摩红色电影，进一步丰富党支部主题党日形式和内容，提高组织生活质量。</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:36px; width:123px">\r\n\t\t\t<p>党支部书记</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:36px; width:520px">\r\n\t\t\t<p>第二季度，组织开展民主评议党员，严格按照活动要求，用好批评和自我批评武器，深入查摆问题，制定整改措施，进一步提升党员的党性觉悟。</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:36px; width:85px">\r\n\t\t\t<p>第二季度</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:36px; width:123px">\r\n\t\t\t<p>党支部书记</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:36px; width:113px">\r\n\t\t\t<p>认真开展党建目标责任制季度自查</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:36px; width:520px">\r\n\t\t\t<p>对标对表集团党建目标责任制任务指标和公司党支部考核要求，认真开展自查自纠，及时维护支部目视管理内容和党建平台数据信息，查缺补漏，落实落细党建目标责任制各项工作要求，</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="3" style="height:36px; width:85px">\r\n\t\t\t<p>全年</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:36px; width:123px">\r\n\t\t\t<p>党支部书记</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td rowspan="3" style="height:36px; width:113px">\r\n\t\t\t<p>加强党员队伍建设管理</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:36px; width:520px">\r\n\t\t\t<p>充分运用部门例会、党课、党小组活动、志愿服务、党员培训等形式，加大党员日常教育管理力度，完善党员积分制管理，提升支部班子服务党员、服务职工、当好领导参谋助手的能力。</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="2" style="height:36px; width:123px">\r\n\t\t\t<p>支部班子成员</p>\r\n\r\n\t\t\t<p>各党小组长</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:36px; width:520px">\r\n\t\t\t<p>以&ldquo;学习强国&rdquo;、&ldquo;先锋上海&rdquo;、集团党建网等学习载体为抓手，提升党员学习意识和党性修养。</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:36px; width:520px">\r\n\t\t\t<p>严格规范程序，落实党员发展要求，上半年，完成1名发展对象的发展工作。继续加强对建表入党积极份子的培养和考察工作，补充2名入党积极份子，进一步优化入党梯队结构。</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:36px; width:85px">\r\n\t\t\t<p>上半年</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:36px; width:123px">\r\n\t\t\t<p>党支部书记</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td rowspan="7" style="height:29px; width:32px">\r\n\t\t\t<p>3</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="7" style="height:29px; width:76px">\r\n\t\t\t<p>积极发挥服务保障作用，不断提高融入中心的能力</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="3" style="height:29px; width:113px">\r\n\t\t\t<p>发挥好机关服务保障作用</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:29px; width:520px">\r\n\t\t\t<p>围绕公司生产经营重点工作，组织党员干部积极开展立功竞赛、党员先锋岗等活动。</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="7" style="height:29px; width:85px">\r\n\t\t\t<p>全年</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="2" style="height:29px; width:123px">\r\n\t\t\t<p>党支部书记</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:26px; width:520px">\r\n\t\t\t<p>把握引领、保障、服务三个环节，将党建力转化为推动公司发展的生产力，深刻融入生产经营中心工作。</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:17px; width:520px">\r\n\t\t\t<p>各部门党员要立足本职岗位、率先垂范、冲锋在前，不断提高工作能力和工作效益，为公司生产提供服务保障。</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:17px; width:123px">\r\n\t\t\t<p>支部班子成员各党小组长</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td rowspan="2" style="height:38px; width:113px">\r\n\t\t\t<p>坚决守牢防疫安全底线</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:38px; width:520px">\r\n\t\t\t<p>积极贯彻执行上级关于疫情防控的指示精神和决策部署，加强防疫宣传。结合部门例会、组织生活等方式，教育引导党员坚决克服麻痹思想和厌战情绪，强化责任担当。</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:38px; width:123px">\r\n\t\t\t<p>党支部书记</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:38px; width:520px">\r\n\t\t\t<p>继续开展环境卫生消毒、食堂就餐防疫等志愿服务活动，努力营造同心抗疫的良好氛围。</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:38px; width:123px">\r\n\t\t\t<p>支部班子成员</p>\r\n\r\n\t\t\t<p>各党小组长</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td rowspan="2" style="height:38px; width:113px">\r\n\t\t\t<p>坚持创新引领发展</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:38px; width:520px">\r\n\t\t\t<p>持续推进支部书记工作室建设，依托工作室团队，进一步筹划好年度工作，细化责任分工，按照年度计划，完成目视展板制作上墙，营造工作室环境氛围。</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="2" style="height:38px; width:123px">\r\n\t\t\t<p>支部班子成员</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:38px; width:520px">\r\n\t\t\t<p>不断深化、拓展&ldquo;4&times;一公里&rdquo;工作室品牌内涵，凝聚好支委班子做好支部党建工作的合力，激发党员引领示范效应和服务保障作用，以点带面促进支部建设整体提升。</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tbody>\r\n\t<thead>\r\n\t\t<tr>\r\n\t\t\t<th rowspan="6" style="height:19px; width:32px">\r\n\t\t\t<p>4</p>\r\n\t\t\t</th>\r\n\t\t\t<th rowspan="6" style="height:19px; width:76px">\r\n\t\t\t<p>着力强化纪律约束，不断推进党风廉政建设</p>\r\n\t\t\t</th>\r\n\t\t\t<th rowspan="2" style="height:19px; width:113px">\r\n\t\t\t<p>严格落实党风廉政建设工作要求</p>\r\n\t\t\t</th>\r\n\t\t\t<th style="height:19px; width:520px">\r\n\t\t\t<p>认真学习贯彻2022年度公司党风廉政建设工作要点，结合公司下发的领导班子年度党风廉政建设工作责任分分工表和责任清单等，开展支部和部门领导班子、领导干部党风廉政建设责任分工。</p>\r\n\t\t\t</th>\r\n\t\t\t<th rowspan="2" style="height:19px; width:85px">\r\n\t\t\t<p>第一季度</p>\r\n\t\t\t</th>\r\n\t\t\t<th rowspan="2" style="height:19px; width:123px">\r\n\t\t\t<p>党支部书记</p>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th style="height:37px; width:520px">\r\n\t\t\t<p>根据关键岗位人员变化情况，调整梳理党支部&ldquo;三级预控网络&rdquo;责任人队伍，组织关键岗位人员签订《廉洁承诺书》。</p>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th rowspan="3" style="height:46px; width:113px">\r\n\t\t\t<p>加大&ldquo;三检查一评议&rdquo;工作力度</p>\r\n\t\t\t</th>\r\n\t\t\t<th style="height:46px; width:520px">\r\n\t\t\t<p>结合关键岗位人员调整和公司新业务的开展，对廉洁风险预控源进行梳理识别，调整预控岗位，制定预控措施。</p>\r\n\t\t\t</th>\r\n\t\t\t<th style="height:46px; width:85px">\r\n\t\t\t<p>上半年</p>\r\n\t\t\t</th>\r\n\t\t\t<th style="height:46px; width:123px">\r\n\t\t\t<p>党支部书记</p>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th style="height:46px; width:520px">\r\n\t\t\t<p>认真开展&ldquo;三级预控网络&rdquo;季度&ldquo;三检查一评议&rdquo;工作，规范网络运作，强化网络预控。以关键岗位为人员为主要对象，严格落实廉洁从业季度报告制度。</p>\r\n\t\t\t</th>\r\n\t\t\t<th rowspan="3" style="height:46px; width:85px">\r\n\t\t\t<p>全年</p>\r\n\t\t\t</th>\r\n\t\t\t<th style="height:46px; width:123px">\r\n\t\t\t<p>党支部书记</p>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th style="height:46px; width:520px">\r\n\t\t\t<p>强化党内监督，结合公司开展的专项督查系列活动等，进一步加强对支部党员履行廉洁从业等遵纪收规情况的监督力度。</p>\r\n\t\t\t</th>\r\n\t\t\t<th style="height:46px; width:123px">\r\n\t\t\t<p>支部班子成员</p>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<th style="height:40px; width:113px">\r\n\t\t\t<p>驰而不息改进作风</p>\r\n\t\t\t</th>\r\n\t\t\t<th style="height:40px; width:520px">\r\n\t\t\t<p>认真学习和落实公司关于加强党员干部作风建设的措施和要求，以提升执行力为重点，结合领导人员作风纪律教育活动、立功竞赛、大项工作、急难任务等，进一步加强党员干部作风教育，</p>\r\n\t\t\t</th>\r\n\t\t\t<th style="height:40px; width:123px">\r\n\t\t\t<p>支部班子成员&nbsp;&nbsp;&nbsp;&nbsp; 各党小组长</p>\r\n\t\t\t</th>\r\n\t\t</tr>\r\n\t</thead>\r\n\t<tbody>\r\n\t\t<tr>\r\n\t\t\t<td rowspan="4" style="height:34px; width:32px">\r\n\t\t\t<p>5</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="4" style="height:34px; width:76px">\r\n\t\t\t<p>加强维护队伍稳定，不断深化和谐家园建设</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="2" style="height:34px; width:113px">\r\n\t\t\t<p>坚持服务凝聚群众</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:34px; width:520px">\r\n\t\t\t<p>结合公司&ldquo;三会&rdquo;，充分运用领导班子宣讲形势任务、厂情发布会、公司领导联系党小组与班组、党群干部&ldquo;跟班&rdquo;等活动载体，深入开展形势任务宣传教育，凝聚职工思想共识。</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="4" style="height:34px; width:85px">\r\n\t\t\t<p>全年</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:34px; width:123px">\r\n\t\t\t<p>党支部书记</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:39px; width:520px">\r\n\t\t\t<p>经常关心职工思想、工作和生活情况，加大关怀帮扶力度，积极开展帮困送温暖和家访慰问工作，了解掌握职工及家庭实际状况，定期开展职工队伍思想状况分析，稳妥化解和处理不稳定因素，稳定职工队伍。</p>\r\n\t\t\t</td>\r\n\t\t\t<td rowspan="3" style="height:39px; width:123px">\r\n\t\t\t<p>支部班子成员 &nbsp;各党小组长</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:39px; width:113px">\r\n\t\t\t<p>持续推进企业文化建设</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:39px; width:520px">\r\n\t\t\t<p>组织职工积极参加公司组织开展的形式多样、内容丰富的职工文体活动。进一步做实服务职工实事项目，坚持做好劳动安全、防寒保暖、防暑降温、疫情防控等职工劳动保护工作。</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t\t<tr>\r\n\t\t\t<td style="height:37px; width:113px">\r\n\t\t\t<p>加强关心群团工作</p>\r\n\t\t\t</td>\r\n\t\t\t<td style="height:37px; width:520px">\r\n\t\t\t<p>认真落实公司加强群团工作的要求，大力支持团青工作，进一步增强群团组织的生机活力，发挥群团组织特殊优势，更好促进公司生产发展。</p>\r\n\t\t\t</td>\r\n\t\t</tr>\r\n\t</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n'
            )
            .join(""),
          img: "https://img95.699pic.com/photo/50165/7667.jpg_wh860.jpg",
        });
        try {
          // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
          doc.render();
        } catch (error) {
          // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
          function replaceErrors(key, value) {
            if (value instanceof Error) {
              return Object.getOwnPropertyNames(value).reduce(function (
                error,
                key
              ) {
                error[key] = value[key];
                return error;
              },
              {});
            }
            return value;
          }
          console.log(JSON.stringify({ error: error }, replaceErrors));

          if (error.properties && error.properties.errors instanceof Array) {
            const errorMessages = error.properties.errors
              .map(function (error) {
                return error.properties.explanation;
              })
              .join("\n");
            console.log("errorMessages", errorMessages);
            // errorMessages is a humanly readable message looking like this :
            // 'The tag beginning with "foobar" is unopened'
          }
          throw error;
        }
        const out = doc.getZip().generate({
          type: "blob",
          mimeType:
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        });
        // Output the document using Data-URI
        saveAs(out, "output.docx");
      });
    },
  },
};
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
table td {
  font-size: 12px;
  padding: 10px;
} */
</style>
