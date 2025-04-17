import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@app/store/hooks';
import Layout from '@app/widgets/Layout/Layout';

const PublicRoute = () => {
    const refresh_token = useAppSelector(state => state.auth.refresh_token);

    return !refresh_token ? (
        <Layout>
            <Outlet />
        </Layout>
    ) : (
        <Navigate to="/messages" replace />
    );
};

export default PublicRoute;
