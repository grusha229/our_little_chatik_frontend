import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthenticationContext';

const PrivateRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Если пользователь не аутентифицирован, перенаправляем на страницу логина
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Если аутентифицирован, рендерим вложенные маршруты
  return <Outlet />;
};

export default PrivateRoute;
