import React from 'react';
import { TimePicker } from 'antd';
import styles from './TimePicker.scss';

class CTimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { id, className, ...restProps } = this.props;
    return (
      <div
        id={id}
        className={`${styles.TimePicker} ${className}`}
      >
        <TimePicker
          allowEmpty={false}
          placeholder=""
          getPopupContainer={() => document.getElementById(id)}
          {...restProps}
        />
      </div>
    );
  }
}
export default CTimePicker;
