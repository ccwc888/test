import React from 'react';
import styles from './index.scss';

class Tag extends React.Component {
  render() {
    // 显示单个按钮
    return (
      <span
        {...this.props}
        className={`${styles.tag} ${this.props.className || ''}`}
      >
        {this.props.children}
        <svg
          className={`icon ${styles.icon}`}
          onClick={() => {
            if (this.props.onDelete) {
              this.props.onDelete();
            }
          }}
        >
          <use xlinkHref={'#icon-shanchukuaijie2'} />
        </svg>
      </span>
    );
  }
}
export default Tag;
