
// import * as environmentService from '@services/environment';

// let VIEW_FLAG = false;

export default {
  namespace: 'vMainFrame',
  state: {
    // 是否全屏显示
    isFullScreen: false,
    // 后台管理地址
    operateConsoleUrl: '',
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
    // updateCurrentFacilitator
    // updateCF(state, { payload: currentFacilitator }) {
    //   return { ...state, currentFacilitator };
    // },
  },
  effects: {},
  subscriptions: {},
};
