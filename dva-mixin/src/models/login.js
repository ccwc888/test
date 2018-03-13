// import { hashHistory } from 'dva/router';
import * as loginService from '../services/user';
import * as storeService from '../services/storage';
import * as socketUtl from '../services/socketCluster';

// const warnConverter = (data) => {
//   if (!data.code) return null;
//   return data.message;
// };
export default {
  namespace: 'login',
  state: {
    warn: null,
  },
  reducers: {
    setWarn(state, { payload: { warn, loginState } }) {
      return { ...state, warn, loginState };
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      const data = yield call(loginService.login, payload);
      // yield put({
      //   type: 'setWarn',
      //   payload: { warn: warnConverter(data) },
      // });
      if (!data.code) {
        storeService.set('token', data.data.token);
        storeService.set('user', data.data);
        storeService.set('userLogo', data.data.logo);
        yield put({ type: 'user/fetch' });
        yield call(storeService.set, 'currentCustomerId', data.data.customerId);
        yield call(socketUtl.registerTopic, 'common-versionUp', 'base/logoutForce');
        yield put({
          type: 'base/reLocate',
          payload: {
            currentCustomerId: data.data.customerId,
          },
        });
      } else {
        payload.callBack(data.message);
      }
    },
    *logout({ payload }, { call, put }) {
      yield call(storeService.remove, 'user');
      yield call(storeService.remove, 'token');
      yield call(storeService.remove, 'userLogo');
      yield call(storeService.remove, 'curStationId');
      yield put({ type: 'user/clear' });
      yield put({ type: 'base/setState', payload: { toLocation: '/', currentStation: '' } });
      yield put({ type: 'base/checkLogin' });
      yield call(storeService.remove, 'currentCustomerId');
      yield call(socketUtl.unregiterAll);
    },
  },
  subscriptions: {},
};
