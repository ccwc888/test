import React from 'react';
import { Radio } from 'antd';
import styles from './Radio.scss';


class RadioComponent extends React.Component {
  render() {
    const { data, className, style, ...restProps } = this.props;

    return (
      <div className={`${styles.radio} ${className}`} style={style}>
        <Radio {...restProps} value={data.value}>{data.label}</Radio>
      </div>
    );
  }
}
RadioComponent.RadioGroup = Radio.Group;

export default RadioComponent;
