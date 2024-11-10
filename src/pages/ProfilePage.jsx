import { useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  CardContent,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import useTokenRefresh from '../hooks/useTokenRefresh';
import { currentUser } from '../store/auth/auth.slice';
import UniversalModal from '../components/UniversalModal';
import { selectUserById } from '../store/users/users.selectors';
import {
  deleteUser,
  fetchUserById,
  updateUser,
} from '../store/users/users.actions';

const ProfilePage = () => {
  useTokenRefresh();
  const { userId } = useParams();
  const { t } = useTranslation();
  const user = useSelector(selectUserById);
  const dispatch = useDispatch();
  const error = useSelector(state => state.users.error);
  const currUser = useSelector(currentUser);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState({
    id: user?.id,
    username: user?.username,
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    image_path: user?.image_path,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUserById(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setUserData({
        id: user.id || '',
        username: user.username || '',
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        email: user.email || '',
        image_path: user.image_path || null,
      });
    }
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChange = e => {
    setUserData({ ...userData, image_path: e.target.files[0] });
  };

  const handleSave = async e => {
    e.preventDefault();
    const result = await dispatch(updateUser(userData));
    if (updateUser.rejected.match(result)) {
      return;
    }
    setIsEditMode(false);
  };

  const handleOpen = () => {
    dispatch(deleteUser(user.id));
    setOpen(false);
  };

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
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Box
          sx={{
            height: 150,
            backgroundColor: '#f3f3f3',
            position: 'relative',
            borderRadius: 2,
          }}
        >
          <Avatar
            src={user.image_path || '/path/to/default-avatar.jpg'}
            alt={user.username}
            sx={{
              width: 100,
              height: 100,
              position: 'absolute',
              top: '75%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              border: '3px solid white',
            }}
          />
        </Box>

        <CardContent
          sx={{ mt: 6, display: 'flex', justifyContent: 'space-between' }}
        >
          <Container>
            {isEditMode ? (
              <>
                <TextField
                  label="Username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mt: 2 }}
                  error={Boolean(error?.username)}
                  helperText={error?.username}
                />
                <TextField
                  label="First Name"
                  name="first_name"
                  value={userData.first_name}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mt: 2 }}
                  error={Boolean(error?.first_name)}
                  helperText={error?.first_name}
                />
                <TextField
                  label="Last Name"
                  name="last_name"
                  value={userData.last_name}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mt: 2 }}
                  error={Boolean(error?.last_name)}
                  helperText={error?.last_name}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  fullWidth
                  sx={{ mt: 2 }}
                  error={Boolean(error?.email)}
                  helperText={error?.email}
                />
                <Button variant="contained" component="label" sx={{ mt: 2 }}>
                  {t('userProfilePage.upload')}
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleImageChange}
                  />
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  {user.username}
                </Typography>
                <Typography color="textSecondary" variant="h5">
                  {user.first_name ? user.first_name : '-'}{' '}
                  {user.last_name ? user.last_name : '-'}
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1 }}>
                  {user.email}
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1 }}>
                  {t('userProfilePage.joined')}{' '}
                  {new Date(user.created_at).toLocaleDateString()}
                </Typography>
              </>
            )}
          </Container>
          {currUser == userId && (
            <Box>
              {isEditMode ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                  >
                    {t('userProfilePage.save')}
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setOpen(true)}
                    sx={{ mt: 2 }}
                  >
                    {t('userProfilePage.delete')}
                  </Button>
                </>
              ) : (
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => setIsEditMode(true)}
                >
                  <EditIcon />
                </Button>
              )}
            </Box>
          )}
        </CardContent>
      </Paper>

      <UniversalModal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Profile"
        actions={
          <>
            <Button onClick={() => setOpen(false)} color="primary">
              {t('userProfilePage.cancelButton')}
            </Button>
            <Button onClick={handleOpen} color="error">
              {t('userProfilePage.deleteButton')}
            </Button>
          </>
        }
      >
        <Typography>{t('userProfilePage.deleteConfirm')}</Typography>
      </UniversalModal>
    </Container>
  );
};

export default ProfilePage;
