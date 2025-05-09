import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const QuizCreationForm = ({ quiz, setQuiz, onSubmit }) => {
  const { t } = useTranslation();

  const appendQuestion = () => {
    setQuiz(prevState => ({
      ...prevState,
      questions: [...prevState.questions, { text: '', answers: [] }],
    }));
  }

  const removeQuestion = questionIndex => {
    const newQuestions = [...quiz.questions];
    newQuestions.splice(questionIndex, 1);
    setQuiz({ ...quiz, questions: newQuestions });
    toast.success(t('quizzes.quizzRemove'));
  };

  const appendAnswerToQuestion = (targetIndex) => {
    setQuiz((prevState) => ({
      ...prevState,
      questions: prevState.questions.map((question, index) => 
        index === targetIndex 
          ? { 
              ...question, 
              answers: [...question.answers, { text: '', is_correct: false }] 
            } 
          : question
      ),
    }));
  };

  const updateQuestion = (questionIndex, field, value) => {
    setQuiz((prevState) => ({
      ...prevState,
      questions: prevState.questions.map((question, index) =>
        index === questionIndex ? { ...question, [field]: value } : question
      ),
    }));
  };

  const updateAnswer = (questionIndex, answerIndex, field, value) => {
    setQuiz((prevState) => ({
      ...prevState,
      questions: prevState.questions.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              answers: question.answers.map((answer, j) =>
                j === answerIndex ? { ...answer, [field]: value } : answer
              ),
            }
          : question
      ),
    }));
  };

  const handleQuizSubmit = () => {
    if (onSubmit) {
      onSubmit(quiz);
    }
  };

  return (
    <Box>
      <TextField
        label="Quiz Title"
        value={quiz.title}
        onChange={e => setQuiz({ ...quiz, title: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Quiz Description"
        value={quiz.description}
        onChange={e =>
          setQuiz({ ...quiz, description: e.target.value })
        }
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Quiz Frequency (Number of days)"
        value={quiz.frequency}
        onChange={e =>
          setQuiz({ ...quiz, frequency: e.target.value })
        }
        fullWidth
        sx={{ mb: 2 }}
      />
      {quiz.questions.map((question, questionIndex) => (
        <Box
          key={questionIndex}
          sx={{ mb: 3, p: 2, border: '1px solid #ddd', position: 'relative' }}
        >
          <TextField
            label={`Question ${questionIndex + 1}`}
            value={question.text}
            onChange={e =>
              updateQuestion(questionIndex, 'text', e.target.value)
            }
            fullWidth
            sx={{ mb: 2 }}
          />
          {question.answers.map((answer, answerIndex) => (
            <Box
              key={answerIndex}
              sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
            >
              <TextField
                label={`Answer ${answerIndex + 1}`}
                value={answer.text}
                onChange={e =>
                  updateAnswer(
                    questionIndex,
                    answerIndex,
                    'text',
                    e.target.value
                  )
                }
                fullWidth
                sx={{ mr: 2 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={answer.is_correct}
                    onChange={() =>
                      updateAnswer(
                        questionIndex,
                        answerIndex,
                        'is_correct',
                        !answer.is_correct,
                      )
                    }
                  />
                }
                label="Correct"
              />
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={() => appendAnswerToQuestion(questionIndex)}>
              {t('quizzes.addAnswer')}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeQuestion(questionIndex)}
            >
              {t('quizzes.deleteQuestion')}
            </Button>
          </Box>
        </Box>
      ))}
      <Button variant="contained" onClick={appendQuestion} sx={{ mr: 2 }}>
        {t('quizzes.addQuestion')}
      </Button>
      <Button variant="contained" color="primary" onClick={handleQuizSubmit}>
        {t('quizzes.submitQuiz')}
      </Button>
    </Box>
  );
};

export default QuizCreationForm;
