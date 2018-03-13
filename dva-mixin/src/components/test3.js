import React, { Component } from 'react';
import { connect } from 'dva';

class Test3 extends Component {
  // componentWillReceiveProps = () => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'test3/keepState',
  //   });
  // }
  render() {
    const { dispatch } = this.props;
    dispatch({
      type: 'test3/keepState',
    });
    return (
      <div>
        test3:
        {this.props.num}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { ...state.test3 };
}
export default connect(mapStateToProps)(Test3);
