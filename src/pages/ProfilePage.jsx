import { useParams } from 'react-router-dom';
import { users } from './MockedData';
import {
  Avatar,
  Box,
  Button,
  CardContent,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const ProfilePage = () => {
  const { userId } = useParams();
  const { t } = useTranslation();
  const user = users.find(u => u.id === parseInt(userId));

  if (!user) {
    return (
      <Container maxWidth="md" style={{ marginTop: '2rem' }}>
        <Typography variant="h5" color="error" sx={{ textAlign: 'center' }}>
          {t('usersListPage.notFound')}
        </Typography>
      </Container>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Paper sx={{ width: 400 }}>
        <CardContent>
          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item>
              <Avatar
                src={user.profilePicture}
                alt={user.name}
                sx={{ width: 100, height: 100 }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h5">{user.name}</Typography>
            </Grid>
            <Grid item>
              <Typography color="text.secondary">{user.email}</Typography>
            </Grid>
            <Grid item>
              <Typography>{user.bio}</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary">
                {t('userProfilePage.editProfile')}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
