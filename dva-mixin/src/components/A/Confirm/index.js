import React from 'react';
import { Modal } from 'antd';
import css from './index.scss';

class Confirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {
    /*
    *      onOk：确定按钮click事件 PS：只有type为default的时候生效
    *  onCancel：取消按钮click type为alarm的时候按钮click事件就只用这一个
    */
    const { onOk, onCancel } = this.props;
    // type：弹窗类型 default默认两个按钮  alarm一个按钮
    const type = this.props.type || 'default';
    // okText：确定按钮文字 PS：只有type为default的时候生效
    const okText = this.props.okText || '确定';
    // cancelText：取消文字 PS：type为alarm的时候按钮文字就只用这一个
    const cancelText = this.props.cancelText;
    // titleWord：要提示的文字标题
    const titleWord = this.props.titleWord || '';
    // word：要提示的文字内容
    const word = this.props.word || '';
    // 底部按钮
    let footBtn = [];
    if (type === 'default') {
      // 复杂信息提示框
      footBtn = [
        <span onClick={onOk} className={css.okBtn}>{okText}</span>,
        <span onClick={onCancel} className={css.cancelBtn}>{ cancelText || '取消'}</span>,
      ];
    } else if (type === 'alarm') {
      // 警示提示框
      footBtn = [<span onClick={onCancel} className={css.alarmBtn}>{cancelText || '关闭'}</span>];
    }
    // 标题与内容的容器样式
    const cssWarpper = `${css.tipsWord} ${word ? css.moreWord : ''}`;
    // 如果有内容文字就加载内容文字的容器和内容文字
    const wordContainer = word ? (<p className={css.content}>{word}</p>) : '';
    // 图表样式控制
    const iconCss = `${css.icon} ${word ? css.maiginzero : ''}`;
    /*
    *   icon：提示的图标类型
    *  error：操作失败
    *success：操作成功
    *  alarm：警告
    * remind：提醒
    *    ask：询问
    */
    const icon = this.props.icon || 'error';
    // 指定图标转义
    const iconObj = {
      error: (
        <i className={iconCss} style={{ background: '#ff5f5f', color: '#993535' }}>
          <svg className="icon" >
            <use xlinkHref="#icon-shibai" />
          </svg>
        </i>),
      success: (
        <i className={iconCss} style={{ background: '#1ae98f', color: '#0d7447' }}>
          <svg className="icon" >
            <use xlinkHref="#icon-duihao" />
          </svg>
        </i>),
      alarm: (
        <i className={iconCss} style={{ color: '#7f6b0b', fontSize: '50px', lineHeight: '50px' }}>
          <svg className="icon">
            <use xlinkHref="#icon-sanjiaoxing1" style={{ color: '#ffd617' }} />
            <use xlinkHref="#icon-sanjiaoxing" style={{ color: '#7f6b0b' }} />
          </svg>
        </i>),
      remind: (
        <i className={iconCss} style={{ background: '#47ccff', color: '#2c7c99' }}>
          <svg className="icon">
            <use xlinkHref="#icon-shuoming" />
          </svg>
        </i>),
      ask: (
        <i className={iconCss} style={{ background: '#ffd617', color: '#7f6b0b' }}>
          <svg className="icon">
            <use xlinkHref="#icon-wenhao" />
          </svg>
        </i>),
    };
    return (
      <Modal
        {...this.props}
        wrapClassName={css.messageComponent}
        width={360}
        maskClosable={false}
        closable={false}
        footer={footBtn}
      >
        <div className={css.confirmContainer}>
          {iconObj[icon]}
          <p className={cssWarpper}>
            <p>{titleWord}</p>
            {wordContainer}
          </p>
        </div>
      </Modal>);
  }
}

export default Confirm;
