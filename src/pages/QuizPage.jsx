import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import QuizService from '../services/quiz.service';
import ROUTES from '../utils/routes';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import Loading from '../components/Loading';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectQuizzesState } from '../store/quizzes/quizzes.selectors';
import { fetchQuizById } from '../store/quizzes/quizzes.actions';

const QuizPage = () => {
  const { t } = useTranslation();
  const { quizId } = useParams();
  const { loading, selectedQuiz } = useSelector(selectQuizzesState);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuizById(quizId));
  }, [dispatch, quizId]);

  const handleAnswerChange = (questionId, answerId) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const handleSubmit = async () => {
    const answersData = Object.keys(answers).map(questionId => {
      return {
        question: parseInt(questionId),
        answer: answers[questionId],
      };
    });

    try {
      await QuizService.completeQuiz(quizId, { answers: answersData });
      toast.success('Quiz completed successfully!');
      navigate(ROUTES.COMPANY_PROFILE(selectedQuiz.company.id));
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  console.log('saasd', selectedQuiz);

  if (loading || !selectedQuiz) return <Loading />;

  return (
    <Box
      sx={{
        padding: '24px',
        maxWidth: '600px',
        margin: 'auto',
        backgroundColor: '#fff',
        borderRadius: '8px',
        borderTop: '8px solid #1976d2',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
        mt: 6,
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ fontWeight: '400' }}>
        {selectedQuiz.title}
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ marginBottom: '24px' }}>
        {selectedQuiz.description || 'No description provided.'}
      </Typography>
      <Box>
        {selectedQuiz.questions.map(question => (
          <Box
            key={question.id}
            sx={{
              marginBottom: '24px',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h6"
              sx={{ marginBottom: '12px', fontWeight: '500' }}
            >
              {question.text}
            </Typography>
            <RadioGroup
              value={answers[question.id] || ''}
              onChange={e => handleAnswerChange(question.id, e.target.value)}
            >
              {question.answers.map((answer, index) => (
                <FormControlLabel
                  key={index}
                  value={answer.text}
                  control={
                    <Radio
                      sx={{
                        '&:hover': {
                          backgroundColor: 'transparent',
                        },
                      }}
                    />
                  }
                  label={answer.text}
                />
              ))}
            </RadioGroup>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          marginBottom: '24px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          {t('quizzes.submit')}
        </Button>
        <Button
          variant="text"
          onClick={() => navigate(ROUTES.COMPANY_PROFILE(selectedQuiz.company))}
        >
          {t('quizzes.cancel')}
        </Button>
      </Box>
    </Box>
  );
};

export default QuizPage;
