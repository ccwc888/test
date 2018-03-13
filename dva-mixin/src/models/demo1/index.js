// const warnConverter = (data) => {
//   if (!data.code) return null;
//   return data.message;
// };
export default {
  namespace: 'demo1',
  state: {
    text: '',
  },
  reducers: {
    update(state, { payload }) {
      return { ...state, ...payload };
    },
    changeText(state, { payload: text }) {
      return { ...state, text };
    },
  },
  effects: {},
  subscriptions: {},
};
