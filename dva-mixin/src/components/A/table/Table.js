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
    const { className, noZebra = false, ...restProps } = this.props;
    const classNames = [style.wrapper];
    if (!noZebra) classNames.push(style['zebra-stripe']);
    if (!restProps.bordered) classNames.push(style['no-border']);
    if (className) classNames.push(className);
    return (
      <div className={classNames.join(' ')}>
        <Table {...restProps} />
      </div>
    );
  }
}
export default CTable;
