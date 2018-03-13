import React, { Component } from 'react';
import { Layout } from 'antd';

// import styles from './MainLayout.css';
import styles from './MainLayout.scss';
import ContentHeader from './ContentHeader';
import Nav from './Nav';

const { Sider, Content } = Layout;


function Logo() {
  return (
    <div className={styles.logo} />
  );
}

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  render() {
    const { children, user, alarmStat } = this.props;
    return (
      <div className={styles.normal}>
        <Layout>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
            width={210}
            collapsedWidth={40}
          >
            <Logo />
            <Nav className={styles.nav} collapsed={this.state.collapsed} />
          </Sider>
          <Content>
            <ContentHeader user={user} alarmStat={alarmStat} />
            <Content>
              {children}
            </Content>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default MainLayout;
