import React from 'react';
import { Router, Route, IndexRedirect } from 'dva/router';

// import Login from '@routes/Login';

import MainFrame from '@routes/MainFrame.js';

import componentDev from '@routes/component_dev';

import Demo1 from '@routes/demo1';

import Demo2 from '@routes/demo2';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      {/* 前台路由 */}
      <Route path="/" component={MainFrame}>
        <IndexRedirect to="component_dev" />
        <Route path="component_dev" component={componentDev} />
        <Route path="demo1" component={Demo1} />
        <Route path="demo2" component={Demo2} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
