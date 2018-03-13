import React from 'react';
import { Modal } from 'antd';

import styles from './index.scss';

export default (props) => {
  const {
    className,

    ...rest
  } = props;

  return (
    <div>
      <div id="routes-content" />
      <Modal
        {...rest}
        getContainer={() => document.querySelector('#routes-content')}
        mask={false}
        wrapClassName={`${styles.wrap} ${className || ''}`}
      />
    </div>
  );
};
