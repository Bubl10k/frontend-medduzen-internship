import { Box, Button, Checkbox, FormControlLabel, TextField } from '@mui/material';

const QuizCreationForm = ({ quizData, setQuizData, onSubmit }) => {
  const addQuestion = () => {
    setQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, { text: '', answers: [] }],
    }));
  };

  const addAnswer = questionIndex => {
    const newQuestions = [...quizData.questions];
    newQuestions[questionIndex].answers.push({ text: '', is_correct: false });
    setQuizData({ ...quizData, questions: newQuestions });
  };

  const handleInputChange = (value, field, questionIndex, answerIndex) => {
    const newQuestions = [...quizData.questions];
    if (field === 'questionText') {
      newQuestions[questionIndex].text = value;
    } else if (field === 'answerText') {
      newQuestions[questionIndex].answers[answerIndex].text = value;
    } else if (field === 'isCorrect') {
      newQuestions[questionIndex].answers[answerIndex].is_correct = value;
    }
    setQuizData({ ...quizData, questions: newQuestions });
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
        onChange={e => setQuizData({ ...quizData, description: e.target.value })}
        fullWidth
        sx={{ mb: 2 }}
      />
      {quizData.questions.map((question, questionIndex) => (
        <Box key={questionIndex} sx={{ mb: 3, p: 2, border: '1px solid #ddd' }}>
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
          <Button
            variant="outlined"
            onClick={() => addAnswer(questionIndex)}
            sx={{ mt: 1 }}
          >
            Add Answer
          </Button>
        </Box>
      ))}
      <Button variant="contained" onClick={addQuestion} sx={{ mr: 2 }}>
        Add Question
      </Button>
      <Button variant="contained" color="primary" onClick={handleQuizSubmit}>
        Submit Quiz
      </Button>
    </Box>
  );
};

export default QuizCreationForm;
