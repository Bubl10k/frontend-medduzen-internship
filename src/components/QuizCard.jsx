import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
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
import downloadResults from '../utils/downloadResults';

const QuizCard = ({ quiz, isOwnerOrAdmin }) => {
  const { t } = useTranslation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openExportModal, setOpenExportModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [quizData, setQuizData] = useState({ ...quiz });
  const [exportFormat, setExportFormat] = useState('csv');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleEditModalClose = () => setOpenEditModal(false);

  const handleEditQuiz = id => {
    dispatch(editQuiz({ id, quizData })).then(response => {
      if (!response.error) {
        toast.success('Quiz edited successfully!');
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

  const handleDownloadQuizResults = async (quizId, format) => {
    try {
      const response = await QuizService.getQuizResults(quizId, format);
      downloadResults(response, format);
      setOpenExportModal(false);
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  console.log(quizData);

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
              variant="contained"
              color="primary"
              onClick={() => setOpenExportModal(true)}
            >
              {t('quizzes.exportResults')}
            </Button>
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
          quiz={quizData}
          setQuiz={setQuizData}
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
      <UniversalModal
        open={openExportModal}
        onClose={() => setOpenExportModal(false)}
        title={t('quizzes.exportResults')}
        actions={
          <Button
            onClick={() => handleDownloadQuizResults(quiz.id, exportFormat)}
            color="primary"
          >
            {t('quizzes.download')}
          </Button>
        }
      >
        <Typography>{t('quizzes.chooseFormat')}</Typography>
        <RadioGroup
          value={exportFormat}
          onChange={e => setExportFormat(e.target.value)}
        >
          <FormControlLabel value="csv" control={<Radio />} label="CSV" />
          <FormControlLabel value="json" control={<Radio />} label="JSON" />
        </RadioGroup>
      </UniversalModal>
    </Box>
  );
};

export default QuizCard;
