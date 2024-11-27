import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import { Box, Pagination, Typography } from '@mui/material';
import QuizCard from '../components/QuizCard';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../store/auth/auth.slice';
import { selectCompanyById } from '../store/companies/companies.selectors';
import { fetchCompanyById } from '../store/companies/companies.actions';
import { useTranslation } from 'react-i18next';
import { selectQuizzesState } from '../store/quizzes/quizzes.selectors';
import { fetchQuizzes } from '../store/quizzes/quizzes.actions';

const QuizListPage = () => {
  const { t } = useTranslation();
  const { companyId } = useParams();
  const currUser = useSelector(currentUser);
  const { quizzes, count, loading } = useSelector(selectQuizzesState);
  const [page, setPage] = useState(1);
  const company = useSelector(selectCompanyById);
  const dispatch = useDispatch();
  const quizzesPerPage = 10;

  useEffect(() => {
    dispatch(fetchCompanyById(companyId));
    dispatch(fetchQuizzes(companyId, page));
  }, [dispatch, companyId, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (loading || !company) return <Loading />;

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', mt: 6 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        {t('quizzes.quizzesFor')} {company.name}
      </Typography>
      {quizzes.length === 0 && (
        <Typography>{t('quizzes.noQuizzes')}</Typography>
      )}

      {!loading && quizzes.length > 0 && (
        <>
          {quizzes.map(quiz => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onQuizUpdate={() => fetchQuizzes(companyId, page)}
              isOwnerOrAdmin={
                currUser === company.owner || company.admins.includes(currUser)
              }
            />
          ))}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '2rem',
            }}
          >
            <Pagination
              count={Math.ceil(count / quizzesPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default QuizListPage;
