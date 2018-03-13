// sub components
import { Popover } from 'antd';

import React from 'react';
import styles from './SysMsg.scss';

const ListItem = ({ data }) => (<li className={styles.listItem} title={data.content}>
  <h3>{data.title || '系统消息'}</h3>
  <p>{data.content}</p>
</li>);
const $ = global.$;
const maxLength = $(document).height() - 50;
const Empty = () => (<li className={styles.emptyItem}>暂无消息</li>);

function SysMsg({ dataList = [], className = '' }) {
  const count = dataList.length;
  const Popup = (
    <div className={styles.listContainer} style={{ maxHeight: maxLength }}>
      <ul className={styles.list}>
        {
          dataList.length !== 0 ?
            dataList.map(data => <ListItem data={data} />) :
            <Empty />
        }
      </ul>
    </div>
  );
  const alarmNumClass = count > 0 ? styles.wordAlarm : '';

  return (
    <div className={`${styles.sysMsg} ${className}`}>
      <Popover overlayClassName={styles['sysMsg-popup']} content={Popup} placement="bottom">
        <div className={styles.sysMsgText}>
          <svg className={`icon ${styles.sysMsgIcon}`}>
            <use xlinkHref="#icon-xx" />
          </svg>
          消息
          <span className={`sys-num-font ${alarmNumClass}`}>
            {count}
          </span>
        </div>
      </Popover>
    </div>
  );
}

export default SysMsg;
