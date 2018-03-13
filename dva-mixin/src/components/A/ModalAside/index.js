import React from 'react';
import { Modal } from 'antd';

import styles from './index.scss';

export default (props) => {
  const {
    className,
    scrollY,

    ...rest
  } = props;

  return (
    <Modal wrapClassName={`${styles.wrap} ${scrollY ? styles.scrollY : ''} ${className || ''}`} {...rest} />
  );
};
