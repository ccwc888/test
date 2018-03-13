import React from 'react';
import { DatePicker } from 'antd';
import style from './DatePicker.scss';

const { MonthPicker, RangePicker } = DatePicker;

class DatePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { className } = this.props;
    return (
      <div className={`${style.DatePicker} ${className}`}>
        <DatePicker
          {...this.props}
          size="large"
        />
      </div>
    );
  }
}

DatePickerComponent.MonthPicker = ({ className, ...rest }) => {
  return (
    <div className={`${style.DatePicker} ${className}`}>
      <MonthPicker
        {...rest}
        size="large"
      />
    </div>
  );
};

DatePickerComponent.RangePicker = ({ className, ...rest }) => {
  return (
    <div className={`${style.DatePicker} ${className}`}>
      <RangePicker
        {...rest}
        size="large"
      />
    </div>
  );
};

export default DatePickerComponent;
