import { useDispatch } from 'react-redux';
import { login, logout } from '../store/auth/auth.slice';
import { useEffect } from 'react';
import AuthService from '../services/auth.service';
import TokenService from '../services/token.service';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../utils/routes';

const useTokenRefresh = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokens = TokenService.getTokens();

  useEffect(() => {
    if (tokens) {
      const interval = setInterval(async () => {
        try {
          const newToken = await AuthService.updateToken();
          if (newToken) {
            dispatch(login({ token: newToken }));
          } else {
            dispatch(logout());
            clearInterval(interval);
            navigate(ROUTES.LOGIN);
          }
        } catch (err) {
          dispatch(logout());
          clearInterval(interval);
        }
      }, 5 * 60 * 1000);
  
      return () => clearInterval(interval);
    }
  }, [tokens, dispatch, navigate]);
};

export default useTokenRefresh;
