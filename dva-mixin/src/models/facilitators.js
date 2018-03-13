/**
 * 服务商信息库
 */
// import moment from 'moment';
import * as facilitatorService from '@services/facilitators';

const mapListToHash = (list) => {
  const hash = {};
  list.forEach((obj) => {
    const target = obj;
    target.id = target.customerId;
    hash[target.id] = target;
  });
  return hash;
};

export default {
  namespace: 'facilitators',
  state: {
    list: [],
    byId: {},
  },
  reducers: {
    update(state, { payload: list }) {
      return { list, byId: mapListToHash(list) };
    },
  },
  effects: {
    *fetch({
        payload: { cb = () => { }, page = 1, length = 10, keyVal = '' } = {} },
      { call }) {
      const { dataList = [] } = yield call(facilitatorService.fetch, { page, length, keyVal });
      // yield put({ type: 'update', payload: dataList });
      yield call(cb, dataList, mapListToHash(dataList));
    },
    fuzzyByName: [
      function* fuzzyByName({ payload: { keywords, cb = () => { } } }, { call }) {
        let { dataList } = yield call(
          facilitatorService.fetch,
          { page: 1, length: 10, keyVal: keywords },
        );
        if (!dataList) dataList = [];
        yield call(cb, dataList, mapListToHash(dataList));
      },
      { type: 'throttle', ms: 800 },
    ],
  },
  subscriptions: {},
};
