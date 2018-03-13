import React from 'react';
import { Radio } from 'antd';
import styles from './SubTabs.scss';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class SubTabsComponent extends React.Component {
  render() {
    const { className, style, subTabsList, ...restProps } = this.props;
    const tabPane = subTabsList.map(item => (<RadioButton value={item.url} disabled={item.disabled} key={item.url}>{item.name}</RadioButton>));

    return (
      <div className={`${styles.subTabs} ${className}`} style={style}>
        <RadioGroup
          {...restProps}
        >
          {tabPane}
        </RadioGroup>
      </div>
    );
  }
}
export default SubTabsComponent;
