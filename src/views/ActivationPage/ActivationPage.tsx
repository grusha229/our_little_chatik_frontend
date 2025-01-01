import React from 'react';
import styles from './ActivationPage.module.scss';
import Layout from '../../features/Layout/Layout';
import Block from '../../features/Layout/Block/Block';
import { RootState, useAppSelector } from '../../store/store';
import { Navigate } from 'react-router-dom';
import ActivationForm from '../../features/Auth/ActivationForm/ActivationForm';
// import ActivationForm from '../../features/Auth/ActivationForm/ActivationForm';

export default function ActivationPage() {
    const token = useAppSelector((state) => state.auth.token);
    const refresh_token = useAppSelector((state) => state.auth.refresh_token);
    const activated_email = useAppSelector<RootState>((state) => state.auth.activated_email);

    if ((!token && !refresh_token)) {
      return <Navigate to="/login" replace />;
    }

    return (
      <Layout>
        <Block>
          <h2>Activation</h2>
          <div>Activate your account</div>
          <div>Code was sent to {activated_email}</div>
        </Block>
        <Block
          className={styles['block']}
          width={500}
        >
          <ActivationForm />
        </Block>
      </Layout>
    )
}
