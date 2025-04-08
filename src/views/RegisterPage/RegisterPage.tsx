import React from 'react';
import styles from './RegisterPage.module.scss';
import RegisterForm from '@app/features/Auth/RegisterForm/RegisterForm';
import Layout from '@app/features/Layout/Layout';
import Button from '@app/ui/Button/Button';
import Block from '@app/features/Layout/Block/Block';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@app/store/hooks';

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
