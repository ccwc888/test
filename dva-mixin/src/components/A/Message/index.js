import React from 'react';
import Notification from 'rc-notification';
// import { Icon } from 'antd';
import style from './index.scss';

let defaultDuration = 2;
let defaultTop;
let messageInstance;
let key = 1;
let prefixCls = style.message; // 'ant-message';
let getContainer;

function getMessageInstance() {
  messageInstance = messageInstance || Notification.newInstance({
    prefixCls,
    transitionName: 'move-up',
    style: { top: defaultTop }, // 覆盖原来的样式
    getContainer,
  });
  return messageInstance;
}

// type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';

function notice(
  content, // : React.ReactNode,
  duration = defaultDuration, // : number
  type, // : NoticeType,
  onClose, // ?: () => void,
) {
  const iconType = ({
    // info: 'info-circle',
    // success: 'check-circle',
    // error: 'cross-circle',
    // warning: 'exclamation-circle',
    success: (
      <i>
        <svg className="icon" >
          <use xlinkHref="#icon-duihao" />
        </svg>
      </i>),
    error: (
      <i>
        <svg className="icon" >
          <use xlinkHref="#icon-shibai" />
        </svg>
      </i>),
    warning: (
      <i>
        <svg className="icon">
          <use xlinkHref="#icon-sanjiaoxing1" style={{ color: '#ffd617' }} />
          <use xlinkHref="#icon-sanjiaoxing" style={{ color: '#7f6b0b' }} />
        </svg>
      </i>),
    info: (
      <i>
        <svg className="icon">
          <use xlinkHref="#icon-shuoming" />
        </svg>
      </i>),
  })[type];

  const instance = getMessageInstance();
  instance.notice({
    key,
    duration,
    style: {},
    closable: true,
    content: (
      <div className={`${prefixCls}-custom-content ${prefixCls}-${type}`}>
        <div className={style.icon}>
          {iconType}
        </div>
        <span className={style.content}>{content}</span>
        {/* <span className={style.close} /> */}
      </div>
    ),
    onClose,
  });
  return (function () {
    const target = key++;
    return function () {
      instance.removeNotice(target);
    };
  }());
}
// type ConfigContent = React.ReactNode | string;
// type ConfigDuration = number;
// export type ConfigOnClose = () => void;
// export interface ConfigOptions {
//   top?: number;
//   duration?: number;
//   prefixCls?: string;
//   getContainer?: () => HTMLElement;
// }
export default {
  // info(content: ConfigContent, duration?: ConfigDuration, onClose?: ConfigOnClose) {
  info(content, duration, onClose) {
    return notice(content, duration, 'info', onClose);
  },
  success(content, duration, onClose) {
    return notice(content, duration, 'success', onClose);
  },
  error(content, duration, onClose) {
    return notice(content, duration, 'error', onClose);
  },
  // Departed usage, please use warning()
  warn(content, duration, onClose) {
    return notice(content, duration, 'warning', onClose);
  },
  warning(content, duration, onClose) {
    return notice(content, duration, 'warning', onClose);
  },
  loading(content, duration, onClose) {
    return notice(content, duration, 'loading', onClose);
  },
  config(options) {
    if (options.top !== undefined) {
      defaultTop = options.top;
      messageInstance = null; // delete messageInstance for new defaultTop
    }
    if (options.duration !== undefined) {
      defaultDuration = options.duration;
    }
    if (options.prefixCls !== undefined) {
      prefixCls = options.prefixCls;
    }
    if (options.getContainer !== undefined) {
      getContainer = options.getContainer;
    }
  },
  destroy() {
    if (messageInstance) {
      messageInstance.destroy();
      messageInstance = null;
    }
  },
};
