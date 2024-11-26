import { Box, Button, TextField, Typography } from '@mui/material';
import QuizService from '../services/quiz.service';
import { toast } from 'react-toastify';
import { useState } from 'react';
import UniversalModal from './UniversalModal';

const QuizCard = ({ quiz, onQuizUpdate, isOwnerOrAdmin }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [quizData, setQuizData] = useState({
    title: quiz.title,
    company: quiz.company,
    description: quiz.description,
    frequency: quiz.frequency,
    questions: quiz.questions,
  });

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleEditModalClose = () => setOpenEditModal(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setQuizData(prevData => ({ ...prevData, [name]: value }));
  };

  const editQuiz = async id => {
    try {
      await QuizService.updateQuiz(id, quizData);
      toast.success('Quiz updated successfully!');
      handleEditModalClose();
      onQuizUpdate();
    } catch (err) {
      toast.error(err.response?.data.detail || err.message);
    }
  };

  const deleteQuiz = async id => {
    try {
      await QuizService.deleteQuiz(id);
      toast.success('Quiz deleted successfully!');
      handleCloseDeleteModal();
      onQuizUpdate();
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
          {quiz.description || 'No description available'}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Created at: {new Date(quiz.created_at).toLocaleString()}
        </Typography>
      </Box>
      {isOwnerOrAdmin && (
        <Box sx={{ display: 'flex', gap: '8px' }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpenEditModal}
          >
            Edit Quiz
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleOpenDeleteModal()}
          >
            Delete Quiz
          </Button>
        </Box>
      )}
      <UniversalModal
        open={openEditModal}
        onClose={handleEditModalClose}
        title="Edit Quiz"
        actions={
          <>
            <Button onClick={handleEditModalClose} color="primary">
              Cancel
            </Button>
            <Button onClick={() => editQuiz(quiz.id)} color="primary">
              Save Changes
            </Button>
          </>
        }
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '16px',
          }}
        >
          <TextField
            label="Quiz Title"
            name="title"
            value={quizData.title}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Quiz Desciption"
            name="description"
            value={quizData.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </Box>
      </UniversalModal>
      <UniversalModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        title={'Delete Quiz'}
        actions={
          <>
            <Button onClick={() => setOpenDeleteModal(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => deleteQuiz(quiz.id)} color="error">
              Delete quiz
            </Button>
          </>
        }
      >
        <Typography>Are you sure you want to delete this quiz?</Typography>
      </UniversalModal>
    </Box>
  );
};

export default QuizCard;
