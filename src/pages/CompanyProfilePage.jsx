import { Avatar, Container, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { companies } from './MockedData';
import { t } from 'i18next';

const CompanyProfilePage = () => {
  const { companyId } = useParams();
  const company = companies.find(u => u.id === parseInt(companyId));

  if (!company) {
    return (
      <Container
        maxWidth="md"
        style={{ marginTop: '2rem', textAlign: 'center' }}
      >
        <Typography variant="h5" color="error">
          {t('companyListPage.notFound')}
        </Typography>
      </Container>
    );
  }
  return (
    <Paper
      sx={{
        padding: 4,
        maxWidth: 600,
        marginTop: '3rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        borderRadius: 2,
      }}
    >
      <Avatar
        src={company.logo}
        alt={company.name}
        sx={{ width: 120, height: 120, margin: '0 auto', marginBottom: 2 }}
      />
      <Typography variant="h4" gutterBottom>
        {company.name}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {company.description}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        <strong>Founded:</strong> {company.owner}
      </Typography>
    </Paper>
  );
};

export default CompanyProfilePage;
