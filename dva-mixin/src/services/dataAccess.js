/**
 * 数据接入信息
 * 常量说明:
 *   接入阶段:
 *     01: 接入准备阶段,
 *     02: 现场安装阶段,
 *     03: 试运行阶段,
 *     04: 运行阶段,
 *     05: 停运阶段,
 *   状态说明:
 *     01: 未提交,
 *     02: 已提交,
 *     03: 已退回,
 *   对象类型:
 *     1: 站点
 */
import { getData } from './request';

const SERVICE_NAME = 'assetaccount';

/**
 * 新增操作日志
 * @param {String} options.objectId       数据ID
 * @param {String} options.objectType     数据类型
 * @param {String} options.accountId      账号ID
 * @param {String} options.operatingStage 操作所处阶段
 * @param {String} options.eventTime      操作事件名称
 * @param {String} options.remark         备注
 */
export async function addDataAccessLog(options) {
  const data = await getData(SERVICE_NAME, 'addDataAccessLog', { ...options });
  return data;
}
/**
 * 查询操作日志
 * @param {String} options.objectId       操作对象ID
 */
export async function queryDataAccessLogByObjectId({ objectId }) {
  const data = await getData(SERVICE_NAME, 'queryDataAccessLogByObjectId', { objectId });
  return data;
}
/**
 * 查询对象的接入信息
 * @param {String} options.objectId       操作对象ID
 */
export async function queryDataAccess({ objectId }) {
  const data = await getData(SERVICE_NAME, 'queryDataAccess', { objectId });
  return data;
}
/**
 * 更新数据接入信息，若之前接入信息不存在，则新建
 * @param  {String} options.objectId   数据ID
 * @param  {String} options.objectType 数据类型
 * @param  {String} options.stage      对象所处阶段
 * @param  {String} options.status     对象在当前阶段所处状态
 * @param  {String} options.remark     备注
 */
export async function updateDataAccess(options) {
  const data = await getData(SERVICE_NAME, 'updateDataAccess', { ...options });
  return data;
}
/**
 * 更新数据接入信息, 并写入日志
 * @param  {String} options.objectId    操作对象ID
 * @param  {String} options.objectType  操作对象类型,站点：1
 * @param  {String} options.operator    操作人
 * @param  {String} options.startStage  操作前对象所处阶段,如电站接入,01:接入准备阶段、02:现场安装阶段、03:试运行阶段、04:运行阶段、05:停运阶段
 * @param  {String} options.endStage    操作后对象所处阶段,如电站接入,01:接入准备阶段、02:现场安装阶段、03:试运行阶段、04:运行阶段、05:停运阶段
 * @param  {String} options.startStatus 操作起始状态,如电站接入,01:未提交,02:已提交,03:已退回
 * @param  {String} options.endStatus   操作终止状态,如电站接入,01:未提交,02:已提交,03:已退回
 * @param  {String} options.content     操作内容,如电站接入,"信息提交审核"
 * @param  {String} options.remark      备注,如电站接入,站点信息被退回，记录退回原因等
 */
export async function updateDataAccessAndWriteLog(options) {
  const data = await getData(SERVICE_NAME, 'updateDataAccessAndWriteLog', { ...options });
  return data;
}
/**
 * 批量更新数据接入信息,并写入日志
 * @param  {Array<String>} options.objectIdList 操作对象ID列表
 * @param  {String} options.objectType          操作对象类型,站点：1
 * @param  {String} options.operator            操作人
 * @param  {String} options.startStage          操作前对象所处阶段, 编码参考接入阶段常量
 * @param  {String} options.endStage            操作后对象所处阶段, 编码参考接入阶段常量
 * @param  {String} options.startStatus         操作起始状态,如电站接入, 编码参考状态常量
 * @param  {String} options.endStatus           操作终止状态,如电站接入, 编码参考状态常量
 * @param  {String} options.content             操作内容,如电站接入,"信息提交审核"
 * @param  {String} options.remark              备注,如电站接入,站点信息被退回，记录退回原因等
 */
export async function batchUpdateDataAccessAndWriteLog(options) {
  const data = await getData(SERVICE_NAME, 'batchUpdateDataAccessAndWriteLog', { ...options });
  return data;
}
