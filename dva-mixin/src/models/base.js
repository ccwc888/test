import { hashHistory } from 'dva/router';
import { detect } from 'detect-browser';
import * as wsocket from '@services/socketCluster';
import * as baseService from '../services/base';
import * as storage from '../services/storage';
import * as socketUtl from '../services/socketCluster';
import zhugeIO from '../utils/zhugeIO';
// import * as subService from '../services/subService';
const $ = global.$;

const hasLogin = () => {
  if (!!storage.get('token') && !!storage.get('user') && storage.get('token').length > 10) {
    const user = storage.get('user');
    zhugeIO(user);
    return user;
  }
  return null;
};

const dinyoungId = 'CompanyService:1491467117338';
const dinyoungName = 'dinyoung';

// 获取 window.location 中 #/ 后第一串字母当作定制商。
const regCustomized = /^#\/(\w+)[/|?].+/;
let customizedName = regCustomized.exec(window.location.hash);
if (customizedName !== null) {
  customizedName = customizedName[1];
}

export default {
  namespace: 'base',
  state: {
    browser: {},
    toLocation: '/',
    currentFacilitator: '',
    currentStation: '',
    user: null,
    windowSizeType: '1920',
    forcedLogoutVisiblity: false,
  },
  reducers: {
    setState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    // *reLocate({ payload }, { select }) {},
    // *checkLogin({ payload }, { put, call }) {},
    *updateCurrentFacilitator({ payload: { currentFacilitator: nextFacilitator } },
      { put, select }) {
      const currentFacilitator = yield select(state => state.base.currentFacilitator);
      if (currentFacilitator !== nextFacilitator) {
        yield put({ type: 'setState', payload: { currentFacilitator: nextFacilitator } });
        yield put({ type: 'FACILITATOR_CHANGE' });
      }
    },
    *updateCurrentStation({ payload: nextStation }, { put, select }) {
      const currentStation = yield select(state => state.base.currentStation);
      storage.set('curStationId', nextStation);
      storage.set('dlqsDeviceId', nextStation);
      if (currentStation !== nextStation) {
        yield put({ type: 'setState', payload: { currentStation: nextStation } });
        yield put({ type: 'STATION_CHANGE' });
      }
    },
    *logoutForce({ payload }, { put }) {
      console.log(payload);
      const userInfo = hasLogin();
      if (userInfo) {
        yield put({
          type: 'setState',
          payload: {
            forcedLogoutVisiblity: true,
          },
        });
      }
    },
  },
  subscriptions: {
    initUserAgent({ dispatch }) {
      const browser = detect() || {};
      const body = document.body;
      browser.version = window.parseInt(browser.version);

      dispatch({ type: 'setState', payload: { browser } });

      // add class for style hacks
      // IE does not support multiple parameters for the add() & remove() methods
      body.classList.add(browser.name);
      body.classList.add(`${browser.name}${browser.version}`);
    },
    onUnauthorized() {
      customizedName = regCustomized.exec(window.location.hash);
      if (customizedName !== null) {
        customizedName = customizedName[1];
      }
      if (storage.get('currentCustomerId') === dinyoungId || customizedName === dinyoungName) {
        return baseService.listenUnauthorized(() => {
          socketUtl.unregiterAll();
          hashHistory.replace('/dinyoung/login');
        });
      } else {
        return baseService.listenUnauthorized(() => {
          socketUtl.unregiterAll();
          hashHistory.replace('/login');
        });
      }
    },
    onTokenRolling() {
      return baseService.listenTokenRolling((token) => {
        storage.set('token', token);
      });
    },
    customizedHistory() {
      const regIsDinyoung = /^\/dinyoung.*/;
      hashHistory.listenBefore((location) => {
        const { pathname, search } = location;
        if (storage.get('currentCustomerId') === dinyoungId || customizedName === dinyoungName) {
          if (!regIsDinyoung.test(pathname)) {
            hashHistory.replace(`/dinyoung${pathname}${search}`);
          }
        }
        customizedName = regCustomized.exec(window.location.hash);
        if (customizedName !== null) {
          customizedName = customizedName[1];
        }
      });
    },
    listenningWindow({ dispatch }) {
      const listener = () => {
        const windowWidth = $(window).width();
        const windowHeight = $(window).height();
        // xs: '480px',
        //   sm: '768px',
        //     md: '992px',
        //       lg: '1200px',
        //         xl: '1600px',
        let windowSizeType = '1920';
        if (windowWidth <= 1600) {
          windowSizeType = '1600';
        }
        dispatch({
          type: 'setState',
          payload: {
            windowWidth,
            windowHeight,
            windowSizeType,
          },
        });
      };
      $(window).resize(listener);
      return () => $(window).unbind('resize', listener);
    },
    listenCommonSocketEvents() {
      wsocket.registerTopic('common-versionUp', 'base/logoutForce');
    },
    // initSubService({ dispatch }) {
    //   subService.init(dispatch);
    //   return () => subService.destroy();
    // },
  },
};
