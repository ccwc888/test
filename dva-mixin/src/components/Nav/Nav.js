import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Menu } from 'antd';
import * as storageService from '@services/storage';
import styles from './Nav.scss';

const reInjectAllStoageFromCache = () => {
  const cache = storageService.cache();
  Object.keys(cache).forEach(key => storageService.set(key, cache[key]));
};

const { Item: MenuItem, SubMenu } = Menu;

const optToMenu = (menuObjLst = []) => {
  const mapSlctKeyToOpenKey = {};
  const routesHashSelectedKey = {};
  const constArr = [];
  const list = menuObjLst.filter(obj => !obj.isHide).map(({ key: iKey, link, title = '', dom = '', children, type, ...args }, idx) => {
    const key = iKey || link;
    if (type === 'blank') {
      return (
        <MenuItem title={title} key={key}>
          {/* <a className={styles.blank} href={link} target="_blank">{dom}</a> */}
          <a
            className={styles.blank}
            onClick={() => {
              reInjectAllStoageFromCache();
              global.window.open(link);
            }}
          >{dom}</a>
        </MenuItem>
      );
    }
    if (link) {
      mapSlctKeyToOpenKey[key] = constArr;
      return linkMenu({ key, link, title, dom, ...args });
    } else {
      children.forEach((item) => {
        if (Array.isArray(item.routes)) {
          const key = item.key || item.link;
          routesHashSelectedKey[key] = item.routes;
        }
      });
      return (
        <SubMenu
          key={idx}
          title={dom}
        >
          {children.filter(obj => !obj.isHide).map((opt) => {
            const ckey = opt.key || opt.link;
            mapSlctKeyToOpenKey[ckey] = [`${idx}`];
            return linkMenu({ ...opt, key: ckey });
          })}
        </SubMenu>
      );
    }
  });
  return {
    list,
    mapSlctKeyToOpenKey,
    routesHashSelectedKey,
    // openKeys,
  };
};

// 生成菜单
const linkMenu = ({ key, link, title, dom, afterClick = () => {} }) => (
  <MenuItem title={title} key={key}>
    {
      typeof link === 'function' ?
        <a onClick={link}>{dom}</a> :
        <Link to={link} onClick={afterClick}>{dom}</Link>
    }
  </MenuItem>
);

class Nav extends Component {
  constructor(props) {
    super(props);

    const { menuList, initOpenKeys, currentPath } = this.getNavConfigFromProp(props);
    this.state = ({
      menuList,
      openKeys: initOpenKeys,
      currentPath,
    });
  }
  componentWillReceiveProps(nextProps) {
    const { menuList, initOpenKeys, currentPath } = this.getNavConfigFromProp(nextProps);
    this.setState({
      menuList,
      openKeys: initOpenKeys,
      currentPath,
    });
  }

  // 点击菜单埋点
  handleMenuOnClick = (obj) => {
    const user = this.props.user;
    // console.log('/* wumi log on 2017-08-16 15:53:07', user);
    zhuge.track('点击菜单', {
      '菜单名称': obj.item.props.title,
      name: user.employeeName,
      '账号': user.user,
      accountId: user.accountId,
      employeeId: user.employeeId,
    })
  }

  // 点击一级菜单埋点
  onOpenChange = (openKeys) => {
    this.setState({ openKeys: openKeys.length > 0 ? [openKeys.pop()] : [] }, () => {
      const openKey = this.state.openKeys[0];
      if (!!openKey) {
        const { navConfig = [], user } = this.props;
        const title = navConfig.filter(obj => !obj.isHide)[openKey].title;
        // console.log('/* wumi log on 2017-08-16 16:09:49', openKey, navConfig.filter(obj => !obj.isHide)[openKey]);
        zhuge.track('一级菜单展开', {
          '一级菜单名称': title,
          name: user.employeeName,
          '账号': user.user,
          accountId: user.accountId,
          employeeId: user.employeeId,
        });
      }
    });
  }
  getNavConfigFromProp = (props) => {
    const { location: { pathname, search }, navConfig = [] } = props;

    const { list: navList, mapSlctKeyToOpenKey, routesHashSelectedKey } = optToMenu(navConfig);

    const matchSlctKeys = (path) => {
      for (const key in mapSlctKeyToOpenKey) {
        if (
          path.indexOf(key) === 0 ||
          (
            Array.isArray(routesHashSelectedKey[key]) &&
            routesHashSelectedKey[key].some(item => path.indexOf(item) === 0)
          )
        ) {
          return { key, val: mapSlctKeyToOpenKey[key] };
        }
      }
      return { key: '', val: [] };
    };

    // const currentPath = `/${pathname.split('/')[1]}`;
    const { val: initOpenKeys, key: currentPath } = matchSlctKeys(`${pathname}${search}`);

    return {
      menuList: navList,
      initOpenKeys,
      currentPath,
    };
  }
  render() {
    return (
      <div className={`${styles.normal} ${this.props.className || ''}`}>
        <Menu
          mode="inline"
          openKeys={this.state.openKeys}
          selectedKeys={[this.state.currentPath]}
          theme="dark"
          onOpenChange={this.onOpenChange}
          defaultSelectedKeys={['0']}
          inlineIndent={0}
          onClick={this.handleMenuOnClick}
        >
          {this.state.menuList}
        </Menu>
      </div>

    );
  }

}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps)(Nav);
