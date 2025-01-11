import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/store';
import Header from '../features/Header/Header';

const PrivateRoute = () => {
  const token = useAppSelector((state) => state.auth.token);
  const connected = useAppSelector((state) => state.websocket.connected);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!connected) {
      dispatch({ type: 'websocket/connect', payload: 'ws://localhost/ws/events' });
    }

    return () => {
      dispatch({ type: 'websocket/disconnect' });
    };
  }, [connected, dispatch]);

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
