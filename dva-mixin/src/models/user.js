/**
 * 登录人及其服务商资料
 */
import moment from 'moment';
import * as wsocket from '@services/socketCluster';
// import * as storage from '../services/storage';
import * as userService from '@services/user';
import * as applicationService from '@services/application';

export default {
  namespace: 'user',
  state: {
    position: '',
    employeeId: '',
    logo: null,
    birthday: '',
    sex: '',
    accountId: '',
    companyName: '',
    departmentName: '',
    employeeName: '',
    customerId: '',
    cellphone: '',
    user: '',
    applicationList: [],
  },
  reducers: {
    update(state, { payload }) {
      console.warn(`[${moment().format('HH:mm:ss SSS')}]update model: user`);
      return { ...payload };
    },
    clear() {
      return {};
    },
    setState(state, { payload }) {
      const { companyCharacter } = payload;
      /**
       *  判断是否是用能企业
       *
       * 01  用能企业
       * 02  安装运维商
       * 04  售电服务
       * 05  节能服务
       * 06  金融地产
       * 07  能源分析组织
       * 08  电能质量服务
       * 09  电容器厂家
       * 10  发电机厂家
       * 11  光伏服务商
       * 12  储能服务商
       * 98  其他
       * 99  是否能登录后台运营
       */
      // 判断是否拥有管理员权限
      const isManager = (companyCharacter || []).indexOf('99') !== -1;
      return { ...state, ...payload, isManager };
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      console.warn(`[${moment().format('HH:mm:ss SSS')}]try to update model: user`);
      const user = yield call(userService.fetch);
      // const { onFnin}
      // wsocket.registerTopic(payload.customerId, 'user/detect');
      if (user) {
        if (user.isStation) {
          const res = yield call(userService.queryServiceProviderByCustomerId, { customerId: user.customerId });
          user.serviceProviderCode = res.data.customerCode;
        } else {
          user.serviceProviderCode = user.companyCode;
        }

        yield put({ type: 'setState', payload: user });
        yield put({ type: 'USER_CHANGE' });
        // yield put({
        //   type: 'initApplicationList',
        //   payload: {
        //     customerId: user.customerId,
        //     accountId: user.accountId,
        //   },
        // });
        yield put({ type: 'base/updateCurrentFacilitator', payload: { currentFacilitator: user.customerId } });
      }
    },
    *subscribe({ payload: { action, runOnceReady = true } }, { call, put, select }) {
      yield call(userService.sub, action);
      // 如果数据已经就位，直接触发一次
      const customerId = yield select(state => state.user.customerId);
      if (customerId && runOnceReady) {
        yield put({ type: action });
      }
    },
    *unsub({ payload }, { call }) {
      yield call(userService.unsub);
    },
    *initApplicationList({ payload: { customerId, accountId } }, { call, put }) {
      const { dataList } = yield call(
        applicationService.getRoleAndApplication,
        { serviceProviderId: customerId });
      const role = yield call(applicationService.queryRoleByAccountId, { accountId });
      let roleId = false;
      if (roleId.data) {
        roleId = role.data.roleId;
      }
      let application = [];
      if (dataList && roleId) {
        dataList.some((item) => {
          if (item.roleId === roleId) {
            application = item.applicationGroupList;
            return true;
          }
          return false;
        });
      }

      if (Array.isArray(application) && application.length > 0) {
        // application[0] 表示为配电板，之后还有光伏板等
        const applicationList = application[0].applicationList;
        yield put({
          type: 'setState',
          payload: { applicationList },
        });
      }
    },
  },
  subscriptions: {
    onSocketReceived({ dispatch }) {
      return wsocket.watch((action, data) => {
        dispatch({ type: action, payload: data });
      });
    },
    onUserChange({ dispatch }) {
      userService.watch((action) => {
        dispatch({ type: action });
      });
      return () => userService.unwatch();
    },
  },
};
