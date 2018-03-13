import React from 'react';
import { Popover } from 'antd';
import styles from './index.scss';

class Pop extends React.Component {
  render() {
    const { overlayClassName, ...restProps } = this.props;
    return (
      <Popover
        placement="rightTop"
        {...restProps}
        overlayClassName={`popConfirm ${overlayClassName}`}
      />
    );
  }
}
export default Pop;
