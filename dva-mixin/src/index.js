import 'babel-polyfill';
import dva from 'dva';
import moment from 'moment';
import 'moment/locale/zh-cn';
// import { useRouterHistory } from 'dva/router';
// import { createHashHistory } from 'history';
import createLoading from 'dva-loading';
import './font-awesome.min.scss';
import './index.css';
import './global.scss';

moment.locale('zh-cn');

// console.log(x);
// 1. Initialize
const app = dva({
  // history: useRouterHistory(createHashHistory)({ queryKey: false }),

  // 全局错误处理，对model里的effects和subscriptions有效
  onError(error) {
    console.log('dva error:', error);
  },
});

// 2. Plugins
// app.use({});
app.use(createLoading());

// 3. Model
// app.model(require('./models/example'));2
app.model(require('./models/base'));
app.model(require('./models/facilitators'));
app.model(require('./models/login'));
app.model(require('./models/user'));
app.model(require('./models/stations'));
app.model(require('./models/vMainFrame'));

// demo1
app.model(require('./models/demo1'));
app.model(require('./models/demo2'));

// 4. Router
// 开发使用router
app.router(require('./router'));
// 前台运维商使用router
// app.router(require('./router.knowlergy'));
// 后台管理使用router
// app.router(require('./router.manager'));
// 二次设备使用router
// app.router(require('./router.secondaryDevice'));
// 5. Start
app.start('#root');

// 其他
// 启动websocket
require('./services/socketCluster').init();
