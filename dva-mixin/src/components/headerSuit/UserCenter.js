// import { connect } from 'dva';
// sub component
import { Popover, Icon } from 'antd';
import { Button } from '@com';
import { Link } from 'dva/router';
import React from 'react';
import styles from './UserCenter.scss';

function UserCenter({ user: name, className = '', logout: logoutHandler = () => { }, links = [] }) {
  const menu = (
    <div>
      {links
        .filter(({ isHide }) => !isHide)
        .map(({ link, title, dom, type }, idx) => {
          if (type === 'blank') return (<a key={idx} className={styles.link} href={link} title={title} rel="noopener noreferrer" target="_blank">{dom}</a>);
          else return (<Link key={idx} className={styles.link} to={link} title={title}>{dom}</Link>);
        })
      }
      <div className={styles.lastItem}><Button className={styles.button} type="link" level="danger" value="注销" onClick={logoutHandler} /></div>
    </div>
  );
  return (
    <div className={`${styles.userCenter} ${className}`}>
      <Popover
        content={menu}
        placement="bottom"
        trigger={['click']}
        popupAlign={{
          offset: [0, -18],
        }}
        overlayClassName={styles.popContainer}
      >
        <div>
          {name}
          <svg className={`icon ${styles.icon}`}>
            <use className={styles.iconActive} xlinkHref="#icon-sanjiaoxing1" />
          </svg>
        </div>
      </Popover>
    </div>
  );
}


export default UserCenter;
