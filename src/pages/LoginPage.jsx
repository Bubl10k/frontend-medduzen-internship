import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setUserCredentials(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      await AuthService.login(userCredentials);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError(t('loginPage.invalidCredentials'));
      } else {
        setError(t('loginPage.generalError'));
      }
    }
  };

  const handleGitHubLogin = () => {
    AuthService.githubLogin();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: '2rem',
      }}
    >
      <Card sx={{ minWidth: 300 }}>
        <CardHeader
          sx={{ textAlign: 'center' }}
          title={t('loginPage.title')}
          subheader={t('loginPage.welcome')}
          titleTypographyProps={{ variant: 'h6' }}
        />
        <CardContent>
          <Button
            onClick={handleGitHubLogin}
            variant="contained"
            color="primary"
            startIcon={<GitHubIcon />}
            sx={{ mt: 2 }}
            fullWidth
          >
            {t('loginPage.loginWithGitHub')}
          </Button>
          <Divider sx={{ my: 2 }}>
            <Typography variant="body1">{t('loginPage.or')}</Typography>
          </Divider>
          <form onSubmit={handleSubmit}>
            <TextField
              label={t('loginPage.username')}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              name="username"
              value={userCredentials.username}
              onChange={handleInputChange}
              autoComplete="username"
              error={!!error}
              helperText={error && error.includes('username') ? error : ''}
            />
            <TextField
              label={t('loginPage.password')}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              name="password"
              value={userCredentials.password}
              onChange={handleInputChange}
              type="password"
              autoComplete="current-password"
              error={!!error}
              helperText={error && error.includes('password') ? error : ''}
            />
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={t('loginPage.rememberMe')}
              sx={{ mb: 2 }}
              name="rememberMe"
              checked={userCredentials.rememberMe}
              onChange={handleInputChange}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {t('loginPage.signIn')}
            </Button>
          </form>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 2 }}
          >
            {t('loginPage.registerPrompt')}{' '}
            <Link
              to="/register"
              style={{ textDecoration: 'none', color: 'primary.main' }}
            >
              {t('loginPage.register')}
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
