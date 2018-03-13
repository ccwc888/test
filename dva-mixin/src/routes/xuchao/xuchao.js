import React from 'react';
import { connect } from 'dva';
class xuchao extends React.Component {

  render() {
    const { expData } = this.props;
    return (<div>
        <div>{expData}</div>
    </div>);
  }
}

function exportLaoyang(state){
    return {
      expData:state.xuchao.name
    };
  }
export default connect(exportLaoyang)(xuchao);