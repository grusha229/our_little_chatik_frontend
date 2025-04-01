import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/store';

const PublicRoute = () => {
  const refresh_token = useAppSelector((state) => state.auth.refresh_token);

  if (!refresh_token) {

    return <Navigate to="/login" replace />
  };
  return !refresh_token ? <Outlet /> : <Navigate to="/messages" replace />;
};

export default PublicRoute;
