import { Box, Button, Typography } from '@mui/material';
import QuizService from '../services/quiz.service';
import { toast } from 'react-toastify';
import { useState } from 'react';
import UniversalModal from './UniversalModal';
import QuizCreationForm from './QuizCreationForm';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../utils/routes';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { deleteQuiz, editQuiz } from '../store/quizzes/quizzes.actions';

const QuizCard = ({ quiz, isOwnerOrAdmin }) => {
  const { t } = useTranslation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [quizData, setQuizData] = useState({ ...quiz });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleEditModalClose = () => setOpenEditModal(false);

  const handleEditQuiz = id => {
    dispatch(editQuiz({ id, quizData })).then(response => {
      if (!response.error) {
        setOpenEditModal(false);
      }
    });
  };

  const handleDeleteQuiz = id => {
    dispatch(deleteQuiz(id));
  };

  const startQuiz = async id => {
    try {
      await QuizService.startQuiz(id);
      navigate(ROUTES.QUIZ(id));
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  return (
    <Box
      sx={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h6">{quiz.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {quiz.description || t('quizzes.description')}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {t('quizzes.created')} {new Date(quiz.created_at).toLocaleString()}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '8px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => startQuiz(quiz.id)}
        >
          {t('quizzes.startQuiz')}
        </Button>
        {isOwnerOrAdmin && (
          <>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleOpenEditModal}
            >
              {t('quizzes.editQuiz')}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleOpenDeleteModal()}
            >
              {t('quizzes.deleteQuiz')}
            </Button>
          </>
        )}
      </Box>
      <UniversalModal
        open={openEditModal}
        onClose={handleEditModalClose}
        title="Edit Quiz"
        actions={
          <Button onClick={handleEditModalClose} color="primary">
            {t('quizzes.cancel')}
          </Button>
        }
      >
        <QuizCreationForm
          quizData={quizData}
          setQuizData={setQuizData}
          onSubmit={() => handleEditQuiz(quiz.id)}
        />
      </UniversalModal>
      <UniversalModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        title={'Delete Quiz'}
        actions={
          <>
            <Button onClick={() => setOpenDeleteModal(false)} color="primary">
              {t('quizzes.cancel')}
            </Button>
            <Button onClick={() => handleDeleteQuiz(quiz.id)} color="error">
              {t('quizzes.deleteQuiz')}
            </Button>
          </>
        }
      >
        <Typography>{t('quizzes.deleteConfirm')}</Typography>
      </UniversalModal>
    </Box>
  );
};

export default QuizCard;
