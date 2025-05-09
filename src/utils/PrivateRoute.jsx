import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ROUTES from './routes';


const PrivateRoute = ({ children, ...rest }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return !isAuthenticated ? <Navigate to={ROUTES.LOGIN}/> : children;
};

export default PrivateRoute;
