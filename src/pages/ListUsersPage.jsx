import { Container, Typography } from '@mui/material';
import Users from '../components/UsersList';
import { users } from './MockedData';
import { useTranslation } from 'react-i18next';

const ListUsersPage = () => {
  const { t } = useTranslation();

  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        {t('usersListPage.title')}
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '2rem', textAlign: 'center' }}>
        {t('usersListPage.description')}
      </Typography>
      <Users users={users} />
    </Container>
  );
};

export default ListUsersPage;
