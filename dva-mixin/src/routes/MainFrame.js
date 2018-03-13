import Root from '@components/MainLayout/Root';
import React, { Component } from 'react';
import { connect } from 'dva';
import { Layout, Row, Col } from 'antd';
// import {getTitle} from '@util/base';
// sub component
import Logo from '@components/Logo/Logo';
import Nav from '@components/Nav/Nav';

// import UserAvator from '@components/headerSuit/Avator';
// import UserCenter from '@components/headerSuit/UserCenter';
// import { ForceConfirm } from '@com';

// css
import styles from './MainFrame.scss';

const { Sider: SiderComponent, Content, Header } = Layout;

const Sider = connect(
  ({ base: { windowSizeType }, vMainFrame: { isFullScreen } }) => ({
    width: isFullScreen === false ? windowSizeType === '1920' ? 280 : 240 : 0,
    collapsedWidth: isFullScreen === false ? 40 : 0,
  }),
  undefined,
  (stateProps, _, ownProps) => Object.assign({}, stateProps, ownProps),
)(SiderComponent);
// Sider.__ANT_LAYOUT_SIDER = true;

class MainFrame extends Component {
  state = {
    collapsed: false,
    childKey: new Date().getTime(),
  }
  componentWillMount = () => {}
  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({ type: 'vMainFrame/unmount' });
  }
  onCollapse = collapsed => this.setState({ collapsed })
  // parseDom = arg => ({ __html: arg });
  logoutHandler = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'login/logout' });
  }
  // facilitatorChange = (value) => {
  //   const { dispatch } = this.props;
  //   dispatch({ type: 'base/updateCurrentFacilitator', payload: value });
  // }
  stationChange = (value) => {
    // 通过localstorage传递id，然后刷新
    localStorage.curStationId = value;
    const iframeDom = document.querySelector('#ssdtIframe');
    if (iframeDom && iframeDom.contentWindow) {
      iframeDom.contentWindow.location.reload();
    }
    return () => {
      const { dispatch } = this.props;
      dispatch({ type: 'base/updateCurrentStation', payload: value });
      this.refreshChildKey();
    };
  }
  refreshChildKey = () => this.setState({ childKey: new Date().getTime() })
  // componentWillReceiveProps(nextProps){
  //   let {location:{pathname, query}} = nextProps;
  //   if((this.props.location.query.viewurl != nextProps.location.query.viewurl) || (this.props.location.pathname != nextProps.location.pathname)){
  //     // console.log('/* wumi log on 2017-08-16 14:30:11', pathname, query);
  //     window.document.title = getTitle(pathname,query.viewurl);
  //   }
  // }
  // componentDidMount(){
  //   let {location:{pathname, query}} = this.props;
  //   window.document.title = getTitle(pathname,query.viewurl);
  // }

  render() {
    const {
      location,
      children,
    } = this.props;

    const sourceNavConfig = [
      {
        title: '组件demo',
        dom: (
          <span>
            <svg className={`icon ${styles.navIcon}`} style={{ fontSize: '16px', left: '29px' }}>
              <use className={styles.iconActive} xlinkHref="#icon-jiancedating" />
            </svg>
            组件demo
          </span>
        ),
        link: '/#/component_dev',
        afterClick: this.refreshChildKey,
      }, {
        // title: '',
        title: '分组A',
        dom: (
          <span>
            <svg className={`icon ${styles.navIcon}`} style={{ fontSize: '16px', left: '29px' }}>
              <use className={styles.iconActive} xlinkHref="#icon-tongjifenxi" />
            </svg>
            分组A
        </span>
        ),
        children: [{
          link: '/demo1',
          title: 'demo1',
          dom: (
            <span>
              demo1
            </span>),
          afterClick: this.refreshChildKey,
        }, {
          link: '/demo2',
          title: 'demo2',
          dom: (
            <span>
              {/* <svg className={`icon ${styles.navIcon}`} style={{ fontSize: '18px', left: '10px' }}>
                <use className={styles.iconGl1} xlinkHref="#icon-gl1" />
                <use className={styles.iconGl} xlinkHref="#icon-gl" />
              </svg> */}
              demo2
            </span>),
          afterClick: this.refreshChildKey,
        },{
          link: '/xuchao',
          title: '徐超',
          dom: (
            <span>
            
              老杨
            </span>),
          afterClick: this.refreshChildKey,
        }],
      }];
    
    const navConfig = sourceNavConfig;

    return (
      <div className={styles.wapper}>
        <Root checker={'base/checkLogin'} checkerObj={'user'} location={location}>
          <Layout>
            <Sider
              collapsible
              collapsed={this.state.collapsed}
              onCollapse={this.onCollapse}
              className={styles.slider}
            >

              <Logo collapsed={this.state.collapsed} />

              <Nav
                location={location}
                className={styles.nav}
                collapsed={this.state.collapsed}
                navConfig={navConfig}
              />

            </Sider>

            <Layout className={styles.section}>

              <Header className={styles.header}>
                <Row type="flex" justify="space-between" align="middle" style={{ height: '100%' }}>
                  <Col>
                    <Row type="flex" justify="end">
                      <Col style={{ height: 26 }} />
                    </Row>
                  </Col>
                  <Col className={styles.right} />
                </Row>
              </Header>
              <Content key={new Date().getTime()} className={styles.content}>{children}</Content>
              {/* <Content className={styles.content}>{children}</Content>*/}

            </Layout>
          </Layout>
        </Root>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  // const { currentFacilitator, currentStation, account } = stateProps;
  // const { dispatch } = dispatchProps;
  return Object.assign({}, stateProps, dispatchProps, ownProps, {
    isReady: () => true,
  });
}

export default connect(mapStateToProps, undefined, mergeProps)(MainFrame);
