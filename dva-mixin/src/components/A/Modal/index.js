import React from 'react';
import { Modal } from 'antd';
import Button from '@components/A/Button';
import css from './index.scss';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { type } = this.props;
    let footer = [];
    // 显示单个按钮
    if (type === 'single') {
      footer = [<span className={css.selfBtnContainer}><span>
        <Button
          type="default"
          onClick={this.props.onCancel}
          value={this.props.cancelText}
        />
      </span></span>];
    } else {
      footer = [<span className={css.selfBtnContainer}>
        <span>
          <Button
            type="primary"
            onClick={this.props.onOk}
            value={this.props.okText}
          />
        </span>
        <span>
          <Button
            type="default"
            onClick={this.props.onCancel}
            value={this.props.cancelText}
          />
        </span>
      </span>];
    }
    return (
      <Modal
        {...this.props}
        maskClosable={false}
        wrapClassName={`${css.modalComponent} ${this.props.wrapClassName || ''}`}
        // 如果用户自己传了footer就用用户自己传的，不传就用默认的两个按钮
        footer={this.props.footer || footer}
      />
    );
  }
}
export default ModalComponent;
