import moment from 'moment';

const deepEqual = (a, b) => {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;
  for (let i = 0; i < aKeys.length; i++) {
    const va = a[aKeys[i]];
    const vb = b[aKeys[i]];
    if (JSON.stringify(va) !== JSON.stringify(vb)) return false;
  }
  return true;
};

const cached = {};
setInterval(() => {
  const keys = Object.keys(cached);
  keys.forEach((key) => {
    const cachedList = cached[key];
    cached[key] = cachedList.filter((request) => {
      const now = moment();
      if (request.resTime && (now - request.resTime) > 5000) {
        return false;
      }
      return true;
    });
  });
}, 5000);

const useCache = (method, delta = 1000) => {
  const methodName = method.name;
  return async function (...params) {
    if (!cached[methodName]) cached[methodName] = [];
    const cachedList = cached[methodName];
    const thisReq = {
      params,
      reqTime: moment(),
    };
    const matchedList = cachedList.filter((element) => {
      if (deepEqual(element.params, params) && Math.abs(thisReq.reqTime - element.reqTime) < delta) {
        return true;
      }
      return false;
    });
    if (matchedList.length > 0) {
      const element = matchedList[0];
      return new Promise((resolve, reject) => {
        let timeLast = 0;
        const checker = setInterval(() => {
          timeLast += 100;
          if (element && element.res) {
            resolve(JSON.parse(element.res));
            clearInterval(checker);
          }
          if (timeLast > 60000) {
            reject({ code: 'TimeOut', message: 'wait cache failed' });
            clearInterval(checker);
          }
        }, 100);
      });
    }
    cachedList.push(thisReq);
    const res = await method(...params);
    thisReq.resTime = moment();
    thisReq.res = JSON.stringify(res);
    return res;
  };
};
export default useCache;
