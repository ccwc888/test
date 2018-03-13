const hash = {
  aaa: '/watcher',  /* 站点概览 */
  oer: '/alarmView',  /* 告警管理-预告警概览 */
  mlk: '/alarmSetup', /* 告警管理-预告警设置 */
  rin: '/alarmQuery', /* 告警管理-预告警查询 */
  ire: '/distributionMonitoring', /* 在线监测-实时动态 */
  // opm: '',  /* 在线监测-运行趋势 */
  qaz: '/electricityAnalyze',  /* 在线监测-电量分析 */
  // wsx: '',  /* 统计分析-数据分析 */
  // edc: '',  /* 统计分析-诊断分析 */
  // rfv: '',  /* 管理中心-服务支持 */
  // tgb: '',  /* 管理中心-联系我们 */
  yhn: '/modifyPassword',  /* 管理中心-修改密码 */
  // ujm: '',  /* 监测大厅 */
  // ikq: '',  /* 在线监测 */
  // qws: '',  /* 统计分析 */
  // asd: '',  /* 告警管理 */
  // qww: '',  /* 管理中心 */
  // sda: '',  /* 台账管理 */
  // tgd: '',  /* 监测大厅 */
  // dsd: '',  /* 在线监测 */
  // qsd: '',  /* 统计分析 */
  // qfz: '',  /* 告警管理 */
  // ygh: '',  /* 管理中心 */
  // lky: '',  /* 台账管理 */
};

export default function (id) {
  return hash[id] || false;
}
