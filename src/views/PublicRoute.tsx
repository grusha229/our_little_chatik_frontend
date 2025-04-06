import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const PublicRoute = () => {
  const refresh_token = useAppSelector((state) => state.auth.refresh_token);
  
  return !refresh_token ? <Outlet /> : <Navigate to="/messages" replace />;
};

export default PublicRoute;
