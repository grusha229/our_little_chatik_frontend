import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@app/store/hooks';
import Header from '@app/features/Header/Header';
import styles from './PrivateRoute.module.scss';

const PrivateRoute = () => {
    const token = useAppSelector(state => state.auth.refresh_token);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (token) {
            dispatch({
                type: 'websocket/connect',
                payload: `ws://${window.location.hostname}/ws/events`,
            });
        }
    }, [token, dispatch]);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className={styles['container']}>
            <Header />
            <Outlet />
        </div>
    );
};

export default PrivateRoute;
