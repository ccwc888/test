/**
 * 应用管理
 */
import { getData } from './request';

const SERVICE_NAME = 'right';

/**
 * 获取可用的应用
 * @param {String} options.customerId 服务商id/企业id
 */
export async function getAllApplication({ customerId }) {
  const data = await getData(SERVICE_NAME, 'getAllApplication', { customerId });
  if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * 根据服务商id获取角色和每个角色可用的应用信息列表
 * @param {String} options.serviceProviderId 服务商ID
 */
export async function getRoleAndApplication({ serviceProviderId }) {
  const data = await getData(SERVICE_NAME, 'getRoleAndApplication', { serviceProviderId });
  if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
/**
 * 根据登陆帐号id获取该帐号所属的角色
 * @param {String} options.accountId 帐号ID
 */
export async function queryRoleByAccountId({ accountId }) {
  const data = await getData(SERVICE_NAME, 'queryRoleByAccountId', { accountId });
  if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}
