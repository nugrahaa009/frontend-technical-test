import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { decodeToken } from './utils/jwt';
import { setUser } from './features/user/userSlice';
import { Routes, Route, Navigate } from 'react-router-dom';

import PublicRoute from './routes/PublicRoute';
import PrivateRoute from './routes/PrivateRoute';
import Login from './pages/Login';
import HomePage from './pages/Home';
import Todo from './pages/Todo';
import Main from './components/Main';

const App = () => {
  const dispatch = useDispatch();
  const token = Cookies.get('token');

  useEffect(() => {
    if (token) {
      const decode = decodeToken(token)
      dispatch(setUser({ email: decode.email, provider: decode.provider, name: decode.name }))
    }
  }, [])

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Main><HomePage /></Main>} />
        <Route path="/todo" element={<Main><Todo /></Main>} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App;