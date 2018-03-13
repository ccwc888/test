import React from 'react';
import { Checkbox } from 'antd';
import styles from './Checkbox.scss';


class CheckboxComponent extends React.Component {
  render() {
    const { data, className, style, icon, ...restProps } = this.props;

    return (
      <div className={`${styles.checkbox} ${icon === 'square' ? styles.square : ''} ${className}`} style={style}>
        <Checkbox {...restProps} value={data.value}>{data.label}</Checkbox>
      </div>
    );
  }
}
export default CheckboxComponent;
