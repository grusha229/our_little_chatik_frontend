import React from 'react';
import styles from './RegisterPage.module.scss';
import RegisterForm from '../../features/Auth/RegisterForm/RegisterForm';
import Layout from '../../features/Layout/Layout';
import Button from '../../features/controls/Button/Button';
import Block from '../../features/Layout/Block/Block';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../store/store';

export default function RegisterPage() {
    const token = useAppSelector((state) => state.auth.token);
    const refresh_token = useAppSelector((state) => state.auth.refresh_token);
    
    if ((token && (!refresh_token || refresh_token === 'undefined'))) {
      return <Navigate to="/activation" replace />;
    }

  return (
    <Layout>
      <Block>
        <h2>Welcome!</h2>
        <div>Register your account</div>
      </Block>
      <Block
        className={styles['block']}
        width={500}
      >
        <RegisterForm/>
      </Block>
      <Block
        width={500}
      >
        <Button href='/login'>Login</Button>
      </Block>
    </Layout>
  )
}
