import React from 'react';
import styles from './RegisterPage.module.scss';
import RegisterForm from '../../features/Auth/RegisterForm/RegisterForm';
import Layout from '../../features/Layout/Layout';
import Button from '../../features/controls/button/Button';
import Block from '../../features/Layout/Block/Block';

export default function RegisterPage() {
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
