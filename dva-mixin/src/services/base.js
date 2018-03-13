import * as request from '../utils/request';

const unauthorizedListener = [];
const unauthorized = () => {
  unauthorizedListener.map((fn) => {
    if (fn) fn();
    return fn;
  });
};
request.listenUnauthorized(unauthorized);
// 鉴权检测
export async function listenUnauthorized(fn) {
  unauthorizedListener.push(fn);
}

const tokenRollingListener = [];
const tokenRolling = (token) => {
  tokenRollingListener.map((fn) => {
    if (fn) fn(token);
    return fn;
  });
};
request.listenTokenRolling(tokenRolling);
// token续期
export async function listenTokenRolling(fn) {
  tokenRollingListener.push(fn);
}
