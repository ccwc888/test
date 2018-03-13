import fetch from 'dva/fetch';

let unauthorizedListener = null;
let onTokenRolling = null;
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401) {
    if (unauthorizedListener) unauthorizedListener();
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
function checkToken(response) {
  const token = response.headers.get('token-rolling');
  if (token && token.length > 0) onTokenRolling(token);
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function request(url, options) {
  const response = await fetch(url, options);
  checkStatus(response);
  checkToken(response);
  const contentType = response.headers.get('Content-type');

  if (contentType.startsWith('application/json')) {
    const data = await response.json();
    return data;
  }
  if (contentType.startsWith('text/html')) {
    const data = await response.text();
    return data;
  }
  throw new Error('unknown content type');
}
export async function listenUnauthorized(fn) {
  unauthorizedListener = fn;
}
export async function listenTokenRolling(fn) {
  onTokenRolling = fn;
}
