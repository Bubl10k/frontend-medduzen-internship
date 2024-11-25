import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import QuizService from '../services/quiz.service';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import { Box, Typography } from '@mui/material';
import QuizCard from '../components/QuizCard';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../store/auth/auth.slice';
import { selectCompanyById } from '../store/companies/companies.selectors';
import { fetchCompanyById } from '../store/companies/companies.actions';
const QuizListPage = () => {
  const { companyId } = useParams();
  const currUser = useSelector(currentUser);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const company = useSelector(selectCompanyById);
  const dispatch = useDispatch();

  const fetchQuizzes = async companyId => {
    try {
      const quizzes = await QuizService.getQuizzes(companyId);
      setQuizzes(quizzes);
      setLoading(false);
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchCompanyById(companyId));
  }, [dispatch, companyId]);

  useEffect(() => {
    fetchQuizzes(companyId);
  }, [companyId]);

  if (loading) return <Loading />;

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', mt: 6 }}>
      <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
        Quizzes for {company.name}
      </Typography>
      {quizzes.length === 0 && (
        <Typography>No quizzes found for this company.</Typography>
      )}

      {!loading && quizzes.length > 0 && (
        <>
          {quizzes.map(quiz => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onQuizUpdate={() => fetchQuizzes(companyId)}
              isOwnerOrAdmin={
                currUser == company.owner || company.admins.includes(currUser)
              }
            />
          ))}
        </>
      )}
    </Box>
  );
};

export default QuizListPage;
