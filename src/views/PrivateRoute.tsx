import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import Header from '../features/Header/Header';

const PrivateRoute = () => {
  const token = useAppSelector((state) => state.auth.token); // Получаем токен из authSlice

  if (!token) return <Navigate to="/login" replace />;

  return (
    <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    }}>
      <Header/>
      <Outlet />
    </div>
  )
};

export default PrivateRoute;
