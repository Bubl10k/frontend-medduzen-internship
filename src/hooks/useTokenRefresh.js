import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectAuthToken } from '../store/auth/auth.slice';
import { useEffect } from 'react';
import AuthService from '../services/auth.service';

const useTokenRefresh = () => {
  const dispatch = useDispatch();
  const tokens = useSelector(selectAuthToken);

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
          }
        } catch (err) {
          dispatch(logout());
          clearInterval(interval);
        }
      }, 5 * 60 * 1000);
  
      return () => clearInterval(interval);
    }
  }, [tokens, dispatch]);
};

export default useTokenRefresh;
