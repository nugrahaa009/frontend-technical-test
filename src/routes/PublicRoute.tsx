import Cookies from 'js-cookie';
import { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
  const token = useMemo(() => Cookies.get('token'), []);
  return !token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;