import { Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const StartPage = () => {
  const { t } = useTranslation();

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
    </Container>
  );
};
  
export default StartPage;