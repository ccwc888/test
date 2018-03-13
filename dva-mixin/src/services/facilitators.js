/**
 * 服务商
 */
import { getData } from './request';

const SERVICE_NAME = 'customer';

/**
 * 分页查询服务商接入列表
 */
export async function fuzzyQueryServiceProviderList({ page, length, keyVal = '' }) {
  const keyValNoSpace = keyVal.replace(/\s/g, '');
  const data = await getData(SERVICE_NAME, 'fuzzyQueryServiceProviderListByNameForHomePage', { page, length, name: keyValNoSpace });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}

/**
 * 分页查询服务商列表
 */
export async function fetch({ page, length, keyVal = '' }) {
  const data = await getData(SERVICE_NAME, 'fuzzyQueryServiceProviderListByName', { page, length, name: keyVal });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}

/**
 * 分页查询服务商下的统计信息列表(用于服务商接入页面)
 */
export async function fetchStat({ page, length, keyVal = '' }) {
  const data = await getData(SERVICE_NAME, 'fuzzyQueryServiceProviderListByName', { page, length, name: keyVal });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}

/**
 * 查询单个服务商基本信息
 */
export async function queryDetailById({ id }) {
  const data = await getData(SERVICE_NAME, 'queryServiceProviderByCustomerId', { customerId: id });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * 查询单个服务商接入信息
 */
// export async function queryAccessInfoById({ id }) {
//   const data = await getData(SERVICE_NAME, 'getAccessInformation', { customerId: id });
//   if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
//   return data;
// }
/**
 * 服务商注册
 */
export async function registerServiceProvider({ ...args }) {
  const data = await getData(SERVICE_NAME, 'registerServiceProvider', { ...args });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * 服务商更新
 */
export async function updateServiceProvider({ ...args }) {
  const data = await getData(SERVICE_NAME, 'updateServiceProvider', { ...args });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * 查询客户编码对应的服务商
*/
export async function queryServiceProviderByCustomerId({ ...args }) {
  const data = await getData(SERVICE_NAME, 'queryServiceProviderByCustomerId', { ...args });
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * 获取由所有的服务商ID和名称组成的map
 */
export async function fetchHash() {
  const data = await getData(SERVICE_NAME, 'queryMapIdAndNameOfAllServiceProvider');
  // if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
