import { Button, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import DisplayText from "../components/DisplayText";
import UpdateText from "../components/UpdateText";

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
      <DisplayText />
      <UpdateText />
    </Container>
  );
};
  
export default StartPage;