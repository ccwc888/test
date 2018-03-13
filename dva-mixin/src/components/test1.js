import React, { Component } from 'react';
import { connect } from 'dva';

class Test1 extends Component {
  render() {
    return (
      <div>
        test1:
        {this.props.num }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { ...state.test1 };
}
export default connect(mapStateToProps)(Test1);
