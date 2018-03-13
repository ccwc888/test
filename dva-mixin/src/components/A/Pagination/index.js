import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import Selector from '../Select';
import Input from '../Input';
import styles from './index.scss';

const SelectorOption = Selector.Option;
class APagination extends React.Component {
  constructor(props) {
    super(props);
    const { defaultCurrent = 1, defaultPageSize = 30 } = props;
    this.state = {
      stateCurrent: defaultCurrent,
      statePageSize: defaultPageSize,
      jumperNum: '',
    };
  }
  defaultSizeOptionsTip = size => `${size}`;
  selectSize = (value) => {
    const { stateCurrent, statePageSize } = this.state;
    // const { current, pageSize, onShowSizeChange, onChange } = this.props;
    const { current, pageSize, onShowSizeChange, total = 0 } = this.props;
    const pageMax = (current || stateCurrent) * (pageSize || statePageSize);
    const last = total > pageMax ? pageMax : total;
    const newCurrent = Math.ceil(last / +value);
    if (onShowSizeChange) {
      onShowSizeChange(newCurrent, +value);
    }
    // if (onChange) {
    //   onChange(current || stateCurrent, value);
    // }
    // else {
    // const oldC = current || stateCurrent;
    // const oldSize = pageSize || statePageSize;
    // const newCurrent = Math.ceil((((oldC - 1) * oldSize) + 1) / value);
    this.setState({
      statePageSize: value,
      stateCurrent: newCurrent,
    });
    // }
  }
  changePage = (type) => {
    // console.log(type);
    const { total = 0, current, pageSize, onChange } = this.props;
    const { stateCurrent, statePageSize } = this.state;
    let newCurrent = 1;
    switch (type) {
      case 'first':
        newCurrent = 1;
        break;
      case 'pre':
        newCurrent = (current || stateCurrent) - 1;
        break;
      case 'next':
        newCurrent = (current || stateCurrent) + 1;
        break;
      case 'last':
        newCurrent = Math.ceil(total / (pageSize || statePageSize));
        break;
      default:
        break;
    }
    if (onChange) {
      onChange(newCurrent, (pageSize || statePageSize));
    }
    // else {
    this.setState({ stateCurrent: newCurrent });
    // }
  }
  handleJumperNum = (event) => {
    if (event.target.value === '') {
      this.setState({ jumperNum: '' });
      return;
    }
    let num = 1;
    try {
      num = parseInt(event.target.value, 10);
    } catch (ex) {
      num = '';
    }
    this.setState({ jumperNum: (num === '' || isNaN(num) || num < 1) ? '' : Math.floor(num) });
  }
  jump = () => {
    const { total, pageSize, onChange } = this.props;
    const { jumperNum, statePageSize } = this.state;
    let jumpAim = jumperNum === '' ? 1 : jumperNum;
    if (Math.ceil(total / (pageSize || statePageSize)) < jumpAim) {
      jumpAim = 1;
    }
    if (onChange) {
      onChange(jumpAim, (pageSize || statePageSize));
    }
    // else {
    this.setState({ stateCurrent: jumpAim, jumperNum: '' });
    // }
  }
  render() {
    const {
      className,
      style,
      total,
      current,
      pageSize,
      pageSizeOptions = [30, 50, 80, 100],
      showSizeChanger = true,
      showQuickJumper = true,
      showTotal = true,
      showSplitLine = false,
      sizeOptionsTip = this.defaultSizeOptionsTip,
    } = this.props;
    if (total === 0) {
      return <div className={[styles.container, className].join(' ')} style={style} />;
    }
    const { stateCurrent, statePageSize } = this.state;
    let pagesLength = Math.ceil(total / (pageSize || statePageSize));
    if (pagesLength === 0) { pagesLength = 1; }
    let totalPart = [];
    let sizeChangePart = [];
    const baseOperate = [
      <Button key="first" disabled={(current || stateCurrent) <= 1} onClick={this.changePage.bind(null, 'first')} className={[styles.button].join(' ')} size="small" icon="verticle-right" />,
      <Button key="pre" disabled={(current || stateCurrent) <= 1} onClick={this.changePage.bind(null, 'pre')} className={[styles.button].join(' ')} size="small" icon="left" />,
      <Button key="next" disabled={(current || stateCurrent) >= pagesLength} onClick={this.changePage.bind(null, 'next')} className={[styles.button].join(' ')} size="small" icon="right" />,
      <Button key="last" disabled={(current || stateCurrent) >= pagesLength} onClick={this.changePage.bind(null, 'last')} className={[styles.button].join(' ')} size="small" icon="verticle-left" />,
    ];
    let extraOperate = [];
    if (showTotal) {
      totalPart = [
        <span key="total" className={[styles.element].join(' ')}>{`共${(total || total === 0) ? total : ''}条`}</span>,
        <span key="current" className={[styles.element].join(' ')}>{`第${current || stateCurrent}/${pagesLength}页`}</span>,
      ];
    }
    if (showSizeChanger) {
      const options = pageSizeOptions.map((item) => {
        const itemText = sizeOptionsTip(item);
        return <SelectorOption key={`${item}`} > {itemText}</SelectorOption>;
      });
      sizeChangePart = [
        <span key="every" className={[styles.element].join(' ')}>每页</span>,
        <Selector key="sizeSelector" value={`${pageSize || statePageSize}`} onSelect={this.selectSize} style={{ width: 80, minWidth: 80, margin: '0 5px' }} >
          {options}
        </Selector>,
        <span key="everyUnit" className={[styles.element].join(' ')}>条</span>,
      ];
    }
    if (showQuickJumper) {
      extraOperate = [
        <span className={[styles.element].join(' ')}>第</span>,
        <Input disabled={pagesLength <= 1} value={this.state.jumperNum} onChange={this.handleJumperNum} placeholder="" style={{ width: 60, minWidth: 60, margin: '0 5px' }} />,
        <span className={[styles.element].join(' ')}>页</span>,
        <Button disabled={pagesLength <= 1 || (this.state.jumperNum > pagesLength)} onClick={this.jump} className={[styles.element, styles.jumpButton].join(' ')} size="small" value="跳转" />,
      ];
    }
    return (
      <div className={[showSplitLine ? styles.split : '', styles.container, className].join(' ')} style={style}>
        <span key="left">
          {totalPart}
          {sizeChangePart}
        </span>
        <span key="right">
          {baseOperate}
          {extraOperate}
        </span>
      </div>
    );
  }
}
APagination.propTypes = {
  total: PropTypes.number.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  current: PropTypes.number,
  defaultCurrent: PropTypes.number,
  defaultPageSize: PropTypes.number,
  pageSize: PropTypes.number,
  pageSizeOptions: PropTypes.arrayOf(PropTypes.number),
  onChange: PropTypes.func,
  onShowSizeChange: PropTypes.func,
  showQuickJumper: PropTypes.bool,
  showSizeChanger: PropTypes.bool,
  showTotal: PropTypes.bool,
  sizeOptionsTip: PropTypes.func,
  showSplitLine: PropTypes.bool,
};
export default APagination;
