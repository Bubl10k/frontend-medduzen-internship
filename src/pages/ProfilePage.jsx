import { useParams } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { currentUser } from '../store/auth/auth.slice';
import UniversalModal from '../components/UniversalModal';
import { selectUserState } from '../store/users/users.selectors';
import {
  deleteUser,
  fetchUserById,
  updateUser,
} from '../store/users/users.actions';
import { fetchCompaniesByUserId } from '../store/companies/companies.actions';
import CompanyCard from '../components/CompanyCard';
import { selectCompaniesState } from '../store/companies/companies.selectors';
import QuizService from '../services/quiz.service';
import sortByTimeStamp from '../utils/sortByTimeStamp';
import { toast } from 'react-toastify';
import Chart from '../components/Chart';
import CompanyService from '../services/company.service';
import downloadResults from '../utils/downloadResults';

const ProfilePage = () => {
  const { userId } = useParams();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { error, selectedUser } = useSelector(selectUserState);
  const currUser = useSelector(currentUser);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userData, setUserData] = useState({
    id: selectedUser?.id,
    username: selectedUser?.username,
    first_name: selectedUser?.first_name,
    last_name: selectedUser?.last_name,
    email: selectedUser?.email,
    image_path: selectedUser?.image_path,
  });
  const [open, setOpen] = useState(false);
  const { companies } = useSelector(selectCompaniesState);
  const [chartData, setChartData] = useState({ x: [], y: [] });
  const [lastTests, setLastTests] = useState({});

  const fetchUserAnalytics = async userId => {
    try {
      const averageScores = await QuizService.getUserScores(userId);
      sortByTimeStamp(averageScores);
      const x = averageScores.map(x => x.timestamp);
      const y = averageScores.map(y => y.average_score);
      setChartData({ x, y });
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  const fetchLastTakenTests = async userId => {
    try {
      const lastTests = await CompanyService.getLastTakenUserTime(userId);
      setLastTests(lastTests);
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  useEffect(() => {
    dispatch(fetchUserById(userId));
    dispatch(fetchCompaniesByUserId(userId));
    fetchUserAnalytics(userId);
    fetchLastTakenTests(userId);
  }, [dispatch, userId]);

  useEffect(() => {
    if (selectedUser) {
      setUserData({
        id: selectedUser.id || '',
        username: selectedUser.username || '',
        first_name: selectedUser.first_name || '',
        last_name: selectedUser.last_name || '',
        email: selectedUser.email || '',
        image_path: selectedUser.image_path || null,
      });
    }
  }, [selectedUser]);

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
    dispatch(deleteUser(selectedUser.id));
    setOpen(false);
  };

  const handleDownloadResults = async format => {
    try {
      const response = await QuizService.getUserQuizResults(format);
      downloadResults(response, format);
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  if (!selectedUser) {
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
            src={selectedUser.image_path || '/path/to/default-avatar.jpg'}
            alt={selectedUser.username}
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
                <Typography
                  variant="h5"
                  sx={{ mt: 1, fontWeight: 'bold', mb: 1 }}
                >
                  {selectedUser.username}
                </Typography>
                <Typography color="textSecondary" variant="h5">
                  {selectedUser.first_name ? selectedUser.first_name : '-'}{' '}
                  {selectedUser.last_name ? selectedUser.last_name : '-'}
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1 }}>
                  {selectedUser.email}
                </Typography>
                <Typography color="textSecondary" sx={{ mt: 1 }}>
                  {t('userProfilePage.joined')}{' '}
                  {new Date(selectedUser.created_at).toLocaleDateString()}
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

      <Paper elevation={3} sx={{ mt: 4, p: 3, borderRadius: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {t('userProfilePage.companiesJoined')}
        </Typography>
        <Grid container spacing={2}>
          {companies && companies.length > 0 ? (
            companies.map(company => (
              <Grid item xs={12} sm={6} md={4} key={company.id}>
                <CompanyCard
                  company={company}
                  isCompanyMember={currUser == userId}
                />
              </Grid>
            ))
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 1, ml: 2 }}
            >
              {t('userProfilePage.noCompanies')}
            </Typography>
          )}
        </Grid>
        {currUser == userId && (
          <>
            <Chart x={chartData.x} y={chartData.y} />
            <Typography variant="h5" sx={{ mt: 3, textAlign: 'center' }}>
              {t('userProfilePage.quizList')}
            </Typography>
            <Box
              sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ width: '40%' }}
                onClick={() => handleDownloadResults('csv')}
              >
                {t('userProfilePage.exportCsv')}
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ width: '40%' }}
                onClick={() => handleDownloadResults('json')}
              >
                {t('userProfilePage.exportJson')}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 3 }}>
              {lastTests && lastTests.length > 0
                ? lastTests.map(lastTest => (
                    <Card key={lastTest.id} sx={{ width: 250, height: 100 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {t('userProfilePage.quiz')} {lastTest.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {t('userProfilePage.lastTimeTaken')}{' '}
                          {new Date(
                            lastTest.last_completed_at,
                          ).toLocaleString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                : null}
            </Box>
          </>
        )}
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
