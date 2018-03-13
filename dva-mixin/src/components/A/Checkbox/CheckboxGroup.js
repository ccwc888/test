import React from 'react';
import { Checkbox } from 'antd';
import styles from './Checkbox.scss';

const CheckboxGroup = Checkbox.Group;

class CheckboxGroupComponent extends React.Component {
  render() {
    const { className, style, ...restProps } = this.props;

    return (
      <div className={`${styles.checkbox} ${className}`} style={style}>
        <CheckboxGroup {...restProps} />
      </div>
    );
  }
}
export default CheckboxGroupComponent;
