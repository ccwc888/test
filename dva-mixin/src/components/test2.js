import React, { Component } from 'react';
import { connect } from 'dva';

class Test2 extends Component {
  // componentWillReceiveProps = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'test2/keepState',
  //   });
  // }
  render() {
    const { dispatch } = this.props;
    dispatch({
      type: 'test2/keepState',
    });
    return (
      <div>
        test2:
        {this.props.num }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { ...state.test2 };
}
export default connect(mapStateToProps)(Test2);
