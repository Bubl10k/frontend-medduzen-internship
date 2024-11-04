import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import { useTranslation } from 'react-i18next';

const RegistrationPage = () => {
  const [userCredentials, setUserCredentials] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserCredentials(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});
    if (userCredentials.password !== userCredentials.password2) {
      setErrors({ password2: t('registrationPage.passwordsDoNotMatch') });
      return;
    }
    try {
      await AuthService.register(userCredentials);
      navigate('/');
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setErrors(err.response.data);
      } else {
        setErrors({ general: t('registrationPage.generalError') });
      }
    }
  };

  const handleGitHubLogin = () => {
    
  };

  return (
    <Box
      sx={{
        width: '50%',
        margin: '0 auto',
        marginTop: '3rem',
      }}
    >
      <Card sx={{ minWidth: 300 }}>
        <CardHeader
          sx={{ textAlign: 'center' }}
          title={t('registrationPage.title')}
          subheader={t('registrationPage.subtitle')}
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
            {t('registrationPage.loginViaGitHub')}
          </Button>
          <Divider sx={{ my: 2 }}>
            <Typography variant="body1">{t('registrationPage.or')}</Typography>
          </Divider>
          <form onSubmit={handleSubmit}>
          <TextField
              label={t('registrationPage.username')}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              name="username"
              value={userCredentials.username}
              onChange={handleInputChange}
              error={!!errors.username}
              helperText={errors.username}
            />
            <TextField
              label={t('registrationPage.email')}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              type="email"
              name="email"
              value={userCredentials.email}
              onChange={handleInputChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              label={t('registrationPage.password')}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              type="password"
              name="password"
              value={userCredentials.password}
              onChange={handleInputChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <TextField
              label={t('registrationPage.repeatPassword')}
              variant="outlined"
              fullWidth
              margin="normal"
              required
              type="password"
              name="password2"
              value={userCredentials.password2}
              onChange={handleInputChange}
              error={!!errors.password2}
              helperText={errors.password2}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              {t('registrationPage.register')}
            </Button>
          </form>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            sx={{ mt: 2 }}
          >
            {t('registrationPage.alreadyHaveAnAccount')}{' '}
            <Link
              to="/login"
              style={{ textDecoration: 'none', color: 'primary.main' }}
            >
              {t('registrationPage.login')}
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegistrationPage;
