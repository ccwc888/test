import React from 'react';
import LoginComponent from '@components/Login/Login';
import styles from './index.scss';

function Login() {
  return (
    <div className={styles.normal}>
      <LoginComponent />
    </div>
  );
}

export default Login;
