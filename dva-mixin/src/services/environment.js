import { getData } from './request';

/**
 * 获取websocket地址
 */
export async function getWebSocketOption() {
  const data = await getData('environment', 'getWebSocketOption', {}, '1.0');
  return data;
}
/**
 * 获取websocket地址
 */
export async function getSecondaryDeviceRedirectUrl() {
  const data = await getData('environment', 'getSecondaryDeviceRedirectUrl', {}, '1.0');
  return data;
}
