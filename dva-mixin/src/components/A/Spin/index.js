import React from 'react';
import { Spin } from 'antd';
import styles from './index.scss';

export default function ISpin(props) {
  return (
    <Spin
      {...props}
      wrapperClassName={`${styles.normal} ${props.wrapperClassName}`}
    />
  );
}
