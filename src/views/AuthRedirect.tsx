import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '@app/store/hooks';

const AuthRedirect = () => {
  const token = useAppSelector((state) => state.auth.token);

  return token ? <Navigate to="/messages" replace /> : <Navigate to="/login" replace />;
};

export default AuthRedirect;
