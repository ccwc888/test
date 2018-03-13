import React from 'react';
import { Button } from 'antd';
import styles from './Button.scss';

class buttonComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    const { iconDom, level, ...resProps } = this.props;
    const {
      className = '',
      value = '',
      type,
      ghost,
    } = resProps;
    const checkStyle = (t, g) => {
      let mainStyle = '';
      if (t === 'icon') {
        mainStyle = styles.iconBtnStyle;
      } else if (t === 'link') {
        mainStyle = styles.linkBtnStyle;
      } else if (g) {
        mainStyle = styles.ghostBtnStyle;
      } else {
        mainStyle = '';
      }
      return mainStyle;
    };
    // const mainStyle = checkStyle(type);
    return (
      // 主次命令按钮和小按钮
      <div className={`${styles.btnStyle} ${checkStyle(type, ghost)} ${className}`} >
        <Button
          {...resProps}
          className={`${value.length > 4 && !iconDom ? styles.pd20 : ''}`}
        >
          {
            iconDom ?
              <div className={styles.iconStyle}>
                {iconDom}
              </div> : ''
          }
          {/* 加一层span是为了处理antd给只有两个中文字时，会自动填补空格的问题 */}
          <span className={`${level !== 'danger' ? styles.textStyle : styles.textStyle_danger} ${value || this.props.children ? styles.pdrt10 : ''}`}>
            {value || this.props.children}
            <span style={{ display: 'none' }} />
          </span>
        </Button>

      </div>
    );
  }
}
export default buttonComponent;
