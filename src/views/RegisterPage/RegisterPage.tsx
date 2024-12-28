import React from 'react';
import styles from './RegisterPage.module.scss';
import RegisterForm from '../../features/Auth/RegisterForm/RegisterForm';

export default function RegisterPage() {
  return (
    <div className={styles['page-container']}>
      <div className={styles['block']}>
        <h1>Добро пожаловать!</h1>
        <RegisterForm/>
      </div>
    </div>
  )
}
