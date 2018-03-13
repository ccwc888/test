import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { Layout } from 'antd';
import React, { Component } from 'react';

class Root extends Component {
  constructor(props) {
    super(props);
    
  }
  componentWillMount() {
    const { dispatch, location, checker } = this.props;
    dispatch({
      type: 'base/setState',
      payload: { toLocation: location },
    });
    dispatch({
      type: checker,
    });
  }
  render() {
    const flag = true || !!this.props[this.props.checkerObj];
    const style = {
      height: '100%',
      width: '100%',
    };
    return (
      <Layout style={style}>
        {flag ? this.props.children : null}
      </Layout>
    );
  }
}
function mapStateToProps({ base: { user } }) {
  return { user };
}
export default connect(mapStateToProps)(Root);
