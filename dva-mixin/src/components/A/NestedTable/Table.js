import React from 'react';
import { Table } from 'antd';
import style from './style/Table.scss';

class CTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { className, ...restProps } = this.props;

    return (
      <div className={`${style.wrapper} ${className}`}>
        <Table {...restProps} />
      </div>
    );
  }
}
export default CTable;
