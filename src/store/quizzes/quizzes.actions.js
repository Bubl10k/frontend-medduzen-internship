import { createAsyncThunk } from '@reduxjs/toolkit';
import QuizService from '../../services/quiz.service';
import { toast } from 'react-toastify';

export const fetchQuizzes = createAsyncThunk(
  'quizzes/fetchQuizzes',
  async ({ companyId, page }, { rejectWithValue }) => {
    try {
      const data = await QuizService.getQuizzes(companyId, page);
      return data;
    } catch (err) {
      toast.error(err.response?.data?.detail || err.message);
      return rejectWithValue(err.message);
    }
  },
);

export const fetchQuizById = createAsyncThunk(
  'quizzes/fetchQuizById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await QuizService.getQuizzById(id);
      return data;
    } catch (err) {
      toast.error(err.response?.data?.detail || err.message);
      return rejectWithValue(err.message);
    }
  },
);

export const createQuiz = createAsyncThunk(
  'quizzes/createQuiz',
  async (quizData, { rejectWithValue }) => {
    try {
      const data = await QuizService.createQuiz(quizData);
      toast.success('Quiz created successfully!');
      return data;
    } catch (err) {
      toast.error(err.response?.data?.detail || err.message);
      return rejectWithValue(err.response?.data?.detail || err.message);
    }
  },
);

export const editQuiz = createAsyncThunk(
  'quizzes/editQuiz',
  async ({ id, quizData }, { rejectWithValue }) => {
    try {
      await QuizService.updateQuiz(id, quizData);
      toast.success('Quiz updated successfully!');
      return { id, quizData };
    } catch (error) {
      toast.error(error.response?.data.detail || error.message);
      return rejectWithValue(error.response?.data.detail || error.message);
    }
  },
);

export const deleteQuiz = createAsyncThunk(
  'quizzes/deleteQuiz',
  async (id, { rejectWithValue }) => {
    try {
      await QuizService.deleteQuiz(id);
      toast.success('Quiz deleted successfully!');
      return id;
    } catch (error) {
      toast.error(error.response?.data.detail || error.message);
      return rejectWithValue(error.response?.data.detail || error.message);
    }
  },
);
