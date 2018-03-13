import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Popover, Tabs, Input, Row, Col } from 'antd';
import * as storageService from '@services/storage';
import styles from './StationPicker.scss';

const TabPane = Tabs.TabPane;
const Search = Input.Search;
const tabsConfig = [{
  key: '1',
  tab: '接入准备',
}, {
  key: '2',
  tab: '现场安装',
}, {
  key: '3',
  tab: '试运行',
}, {
  key: '4',
  tab: '运行',
}, {
  key: '5',
  tab: '停运',
}];
// 替换所有字符串
const replaceAll = (sStr, str, repStr) => {
  const pattern = new RegExp(str, 'g');
  return sStr.replace(pattern, repStr);
};
const tabPaneTempate = (stationList, keyVal, handler) => tabsConfig.map(({ key, tab }, idx) => {
  return (<TabPane key={idx} tab={tab}>
    <Row type="flex">
      {stationList
        .filter(
        station => station.projectAccessStage === key && station.shortName.indexOf(replaceAll(keyVal, ' ', '')) !== -1,
      )
        .map(station => (
          <Col
            title={station.name}
            key={station.id}
            className={styles.colStation}
            span={6}
          >
            <span
              className={styles.stationLink}
              onClick={handler(station.id)}
            >
              {station.shortName}
            </span>
          </Col>))
      }
    </Row>
  </TabPane>);
});

class StationPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyVal: '',
      visible: false,
    };
  }
  componentDidMount() {
    global.document.addEventListener('mousedown', this.onDocumentClick);
  }
  componentWillUnmount() {
    global.document.removeEventListener('mousedown', this.onDocumentClick);
  }
  onDocumentClick = () => this.setState({ visible: false })
  keyInput = e => this.setState({ keyVal: e.target.value })

  handleInputFocus = (e) => {
    // console.log(e);
    const { user } = this.props;
    zhuge.track("站点选择-搜索", {
      name: user.employeeName,
      '账号': user.user,
      accountId: user.accountId,
      employeeId: user.employeeId
    });
  }

  handleTabClick = (e) => {
    // console.log('/* wumi log on 2017-08-21 11:18:32', tabsConfig[e].tab);
    const { user } = this.props;
    zhuge.track("站点选择-阶段选择", {
      '阶段名称': tabsConfig[e].tab,
      name: user.employeeName,
      '账号': user.user,
      accountId: user.accountId,
      employeeId: user.employeeId
    });
  }

  render() {
    const { onStationChange, className = '', datasource: stations, currentStationId } = this.props;
    const localStorageStation = storageService.get('curStationId');
    const currentStation = (localStorageStation ? stations.byId[localStorageStation] : stations.byId[currentStationId]) || {};
    // console.log('wumi log', currentStation);
    const PopContainer = (
      <div
        className={styles.popContent}
        onMouseDown={e => e.nativeEvent.stopImmediatePropagation()}
      >
        <Search
          ref={(input) => {
            // console.log('/* wumi log on 2017-08-21 10:56:23', input);
            if (input) {
              this.stationSearch = input.input.refs.input;
            }
          }}
          placeholder="搜索用电客户简称"
          onChange={this.keyInput}
          className={styles.search}
        />
        <div className={styles.tabContainer}>
          <Tabs
            type="card"
            onTabClick={this.handleTabClick}
          >
            {tabPaneTempate(
              stations.list,
              this.state.keyVal,
              id => (e) => {
                // e.nativeEvent.stopImmediatePropagation();
                this.setState({ visible: false });
                onStationChange(id)(e);
              },
            )}
          </Tabs>
        </div>
        {/* 常用企业 */}
      </div>
    );
    return (
      <div className={`${styles.normal} ${className}`}>
        <Popover
          overlayClassName={styles.popContainer}
          placement="bottomLeft"
          content={PopContainer}
          onVisibleChange={(visible) => {
            this.setState({
              visible,
            });
            const input = this.stationSearch;
            if (visible) {
              const { user } = this.props;
              zhuge.track("站点选择-hover", {
                name: user.employeeName,
                '账号': user.user,
                accountId: user.accountId,
                employeeId: user.employeeId
              });
              // console.log('/* wumi log on 2017-08-21 10:33:58', input);
              input.addEventListener('focus', this.handleInputFocus, false);
            } else {
              input.removeEventListener('focus', this.handleInputFocus);
            }
          }}
          trigger="hover"
          visible={this.state.visible}
        >
          <Button onClick={() => this.setState({ visible: true })}><span className="fa fa-th" />{currentStation.shortName || ''}</Button>
        </Popover>
      </div>
    );
  }
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps)(StationPicker);
