import React from 'react';
import { Input } from 'antd';
import './Input.scss';

class CInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <Input data-cinputstyle {...this.props} />
    );
  }
}
export default CInput;
