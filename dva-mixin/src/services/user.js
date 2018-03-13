import Promise from 'promise';
import mapCodeToMsg from '@util/resCodeHash';
import * as storage from '../services/storage';
import { getGeneralData, getData } from './request';

export async function login({ username, password, exp }) {
  const data = await getData('user', 'serviceProviderLogin', { action: 'serviceProviderLogin', username, password, exp });
  if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  data.srcMessage = data.message;
  data.message = mapCodeToMsg(data.code) || data.message;
  const { position } = (data && data.data) || {};
  if (position === '运维电工') {
    data.code = '1';
    data.message = '账号不存在';
  }
  return data;
}
export async function getUserInfoByToken() {
  const data = await getData('user', 'getUserInfoByToken', {});
  if (!data.type && data.code && data.code !== 'error') data.message = '网络错误';
  return data;
}

export async function queryServiceProviderByCustomerId({ customerId }) {
  const data = await getData('customer', 'queryServiceProviderByCustomerId', { customerId });
  return {
    ...data,
    data: data.data || {},
  };
}

let listeners = [];

const noop = () => { };
// let notifier = noop;

function getUser() {
  return new Promise((resolved, reject) => {
    if (!storage) {
      reject('storage not estabilshed');
      return;
    }
    resolved(storage.get('user'));
  });
}

export async function fetch() {
  const data = await getUser();
  // listeners.forEach(action => notifier(action));
  return data;
}

export function sub(action) {
  // debugger;
  listeners.push(action);
}

export function unsub(action) {
  // debugger;
  listeners = listeners.filter(act => act !== action);
}

export function watch() {
  // notifier = func;
  noop();
}

export function unwatch() {
  // notifier = noop;
  listeners = [];
}
