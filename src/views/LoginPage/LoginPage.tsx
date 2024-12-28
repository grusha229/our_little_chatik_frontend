import React from 'react';
import styles from './LoginPage.module.scss';
import LoginForm from '../../features/Auth/LoginForm/LoginForm';

export default function LoginPage() {
  return (
    <div className={styles['page-container']}>
      <div className={styles['block']}>
        <h1>Добро пожаловать!</h1>
        <LoginForm/>
      </div>
    </div>
  )
}
