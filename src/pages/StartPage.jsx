import { Button, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DisplayText from '../components/DisplayText';
import UpdateText from '../components/UpdateText';
import { useEffect, useState } from 'react';
import healthCheck from '../services/healthcheck.service';
import useTokenRefresh from '../hooks/useTokenRefresh';


const StartPage = () => {
  useTokenRefresh();
  const { t } = useTranslation();
  const [status, setStatus] = useState(null);

  const checkBackend = async () => {
    try {
      const response = await healthCheck();
      if (response.status_code === 200) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    } catch (err) {
      console.log('Error checking backend health:', err);
      setStatus(false);
    }
  };

  useEffect(() => {
    checkBackend();
  }, []);

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h3" gutterBottom>
        {t('startPage.welcome')}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
        {t('startPage.description')}
      </Typography>
      <Button variant="contained" color="primary">
        {t('startPage.getStarted')}
      </Button>
      <DisplayText />
      <UpdateText />
      {status && (
        <Typography variant="body1" sx={{ marginTop: '2rem' }}>
          Backend is running
        </Typography>
      )}
    </Container>
  );
};

export default StartPage;
