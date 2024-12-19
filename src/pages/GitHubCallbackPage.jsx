import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import ROUTES from '../utils/routes';
import AuthService from '../services/auth.service';
import { toast } from 'react-toastify';

const GitHubCallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
        try {
          await AuthService.handleGitHubCallback(code);
          navigate(ROUTES.HOME);
        } catch (error) {
          toast.error('Failed to authenticate with GitHub:', error);
          navigate(ROUTES.LOGIN);
        }
      } else {
        toast.error('No authorization code found in URL');
        navigate('/login');
      }
    };

    fetchAccessToken();
  }, [navigate]);

  return <Loading />;
};

export default GitHubCallbackPage;
