import React from 'react';
import { Select } from 'antd';
import style from './Select.scss';

class CSelect extends React.Component {
  render() {
    const { wrapClassName, dropdownClassName, ...props } = this.props;
    return (
      <div className={[style.wrapper, wrapClassName].join(' ')}>
        <Select
          {...props}
          dropdownClassName={[style.drop, dropdownClassName].join(' ')}
        />
      </div>
    );
  }
}
export default CSelect;
