import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  selectCompaniesState,
  selectCompanyById,
} from '../store/companies/companies.selectors';
import {
  deleteCompany,
  fetchCompanyById,
  updateCompany,
} from '../store/companies/companies.actions';
import { useEffect, useState, useCallback } from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import Loading from '../components/Loading';
import { currentUser } from '../store/auth/auth.slice';
import UniversalModal from '../components/UniversalModal';
import CompanyForm from '../components/CompanyForm';
import { useTranslation } from 'react-i18next';
import ROUTES from '../utils/routes';
import CompanyService from '../services/company.service';
import { toast } from 'react-toastify';
import CompanyProfileUser from '../components/CompanyProfileUser';
import QuizCreationForm from '../components/QuizCreationForm';
import { createQuiz } from '../store/quizzes/quizzes.actions';
import QuizService from '../services/quiz.service';
import Chart from '../components/Chart';
import sortByTimeStamp from '../utils/sortByTimeStamp';
import downloadResults from '../utils/downloadResults';

const CompanyProfilePage = () => {
  const { t } = useTranslation();
  const { companyId } = useParams();
  const dispatch = useDispatch();
  const company = useSelector(selectCompanyById);
  const { loading } = useSelector(selectCompaniesState);
  const currUser = useSelector(currentUser);
  const [quiz, setQuiz] = useState({
    title: '',
    company: companyId,
    frequency: 0,
    questions: [],
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState({ x: [], y: [] });
  const [lastTests, setLastTests] = useState({});

  const fetchLastTakenTests = useCallback(async () => {
    const lastTakenTests = await CompanyService.getLastTakenQuizzesTime(
      companyId,
    );
    setLastTests(lastTakenTests);
  }, [companyId]);

  const NonAdminMembers = useCallback(() => {
    if (!company) {
      return <Loading />;
    }

    const members = company.members.filter(
      member => !company.admins.includes(member),
    );

    if (members.length > 0) {
      return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
          {members.map((member, index) => (
            <CompanyProfileUser
              key={member}
              userId={member}
              isOwner={currUser === company.owner}
              companyId={company.id}
              lastTestTaken={lastTests[index]?.last_completed_at}
              handleShowChart={() => handleFetchUserAnalytics(member)}
            />
          ))}
        </Box>
      );
    }

    return (
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
        {t('companyProfilePage.noMembers')}
      </Typography>
    );
  }, [company, currUser]);

  const handleOpenEditModal = () => setIsEditModalOpen(true);
  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleOpenDeleteModal = () => setIsDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDeleteCompany = () => {
    dispatch(deleteCompany(companyId));
    handleCloseDeleteModal();
  };

  const handleEditCompany = updatedData => {
    dispatch(updateCompany({ id: companyId, ...updatedData }));
    handleCloseEditModal();
  };

  const handleSendRequest = async () => {
    try {
      await CompanyService.sendRequest({ company: companyId });
      toast.success('Request sent!');
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  const handleLeaveCompany = async () => {
    try {
      await CompanyService.companyLeave(companyId);
      toast.success('You left the company!');
      dispatch(fetchCompanyById(companyId));
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  const handleCreateQuiz = async () => {
    dispatch(createQuiz(quiz));
  };

  const handleFetchAnalytics = async () => {
    try {
      const averageScores = await QuizService.getScores();
      sortByTimeStamp(averageScores);

      const x = averageScores.map(x => x.timestamp);
      const y = averageScores.map(y => y.average_score);

      setChartData({ x, y });
      setShowChart(true);
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  const handleFetchUserAnalytics = async userId => {
    try {
      const averageScores = await QuizService.getUserScores(userId);
      sortByTimeStamp(averageScores);
      const x = averageScores.map(x => x.timestamp);
      const y = averageScores.map(y => y.average_score);
      setChartData({ x, y });
      setShowChart(true);
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  const handleDownloadAllUsersResults = async (companyId, format) => {
    try {
      const response = await CompanyService.geCompanyUsersResults(
        format,
        companyId,
      );
      downloadResults(response, format);
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  useEffect(() => {
    fetchLastTakenTests();
    dispatch(fetchCompanyById(companyId));
  }, [dispatch, companyId, fetchLastTakenTests]);

  if (loading || !company) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: '0 auto',
        padding: '2rem',
        mt: 4,
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            {company.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {company.members.length} {t('companyProfilePage.members')}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {t('companyProfilePage.aboutUs')}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {company.description || 'No description available'}
          </Typography>
        </Box>
        {currUser === company.owner && (
          <Box>
            <Button
              variant="contained"
              sx={{ mr: 2 }}
              onClick={handleOpenEditModal}
            >
              {t('companyProfilePage.edit')}
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleOpenDeleteModal}
            >
              {t('companyProfilePage.delete')}
            </Button>
          </Box>
        )}

        {company.members.includes(currUser) && currUser !== company.owner && (
          <Button
            variant="contained"
            color="error"
            onClick={handleLeaveCompany}
          >
            {t('companyProfilePage.leave')}
          </Button>
        )}
      </Box>

      <Divider sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="body2" color="text.secondary">
          {t('companyProfilePage.founded')}{' '}
          {new Date(company.created_at).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('companyProfilePage.viability')}{' '}
          {company.visible ? 'Public' : 'Private'}
        </Typography>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {t('companyProfilePage.teamMembers')}
        </Typography>
        {NonAdminMembers()}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {t('companyProfilePage.admins')}
        </Typography>
        {company.admins.length > 0 ? (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
            {company.admins.map(admin => (
              <CompanyProfileUser
                key={admin}
                userId={admin}
                isOwner={currUser === company.owner}
                isAdmin={true}
                companyId={company.id}
              />
            ))}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {t('companyProfilePage.noAdmins')}
          </Typography>
        )}
      </Box>

      {!company.members.includes(currUser) && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSendRequest}
        >
          {t('companyProfilePage.request')}
        </Button>
      )}
      {currUser === company.owner || company.admins.includes(currUser) ? (
        <>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setIsQuizModalOpen(true)}
            sx={{ mb: 2, mt: 2 }}
          >
            {t('companyProfilePage.createQuiz')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => handleDownloadAllUsersResults(company.id, 'csv')}
          >
           {t('companyProfilePage.exportCsvAllUsers')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mb: 2 }}
            onClick={() => handleDownloadAllUsersResults(company.id, 'json')}
          >
            {t('companyProfilePage.exportJsonAllUsers')}
          </Button>
          {!showChart ? (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={handleFetchAnalytics}
            >
              {t('companyProfilePage.quizAnalytics')}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 2 }}
              onClick={() => setShowChart(false)}
            >
              {t('companyProfilePage.hideQuizAnalytics')}
            </Button>
          )}
        </>
      ) : null}
      {company.members.includes(currUser) && (
        <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }}>
          <Link
            to={ROUTES.QUIZZES(company.id)}
            style={{
              color: 'inherit',
              textDecoration: 'none',
              width: '100%',
            }}
          >
            {t('companyProfilePage.quizList')}
          </Link>
        </Button>
      )}
      {currUser === company.owner && (
        <>
          <Button variant="contained" color="primary" fullWidth>
            <Link
              to={ROUTES.USERS}
              style={{
                color: 'inherit',
                textDecoration: 'none',
                width: '100%',
              }}
            >
              {t('companyProfilePage.invite')}
            </Link>
          </Button>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            <Link
              to={ROUTES.INVITATIONS_COMPANY}
              style={{
                color: 'inherit',
                textDecoration: 'none',
                width: '100%',
              }}
            >
              {t('companyProfilePage.invitations')}
            </Link>
          </Button>
          <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            <Link
              to={ROUTES.REQUESTS_COMPANY(company.id)}
              style={{
                color: 'inherit',
                textDecoration: 'none',
                width: '100%',
              }}
            >
              {t('companyProfilePage.requests')}
            </Link>
          </Button>
        </>
      )}

      {showChart && (
        <Box sx={{ mt: 3 }}>
          <Chart x={chartData.x} y={chartData.y} />
        </Box>
      )}

      <UniversalModal
        open={isEditModalOpen}
        onClose={handleCloseEditModal}
        title={t('companyForm.update')}
      >
        <CompanyForm
          onSubmit={handleEditCompany}
          company={company}
          onClose={handleCloseEditModal}
        />
      </UniversalModal>
      <UniversalModal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title={t('companyProfilePage.titleDelete')}
        actions={
          <>
            <Button onClick={handleCloseDeleteModal} color="primary">
              {t('companyProfilePage.cancel')}
            </Button>
            <Button onClick={handleDeleteCompany} color="error">
              {t('companyProfilePage.confirmDelete')}
            </Button>
          </>
        }
      >
        <Typography>{t('companyProfilePage.deleteConfirm')}</Typography>
      </UniversalModal>
      <UniversalModal
        open={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        title="Create a New Quiz"
      >
        <QuizCreationForm
          quiz={quiz}
          setQuiz={setQuiz}
          onSubmit={handleCreateQuiz}
        />
      </UniversalModal>
    </Box>
  );
};

export default CompanyProfilePage;
