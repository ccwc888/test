/**
 * 站点
 */
import { getData } from './request';
import * as dataAccessService from './dataAccess';

const SERVICE_NAME = 'assetaccount';
/**
 * serviceProvidor -> stations
 * 根据服务商ID获取站点列表
 */
export async function fetch({ serviceProvidorId }) {
  const data = await getData('assetaccount', 'queryPowerStationByServiceProviderId', { serviceProviderId: serviceProvidorId });
  if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * station -> devicesTree
 * 根据站点ID获取设备树
 */
export async function fetchDeviceTree({ powerClientId }) {
  if (fetchDeviceTree.hash[powerClientId]) {
    return fetchDeviceTree.hash;
  }
  const data = await getData(SERVICE_NAME, 'queryTopologyStructureTree', { powerClientId });
  if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  // if is valid data
  // then save into hash
  return data;
}
fetchDeviceTree.hash = {};
/**
 * 创建站点
 * @param  {String} options.customerId            所属企业的客户编码
 * @param  {String} options.powerStationCode      电力户号
 * @param  {String} options.powerStationName      站点名称
 * @param  {String} options.powerStationShortName 站点简称
 * @param  {String} options.electricCategory      用电类别
 * @param  {Number} options.contractCapacity      合同容量
 * @param  {String} options.industry              用电行业
 * @param  {String} options.provinceCode          省编码
 * @param  {String} options.cityCode              市编码
 * @param  {String} options.countyCode            县编码
 * @param  {String} options.streetCode            街道编码
 * @param  {String} options.address               详细地址
 * @param  {String} options.longitude             经度
 * @param  {String} options.latitude              纬度
 * @param  {String} options.creator               创建者
 */
export async function createPowerStation(options) {
  const data = await getData(SERVICE_NAME, 'createPowerStation', { ...options });
  // 调用信息接入
  if (!data.code && data.data) {
    const objectId = data.data;
    const dRes = await dataAccessService.updateDataAccessAndWriteLog({
      objectId,
      objectType: '1',
      operator: options.creator || '',
      startStage: '',
      endStage: '01',
      startStatus: '',
      endStatus: '01',
      content: '',
      remark: '',
    });
    data.accessWriteFlag = dRes.code === null;
  }
  return data;
}
/**
 * 更新站点
 * @param  {String} options.powerStationId        站点编码
 * @param  {String} options.customerId            所属企业的客户编码
 * @param  {String} options.powerStationCode      电力户号
 * @param  {String} options.powerStationName      站点名称
 * @param  {String} options.powerStationShortName 站点简称
 * @param  {String} options.electricCategory      用电类别
 * @param  {Number} options.contractCapacity      合同容量
 * @param  {String} options.industry              用电行业
 * @param  {String} options.provinceCode          省编码
 * @param  {String} options.cityCode              市编码
 * @param  {String} options.countyCode            县编码
 * @param  {String} options.streetCode            街道编码
 * @param  {String} options.address               详细地址
 * @param  {String} options.longitude             经度
 * @param  {String} options.latitude              纬度
 * @param  {String} options.modifier               创建者
 */
export async function updatePowerStation(options) {
  const data = await getData(SERVICE_NAME, 'updatePowerStation', { ...options });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * 删除站点
 * @param  {String} options.powerStationId 站点编码
 * @param  {String} options.modifier       修改者
 */
export async function deletePowerStation({ powerStationId, modifier }) {
  const data = await getData(SERVICE_NAME, 'deletePowerStation', { powerStationId, modifier });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * powerStationId -> Station
 * 查询站点信息
 * @param  {String} options.powerStationId 站点编码
 */
export async function queryPowerStation({ powerStationId }) {
  const data = await getData(SERVICE_NAME, 'queryPowerStation', { powerStationId });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * page -> pageSize -> Station[]
 * 查询所有站点信息
 * @param  {Number} options.page   页面
 * @param  {Number} options.length 单页数量
 */
export async function queryAllPowerStation({ page, length }) {
  const data = await getData(SERVICE_NAME, 'queryAllPowerStation', { page, length });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * 分页查询PowerStation信息，统计专用(统计使用信息较少)
 * @param  {Number} options.page   页面
 * @param  {Number} options.length 单页数量
 */
export async function queryAllPowerStationForStat({ page, length }) {
  const data = await getData(SERVICE_NAME, 'queryAllPowerStationForStat', { page, length });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * customerId -> Station[]
 * 根据用户获取可访问的用电客户列表
 * @param  {Number} options.customerId   客户ID
 */
export async function queryAccessiblePowerStationsByCustomerId({ customerId }) {
  const data = await getData(SERVICE_NAME, 'queryAccessiblePowerStationsByCustomerId', { customerId });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * 根据电站名称、服务商ID、电站阶段查询电站列表
 * @param  {String} options.name              站点名称
 * @param  {String} options.serviceProviderId 服务商ID
 * @param  {String} options.stationStage      站点所处阶段
 * @param  {Array}  options.stationStatusList 站点录入状态
 * @param  {Number} options.page              页面
 * @param  {Number} options.length            每页条数
 */
export async function queryPowerStationByNameOrServiceProvider(options) {
  const data = await getData(SERVICE_NAME, 'queryPowerStationByNameOrServiceProvider', { ...options });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * 根据服务商ID,电站名称或所属阶段查询用能企业ID
 * @param  {String} options.powerStationName  站点名称
 * @param  {String} options.serviceProviderId 服务商ID
 * @param  {String} options.stage             所属阶段
 */
export async function queryEnterpriseIdByServiceProviderIdAndStationNameAndStage(options) {
  const data = await getData(SERVICE_NAME, 'queryEnterpriseIdByServiceProviderIdAndStationNameAndStage', { ...options });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * 获取用能企业下的电站信息列表(电站信息包含用电分类，变压器数量，合同容量，监测点数量，终端数量，表计数量等)
 * @param  {String} options.enterpriseId  用能企业ID
 * @return {Object} {
 *         code,
 *         message,
 *         data: [{
 *           powerStationId,
 *           powerStationName,
 *           contractCapacity,
 *           serviceProviderId,
 *           transformerNum,
 *           stage,
 *           status,
 *           remark,
 *           stageTime,
 *           dtuNum,
 *           sensorNum,
 *         }] }
 */
export async function queryPowerStationInfoByEnterpriseId({ enterpriseId }) {
  const data = await getData(SERVICE_NAME, 'queryPowerStationInfoByEnterpriseId', { enterpriseId });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * 获取行业类型
 */
export async function queryAllIndustry() {
  const data = await getData(SERVICE_NAME, 'queryAllIndustry', {});
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  try {
    return JSON.parse(data.data);
  } catch (e) {
    return [];
  }
}
/**
 * 根据行业code,查询行业名称
 */
export async function queryIndustryByIndestryCode({ indestryCode }) {
  const data = await getData(SERVICE_NAME, 'queryIndustryByIndestryCode', { indestryCode });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
