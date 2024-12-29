import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/store';

const PublicRoute = () => {
  const token = useAppSelector((state) => state.auth.token); // Получаем токен из authSlice

  return !token ? <Outlet /> : <Navigate to="/messages" replace />;
};

export default PublicRoute;
