import React from 'react';
import styles from './Avator.scss';
// assets
import defaultRoleImg from './img/default_role.png';

function Avator({ name, logo, className = '' }) {
  // TODO magic code. 之后整理 state.user.logo 的关系
  let userLogo = localStorage.userLogo;
  if (userLogo === 'null' || userLogo === 'undefined') {
    userLogo = null;
  }
  return (
    <div className={`${styles.normal} ${className}`}>
      <a>
        <img src={userLogo || defaultRoleImg} alt="" />
      </a>
      <div>{name}</div>
    </div>
  );
}

export default Avator;
