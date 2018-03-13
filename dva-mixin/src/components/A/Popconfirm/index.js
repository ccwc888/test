import React from 'react';
import { Popconfirm } from 'antd';
import style from './index.scss';

export default class APopconfirm extends React.Component {

  render() {
    const { overlayClassName, ...restProps } = this.props;
    return (
      <Popconfirm
        overlayClassName={[style.popconfirm, overlayClassName].join(' ')}
        {...restProps}
      />
    );
  }
}
