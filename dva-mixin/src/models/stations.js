/**
 * 单个运维商的站点信息库
 */
import moment from 'moment';
import * as stationService from '@services/powerstation';
import * as stationService2 from '@services/2.1/powerstation';
import Lo from 'lodash';

const
  YDLX_ENUM = {
    100: '大工业用电',
    101: '大工业中小化肥',
    102: '大工业其它优待',
    200: '居民生活用电',
    201: '乡村居民生活用电',
    202: '城镇居民生活用电',
    203: '中小学教学用电',
    300: '农业生产用电',
    301: '农业排灌',
    302: '贫困县农业排灌用电',
    400: '一般工商业',
    401: '非居民照明',
    402: '非工业',
    403: '普通工业',
    404: '普通工业中小化肥',
    405: '商业用电',
    500: '趸售',
    501: '趸售大工业',
    502: '趸售普工、非普工业',
    503: '趸售非居民',
    504: '趸售居民生活用电',
    505: '趸售农业生产用电',
    506: '趸售商业用电',
    900: '其它用电',
    901: '大用户直购电',
    902: '抽水蓄能',
    903: '售邻省',
    904: '其他',
  };

const itemMap = stObj => ({
  ...stObj,
  // 站点ID
  id: `${stObj.powerClientId}`,
  // 站点code
  stationCode: stObj.stationCode,
  // 站点名称
  name: stObj.powerClientName || stObj.stationName,
  // 用电客户简称
  shortName: stObj.powerClientShortName || stObj.stationName || '',
  // 纬度
  lat: +stObj.latitude,
  // 经度
  lon: +stObj.longitude,
  // 主变台数 属性丢失
  totalTransformerCount: stObj.gatewayTransformerNumber,
  // 主变总容量 属性丢失
  totalTransformerCapacity: stObj.runCapacity,
  // 合同容量
  contractCapacity: stObj.contractCapacity,
  // 省编码
  provinceCode: stObj.provinceCode.code,
  // 市编码
  cityCode: stObj.cityCode.code,
  // 完整地址
  address: stObj.address,
  // 用电类型
  ydType: YDLX_ENUM[stObj.electricCategory],
  // 工程接入阶段
  projectAccessStage: stObj.projectAccessStage || '5',
  // 服务商ID
  serviceId: stObj.serviceProviderId,
  // 服务商Code
  serviceCode: stObj.serviceProviderCode,
  //
  customerId: stObj.customerId,
  //
  customerCode: stObj.comCode,
  // 是否可见（过滤选项），默认true
  visible: true,
  // 编号
  code: stObj.code,
  // 接入时间
  accessDate: stObj.created,
});
// 站点key为id的对象
const listToHash = (list, key = 'id') => {
  const hash = {};
  list.forEach((obj) => { hash[obj[key]] = obj; hash[obj.stationCode] = obj; });
  return hash;
};
// 站点key为name的对象
const listToHashName = (list) => {
  const hash = {};
  list.forEach((obj) => { hash[obj.name] = obj; });
  return hash;
};
// 站点id数组
const listToHashId = (list) => {
  const selfIdList = [];
  list.forEach((it, i) => {
    selfIdList[i] = it.id;
  });
  return selfIdList;
};

// const SUB_FLAG = false;

export default {
  namespace: 'stations',
  state: {
    list: [],
    idList: [],
    byId: {},
    byCode: {},
    byName: {},
    idsToCodes: () => {},
    codesToIds: () => {},
  },
  reducers: {
    update(state, { payload: list }) {
      const byId = listToHash(list);
      const idToCode = id => Lo.get(byId[id], 'stationCode');
      const codeToId = code => Lo.get(byId[code], 'id');
      return {
        list,
        byId,
        byCode: listToHash(list, 'stationCode'),
        idList: listToHashId(list),
        byName: listToHashName(list),
        idToCode,
        idsToCodes: ids => ids.map(idToCode),
        codeToId,
        codesToIds: codes => codes.map(codeToId),
      };
    },
    clear() {
      return { list: [], byId: {}, byName: {} };
    },
    filterVisibleStations(state, { payload: list }) {
      state.list.forEach((item) => {
        item.visible = false;
      });
      list.forEach((item) => {
        state.list[item.id].visible = true;
      });
      return { ...state };
    },
  },
  effects: {
    fetch: [
      function* fetch({ payload: { facilitatorId } }, { call, put, select }) {
        if (!facilitatorId) {
          return;
        }
        const isStation = yield select(state => state.user.isStation);
        console.warn(`[${moment().format('HH:mm:ss SSS')}]try to update model: powerclients`);
        // 获取stationList
        const { dataList: list, code } = yield call(
          isStation ? stationService2.fetchByCompanyId : stationService2.fetch,
          isStation ? { customerId: facilitatorId } : { serviceProvidorId: facilitatorId },
        );
        if (code) {
          console.error(`Fetch stationList failed,code:${code}`);
        }
        const dataList = list || [];
        yield put({ type: 'update', payload: dataList.map(itemMap) });
        yield put({ type: 'POWERSTATION_CHANGE' });
      },
      { type: 'takeLatest' },
    ],
    *queryById({ payload: { id, cb = () => { } } }, { call }) {
      if (!id) return;
      const resData = yield call(stationService.queryPowerStation, { powerStationId: id });
      yield call(cb, resData);
    },
    *updateStation({ payload: { cb = () => { }, param } }, { call, select }) {
      const accountId = yield select(state => state.user.accountId);
      const resData = yield call(
        stationService.updatePowerStation,
        { ...param, modifier: accountId },
      );
      yield call(cb, resData);
    },
    *createStation({ payload: { cb = () => { }, param } }, { call, select }) {
      const accountId = yield select(state => state.user.accountId);
      const resData = yield call(
        stationService.createPowerStation,
        { ...param, creator: accountId },
      );
      yield call(cb, resData);
    },
    *queryIndustryByIndestryCode({ payload: { cb = () => { }, indestryCode } }, { call }) {
      if (!indestryCode) return;
      const resData = yield call(
        stationService.queryIndustryByIndestryCode,
        { indestryCode },
      );
      yield call(cb, resData);
    },
    *searchByAddress({ payload: { cb = () => { }, address: addr } }, { call }) {
      // if (!addr) return;
      // const resData = yield call(
      //   queryLatAndLngService.searchByAddress,
      //   { addr },
      // );
      yield call(cb, {});
    },
  },
  subscriptions: {},
};
