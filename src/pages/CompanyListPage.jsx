import { Container, Typography } from '@mui/material';
import Companies from '../components/CompaniesList';
import { useTranslation } from 'react-i18next';

const CompanyListPage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        {t('companyListPage.title')}
      </Typography>
      <Typography
        variant="h6"
        sx={{ marginBottom: '2rem', textAlign: 'center' }}
      >
        {t('companyListPage.description')}
      </Typography>
      <Companies />
    </Container>
  );
};

export default CompanyListPage;
