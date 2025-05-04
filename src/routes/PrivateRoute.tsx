import Cookies from 'js-cookie';
import { useMemo } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const token = useMemo(() => Cookies.get('token'), []);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;