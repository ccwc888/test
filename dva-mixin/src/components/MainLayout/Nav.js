import React, { Component } from 'react';
import { Link } from 'dva/router';
import { Menu } from 'antd';
import styles from './Nav.scss';

const { Item: MenuItem, SubMenu } = Menu;


const NavIcon = ({ className = '' }) => (<i className={`${styles.navIcon} ${className}`} />);
const NavText = ({ title = '' }) => (<span className={styles.nav_text}>{title}</span>);
const IconCircle = () => (<NavIcon className={styles.iconCircle} />);

const navConfig = [
  {
    title: '监测概览',
    iconClass: styles.jcgl,
    children: [{
      link: 'watcher',
      title: 'watcher',
    }, {
      link: 'QueryTool',
      title: 'QueryTool',
    }], /*,{ freeStyle: (<MenuItem>第二层自定义样式</MenuItem>) }*/
  }, {
    title: '在线监测',
    iconClass: styles.qygk,
    children: [{
      link: 'Topo',
      title: 'Topo',
    }, {
      link: 'StableBar',
      title: 'StableBar',
    }, {
      link: 'distributionMonitoring',
      title: '配单监控',
    }],
  }, /*{ freeStyle: (<MenuItem>第一层自定义样式</MenuItem>) },*/
];

// TODO: freeStyle模式缺少key
const list = (() => {
  const arr = [];
  navConfig.forEach(({ freeStyle, link, title = '', children = [], iconClass = '' }, idx) => {
    // 优先使用freeStyle属性
    if (freeStyle) {
      arr.push(freeStyle);
      return;
    }

    if (link) { // 若提供了link则认为是跳转导航
      // 需要提供link, title, iconClass

      arr.push(<MenuItem key={idx}>
        <Link title={title} to={`/${link}`}>
          <NavIcon className={iconClass} />
          <NavText title={title} />
        </Link>
      </MenuItem>);
    } else { // 若没有提供link则认为是展开导航
      // 需要提供不为空的children列表,title, iconClass
      arr.push(
        <SubMenu
          key={idx}
          title={<span title={title}><NavIcon className={iconClass} /><span>{title}</span></span>}
        >
          {children.map(({ link: lk, title: tt, freeStyle: fs }) => {
            if (fs) {
              return fs;
            }

            return (
              <MenuItem key={lk}>
                <Link title={tt} to={`/${lk}`}>
                  <IconCircle />
                  <NavText title={tt} />
                </Link>
              </MenuItem>
            );
          })}
        </SubMenu>);
    }
  });
  return arr;
})();

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
      openKeys: ['0'],
    };
  }
  onOpenChange = (openKeys) => {
    this.setState({ openKeys: [openKeys.pop()] });
  }
  render() {
    return (
      // selectedKeys={[location.pathname]}
      <div className={`${styles.normal} ${this.props.className || ''}`}>
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          selectedKeys={[global.window.location.hash.substr(2)]}
          theme="dark"
          onOpenChange={this.onOpenChange}
          defaultSelectedKeys={['3']}
        >
          {list}
        </Menu>
      </div>

    );
  }

}

export default Nav;
