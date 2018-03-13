import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Layout, Icon, Popover, Button } from 'antd';
// import styles from './ContentHeader.css';
import styles from './ContentHeader.scss';
import defaultRoleImg from './img/default_role.png';

const { Header } = Layout;
// const MenuItem = Menu.Item;

function UserAvator({ user: { companyName: name, logo }, className = '' }) {
  return (
    <div className={`${styles.userAvator} ${className}`}>
      <a>
        <img src={logo || defaultRoleImg} alt="" />
      </a>
      <div>{name}</div>
    </div>
  );
}

function Alarm({ alarmStat = [], className = '' }) {
  const { danger, prewarn, warn } = alarmStat
    .reduce((obj, { dangerCount, prewarnCount, warnCount }) => {
      const sum = obj;
      sum.danger += +dangerCount;
      sum.prewarn += +prewarnCount;
      sum.warn += +warnCount;
      return sum;
    }, { danger: 0, prewarn: 0, warn: 0 });
  const AlarmPopup = (
    <div>
      <p>严重 : <span className="sys-num-font">{danger}</span></p>
      <p>一般 : <span className="sys-num-font">{warn}</span></p>
      <p>预警 : <span className="sys-num-font">{prewarn}</span></p>
      <p><Link to="/">预告警概览</Link></p>
    </div>
  );
  const sumAlarm = danger + warn + prewarn;
  return (
    <div className={`${styles.alarm} ${className}`}>
      <Popover overlayClassName={styles['alarm-popup']} content={AlarmPopup} placement="bottomRight">
        <div className={styles.alarmText}>告警<span className="sys-num-font">{sumAlarm > 99 ? '99+' : sumAlarm}</span></div>
      </Popover>
    </div>
  );
}
// Alarm = connect(({ alarmStat }) => ({ alarmStat }))(Alarm);


function UserCenterD({ user: { user: name }, className = '', dispatch }) {
  const logout = () => dispatch({ type: 'login/logout' });
  const menu = (
    <div>
      <p><Button onClick={logout}>注销</Button></p>
    </div>
  );
  return (
    <div className={`${styles.userCenter} ${className}`}>
      <Popover content={menu} placement="bottomRight" trigger={['click']}>
        <div>{name}<Icon type="down" /></div>
      </Popover>
    </div>);
}

const UserCenter = connect()(UserCenterD);

function ContentHeader({ user, alarmStat }) {
  return (
    <Header className={styles.normal}>
      <UserAvator user={user} className={styles['header-left']} />
      <div className={styles['header-right']}>
        <Alarm alarmStat={alarmStat} />
        <UserCenter user={user} />
      </div>
    </Header>
  );
}


export default ContentHeader;
