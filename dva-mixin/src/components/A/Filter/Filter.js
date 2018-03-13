import React from 'react';
import ReactDOM from 'react-dom';
import { Select, Icon } from 'antd';
import styles from './Filter.scss';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  componentDidMount() {
    const $ = global.$;
    const inp = ReactDOM.findDOMNode(this.selectDom);
    $(inp).find('input').keydown(this.enterSearch);
    // $('input.ant-select-search__field').keydown = this.enterSearch;
  }
  handleChange = (value) => {
    this.setState({ value });
    const { onChange } = this.props;
    onChange(value);
  }
  // 搜索点击事件
  handleSearch = () => {
    const { onSearch } = this.props;
    onSearch(this.state.value);
  }
  // 清除点击事件
  // handleClear = () => {
  //   this.setState({ value: '' });
  // }
  enterSearch = (event) => {
    if (event.keyCode === 13) {
      // 处理回车选中下拉项中的某一值触发搜索的问题
      setTimeout(() => {
        this.handleSearch();
      }, 50);
    }
  }
  render() {
    const { className, style, optionDom, ...args } = this.props;
    delete args.onSearch;

    // $('input.ant-select-search__field').keydown = this.enterSearch;
    return (
      <div className={`${styles.wrapper} ${className}`} style={style} id="_filter">
        <Select
          ref={ref => (this.selectDom = ref)}
          mode="combobox"
          value={this.state.value}
          filterOption={false}
          defaultActiveFirstOption={false}
          allowClear
          getPopupContainer={() => document.getElementById('_filter')}
          {...args}
          onChange={this.handleChange}
          onkeydown={this.enterSearch}
        >
          {optionDom}
        </Select>
        <Icon type="search" className={styles.searchStyle} onClick={this.handleSearch} />
        {/* <Icon type="close-circle" className={styles.clearStyle} onClick={this.handleClear} /> */}
      </div>
    );
  }
}
Filter.Option = Select.Option;
export default Filter;
