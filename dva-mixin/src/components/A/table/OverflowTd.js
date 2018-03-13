import React from 'react';
import styles from './OverflowTd.scss';

// 需要在 td 上 position relative
// 生成了 .ant-table-tbody > tr > td.overflowtd
// 详见样式文件
export default (props) => {
  const { children, className, style } = props;
  return (
    <div
      className={[styles.wrap, className].join(' ')}
      style={style}
      title={children}
    ><span>{children}</span></div>
  );
};
