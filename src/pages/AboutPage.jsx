import { Box, Card, CardContent, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const AboutPage = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
      }}
    >
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {t('aboutPage.title')}
          </Typography>
          <Typography variant="body1" paragraph>
            {t('aboutPage.description')}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AboutPage;