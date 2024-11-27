import { createSlice } from '@reduxjs/toolkit';
import { fetchQuizzes, editQuiz, deleteQuiz, fetchQuizById } from './quizzes.actions';

const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: {
    quizzes: [],
    selectedQuiz: null,
    currentPage: 1,
    count: 0,
    loading: false,
    error: null,
    next: null,
    previous: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchQuizzes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload.results;
        state.next = action.payload.next;
        state.previous = action.payload.previous;
        state.count = action.payload.count;
      })
      .addCase(fetchQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchQuizById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuizById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedQuiz = action.payload;
      })
      .addCase(fetchQuizById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editQuiz.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = state.quizzes.map((quiz) =>
          quiz.id === action.payload.quizData.id ? action.payload.quizData : quiz
        );
      })
      .addCase(editQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteQuiz.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = state.quizzes.filter(
          quiz => quiz.id !== action.payload,
        );
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default quizzesSlice.reducer;
