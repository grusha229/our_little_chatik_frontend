import React from 'react';
import styles from './LoginPage.module.scss';
import LoginForm from '../../features/Auth/LoginForm/LoginForm';
import Layout from '../../features/Layout/Layout';
import Block from '../../features/Layout/Block/Block';
import Button from '../../features/controls/button/Button';

export default function LoginPage() {
  return (
    <Layout>
      <Block>
        <h2>Welcome!</h2>
        <div>Login to your account</div>
      </Block>
      <Block
        className={styles['block']}
        width={500}
      >
        <LoginForm/>
      </Block>
      <Block
        width={500}
      >
        <Button href='/register'>Register</Button>
      </Block>
    </Layout>
  )
}
