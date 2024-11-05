import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';

const GitHubCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');

    if (token) {
        AuthService.handleGitHubCallback(token);
      navigate('/');
    } else {
      navigate('/login');
    }

  }, [navigate, location])
};

export default GitHubCallback;
