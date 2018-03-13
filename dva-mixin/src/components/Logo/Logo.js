import React from 'react';
import { connect } from 'dva';
import styles from './Logo.scss';

function Logo({ user, collapsed = false }) {
  let logo = styles.logo;
  let shortLogo = styles.collapsed;
  if (user.customerId === 'CompanyService:1512525694582' ||
  user.companyCode === '101089b6d1a1e365' ||
  user.serviceProvidorId === 'CompanyService:1512525694582' ||
  user.serviceProviderCode === '101089b6d1a1e365') {
    logo = styles.hap;
    shortLogo = styles.hapCollapsed;
  }
  return (
    <div className={`${logo} ${collapsed ? shortLogo : ''}`} />
  );
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

export default connect(mapStateToProps)(Logo);
