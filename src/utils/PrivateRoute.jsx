import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return !isAuthenticated ? <Navigate to='/login'/> : children;
};

export default PrivateRoute;
