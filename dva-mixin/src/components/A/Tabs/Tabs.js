import React from 'react';
import { Tabs } from 'antd';
import styles from './Tabs.scss';

const TabPane = Tabs.TabPane;

class TabsComponent extends React.Component {
  constructor(props) {
    super(props);
    const { defaultActiveKey } = this.props;
    this.state = {
      activeKey: defaultActiveKey,
    };
  }
  render() {
    const { tabsList, defaultActiveKey, onTabClick, activeKey, className = '', ...resProps } = this.props;
    const tabPane = tabsList.map(item => (<TabPane tab={item.name} key={item.url} disabled={item.disabled} />));
    return (
      <div className={`${className} ${styles.tabsDiv}`}>
        <Tabs
          {...resProps}
          className={className}
          defaultActiveKey={defaultActiveKey}
          onTabClick={onTabClick}
          activeKey={activeKey}
        >
          {tabPane}
          {/* <TabPane tab="一次设备" key="1"></TabPane>
          <TabPane tab="二次设备" key="2"></TabPane>
          <TabPane tab="站点审核流程" key="3"></TabPane>
          <TabPane tab="Tab 4" key="4" disabled></TabPane>
          <TabPane tab="Tab 5" key="5"></TabPane>
          <TabPane tab="Tab 6" key="6"></TabPane>
          <TabPane tab="Tab 7" key="7"></TabPane>
          <TabPane tab="Tab 8" key="8"></TabPane>
          <TabPane tab="Tab 9" key="9"></TabPane>
          <TabPane tab="Tab 10" key="10"></TabPane>
          <TabPane tab="Tab 11" key="11"></TabPane>
          <TabPane tab="Tab 12" key="12"></TabPane>
          <TabPane tab="Tab 13" key="13"></TabPane>
          <TabPane tab="Tab 14" key="14"></TabPane>
          <TabPane tab="Tab 15" key="15"></TabPane> */}
        </Tabs>
      </div>
    );
  }
}

export default TabsComponent;
