// import * as loginService from '@services/user';
import * as environmentService from '@services/environment';

export default {
  namespace: 'demo2',
  state: {
    resData: {},
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    // *login({ payload: { username, password, callback } }, { call, put }) {
    //   const data = yield call(loginService.login, { username, password });
    //   yield put({ type: 'update', payload: { resData: data } });
    // },
    *getWebSocketOption(_, { call, put }) {
      const data = yield call(environmentService.getWebSocketOption);
      yield put({ type: 'update', payload: { resData: data } });
    },
  },
  subscriptions: {},
};
