import moment from 'moment';
import mapCodeToMsg from '@util/resCodeHash';
import { request } from '../utils/request';
import { ErrorRes } from '../utils/base';
import * as store from './storage';

let lastTime = null;
const checkParams = (data) => {
  if (typeof data === 'object') {
    if (data instanceof Array) {
      for (const item of data) {
        if (!item.service || !item.action) return false;
      }
      return true;
    }
    return data.service && data.action;
  }
  return false;
};
const requestData = async (method, datas) => {
  try {
    const data = await request(method, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.get('token')}`,
      },
      body: datas,
    });
    lastTime = moment();
    return data;
  } catch (ex) {
    console.log(ex);
    return new ErrorRes('fetch error');
  }
};

const requestUpload = async (method, datas) => {
  try {
    const data = await request(method, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${store.get('token')}`,
      },
      body: datas,
    });
    return data;
  } catch (ex) {
    console.log(ex);
    return new ErrorRes('fetch error');
  }
};
export async function uploadData(params = {}) {
  const resData = await requestUpload('/upload', params);
  resData.srcMsg = resData.msg;
  resData.srcMessage = resData.message;
  if (resData.code) resData.message = mapCodeToMsg(resData.code);
  return resData;
}

export async function getData(service, action, params = {}, version = 'latest') {
  // const datas = JSON.stringify({
  //   datas: { ...params,
  //     service,
  //     action,
  //   },
  //   apiOption: {
  //   serverAddress: '10.1.170.158',
  //   port: '80',
  //   version: '3.0.0',
  // },
  // });
  const datas = JSON.stringify({
    ...params,
    // apiOption: {
    //   serverAddress: '10.1.170.158',
    //   port: 80,
    //   version: '3.0.0',
    // },
  });
  // if(service === 'alarmService' || service === 'datastore') {
  //   return await requestData(`/${service}/${action}`, datas);
  // }
  // message重写
  const resData = await requestData(`/api/${version}/${service}/${action}`, datas);
  resData.srcMsg = resData.msg;
  resData.srcMessage = resData.message;
  if (resData.code) resData.message = mapCodeToMsg(resData.code);
  return resData;
  // return await requestData(`/getData`, datas);
}

export async function proxyData(params = {}) {
  const datas = JSON.stringify({ ...params });

  const resData = await requestData('/proxy', datas);
  return resData;
}

export async function mockData(service, action, params = {}, version = 'latest') {
  const datas = JSON.stringify({
    ...params,
  });
  return await requestData(`/mock/${version}/${service}/${action}`, datas);
}

export async function getMultipleData(params = []) {
  if (typeof params !== 'object' || !(params instanceof Array)) return { code: 'params error' };
  if (!checkParams(params)) { return new ErrorRes('params error'); }
  const datas = JSON.stringify({
    datas: params,
  });
  return await requestData('/getData', datas);
}

export async function getGeneralData(path, params = {}) {
  const datas = JSON.stringify({
    datas: params,
    // apiOption: {
    //   serverAddress: '10.1.170.158',
    //   port: 80,
    //   version: '3.0.0',
    // },
  });
  return await requestData(path, datas);
}
setInterval(async () => {
  const token = store.get('token');
  if (token && token.length > 0) {
    if (lastTime && lastTime.add(5, 'minutes').isAfter(moment())) {
      const res = await getData('user', 'heartBeat', {});
      if (res.code) console.log('heartBeat error', res);
    }
  }
}, 5 * 60 * 1000);

/* 5mi edit on 2017-07-11 13:48:18 */
/**
 * 返回维护的signcode json
 * @returns {Promise.<*>}
 */
export async function getYnySignCode() {
  const data = await requestData('/api/latest/environment/getSignalConfiguration');
  return JSON.stringify(data.data);
}
