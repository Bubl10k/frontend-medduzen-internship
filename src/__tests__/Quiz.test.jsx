import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import QuizPage from '../pages/QuizPage';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import quizzesReducer from '../store/quizzes/quizzes.slice';
import React from 'react';
import ROUTES from '../utils/routes';
const mockNavigate = jest.fn();

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: key => key,
  }),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ quizId: '1' }),
  useNavigate: () => mockNavigate,
}));

const mockQuiz = {
  id: 1,
  title: 'Test Quiz',
  description: 'test description',
  questions: [
    {
      id: 101,
      text: '2 + 2',
      answers: [
        { id: 1, text: '3' },
        { id: 2, text: '4' },
        { id: 3, text: '5' },
      ],
    },
    {
      id: 102,
      text: 'test question',
      answers: [
        { id: 4, text: 'test1' },
        { id: 5, text: 'test2' },
        { id: 6, text: 'test3' },
      ],
    },
  ],
  company: 1,
};

// Mocked redux thunks
jest.mock('../store/quizzes/quizzes.actions', () => ({
  fetchQuizzes: {
    pending: 'quizzes/fetchQuizzes/pending',
    fulfilled: 'quizzes/fetchQuizzes/fulfilled',
    rejected: 'quizzes/fetchQuizzes/rejected',
  },
  fetchQuizById: Object.assign(
    jest.fn(() => ({
      type: 'quizzes/fetchQuizById/fulfilled',
      payload: mockQuiz,
    })),
    {
      pending: 'quizzes/fetchQuizById/pending',
      fulfilled: 'quizzes/fetchQuizById/fulfilled',
      rejected: 'quizzes/fetchQuizById/rejected',
    },
  ),
  createQuiz: {
    pending: 'quizzes/createQuiz/pending',
    fulfilled: 'quizzes/createQuiz/fulfilled',
    rejected: 'quizzes/createQuiz/rejected',
  },
  editQuiz: {
    pending: 'quizzes/editQuiz/pending',
    fulfilled: 'quizzes/editQuiz/fulfilled',
    rejected: 'quizzes/editQuiz/rejected',
  },
  deleteQuiz: {
    pending: 'quizzes/deleteQuiz/pending',
    fulfilled: 'quizzes/deleteQuiz/fulfilled',
    rejected: 'quizzes/deleteQuiz/rejected',
  },
}));

describe('QuizPage Component', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        quizzes: quizzesReducer,
      },
      preloadedState: {
        quizzes: {
          loading: false,
          selectedQuiz: mockQuiz,
          quizzes: [],
          error: null,
        },
      },
    });
  });

  test('renders the quiz page with questions and answers', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <QuizPage />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Test Quiz')).toBeInTheDocument();
      expect(screen.getByText('test description')).toBeInTheDocument();
      expect(screen.getByText('2 + 2')).toBeInTheDocument();
      expect(screen.getByText('test question')).toBeInTheDocument();
    });
  });

  test('renders submit and cancel buttons', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <QuizPage />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('quizzes.submit')).toBeInTheDocument();
      expect(screen.getByText('quizzes.cancel')).toBeInTheDocument();
    });
  });

  test('selecting an answer updates the state', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <QuizPage />
        </BrowserRouter>
      </Provider>,
    );

    const answerRadio = screen.getByLabelText('4');
    userEvent.click(answerRadio);

    await waitFor(() => {
      expect(answerRadio.checked).toBe(true);
    });
  });

  test('clicking the cancel button navigates to the company profile', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <QuizPage />
        </BrowserRouter>
      </Provider>,
    );

    await waitFor(() => screen.getByText('Test Quiz'));

    const cancelButton = screen.getByText('quizzes.cancel');
    userEvent.click(cancelButton);

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.COMPANY_PROFILE(mockQuiz.company));
  });
});
