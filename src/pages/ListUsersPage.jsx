import { Box, Container, Pagination, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import UserCard from '../components/UserCard';
import { selectCount, selectLoading, selectUsers } from '../store/users/users.selectors';
import { fetchUsers } from '../store/users/users.actions';

const ListUsersPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const count = useSelector(selectCount);
  const [page, setPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, [dispatch, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading) {
    return <Loading />;
  }
  

  return (
    <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
        {t('usersListPage.title')}
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '2rem', textAlign: 'center' }}>
        {t('usersListPage.description')}
      </Typography>
      {users.results.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
        <Pagination
          count={Math.ceil(count / usersPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default ListUsersPage;
