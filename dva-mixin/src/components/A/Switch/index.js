import React from 'react';
import { Switch } from 'antd';
import styles from './index.scss';

export default function (props) {
  return (
    <div className={`${styles.switcher} ${props.className || ''}`}>
      <Switch
        checkedChildren="开"
        unCheckedChildren="关"
        {...props}
        className=""
      />
    </div>
  );
}
