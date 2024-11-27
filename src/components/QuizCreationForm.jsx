import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const QuizCreationForm = ({ quizData, setQuizData, onSubmit }) => {
  const { t } = useTranslation();

  const addQuestion = () => {
    setQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, { text: '', answers: [] }],
    }));
  };

  const removeQuestion = questionIndex => {
    const newQuestions = [...quizData.questions];
    newQuestions.splice(questionIndex, 1);
    setQuizData({ ...quizData, questions: newQuestions });
    toast.success(t('quizzes.quizzRemove'));
  };

  const addAnswer = questionIndex => {
    setQuizData(prev => {
      const newQuestions = prev.questions.map((q, i) =>
        i === questionIndex
          ? { ...q, answers: [...q.answers, { text: '', is_correct: false }] }
          : q
      );
      return { ...prev, questions: newQuestions };
    });
  };

  const handleInputChange = (value, field, questionIndex, answerIndex) => {
    setQuizData(prev => {
      const newQuestions = prev.questions.map((q, i) => {
        if (i !== questionIndex) return q;
        const newAnswers = q.answers.map((a, j) => {
          if (j !== answerIndex) return a;
          return field === 'answerText'
            ? { ...a, text: value }
            : { ...a, is_correct: value };
        });
        return field === 'questionText'
          ? { ...q, text: value }
          : { ...q, answers: newAnswers };
      });
      return { ...prev, questions: newQuestions };
    });
  };

  const handleQuizSubmit = () => {
    if (onSubmit) {
      onSubmit(quizData);
    }
  };

  return (
    <Box>
      <TextField
        label="Quiz Title"
        value={quizData.title}
        onChange={e => setQuizData({ ...quizData, title: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />
      <TextField
        label="Quiz Description"
        value={quizData.description}
        onChange={e =>
          setQuizData({ ...quizData, description: e.target.value })
        }
        fullWidth
        sx={{ mb: 2 }}
      />
      {quizData.questions.map((question, questionIndex) => (
        <Box
          key={questionIndex}
          sx={{ mb: 3, p: 2, border: '1px solid #ddd', position: 'relative' }}
        >
          <TextField
            label={`Question ${questionIndex + 1}`}
            value={question.text}
            onChange={e =>
              handleInputChange(e.target.value, 'questionText', questionIndex)
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
                  handleInputChange(
                    e.target.value,
                    'answerText',
                    questionIndex,
                    answerIndex,
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
                      handleInputChange(
                        !answer.is_correct,
                        'isCorrect',
                        questionIndex,
                        answerIndex,
                      )
                    }
                  />
                }
                label="Correct"
              />
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={() => addAnswer(questionIndex)}>
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
      <Button variant="contained" onClick={addQuestion} sx={{ mr: 2 }}>
        {t('quizzes.addQuestion')}
      </Button>
      <Button variant="contained" color="primary" onClick={handleQuizSubmit}>
        {t('quizzes.submitQuiz')}
      </Button>
    </Box>
  );
};

export default QuizCreationForm;
