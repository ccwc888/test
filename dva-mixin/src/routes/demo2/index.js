import React from 'react';
import { connect } from 'dva';
import { Input, Button } from 'antd';
import styles from './index.scss';

class Demo2 extends React.Component {
  state = {
    username: '',
    password: '',
  }
  onSendRequest = () => {
    this.props.dispatch({
      type: 'demo2/getWebSocketOption',
      payload: {},
    });
  }
  render() {
    const { resData } = this.props;
    return (<div className={styles.wrapper}>
      <div className={styles.unit}>
        <h2>远程请求</h2>
        <Button onClick={this.onSendRequest} type="primary" >发送请求</Button>
        <div>
          <Input
            type="textarea"
            value={JSON.stringify(resData, null, 2)}
            rows={20}
          />
        </div>
      </div>
    </div>);
  }
}

function mapStatToProps(state) {
  return {
    resData: state.demo2.resData,
  };
}

export default connect(mapStatToProps)(Demo2);
