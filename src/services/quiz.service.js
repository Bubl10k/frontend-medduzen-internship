import axiosInstance from '../utils/axiosInstance';

const QUIZ_URL = 'api/quiz/quizzes/';

const QuizService = {
  async getQuizzes(companyId, page = 1) {
    try {
      const response = await axiosInstance.get(`${QUIZ_URL}`, {
        params: { company: companyId, page },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      throw error;
    }
  },

  async getQuizzById(quizId) {
    try {
      const response = await axiosInstance.get(`${QUIZ_URL}${quizId}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching quiz:', error);
      throw error;
    }
  },

  async createQuiz(data) {
    try {
      const response = await axiosInstance.post(`${QUIZ_URL}`, data);
      return response.data;
    } catch (error) {
      console.error('Error creating quiz:', error);
      throw error;
    }
  },

  async updateQuiz(quizId, data) {
    try {
      const response = await axiosInstance.put(`${QUIZ_URL}${quizId}/`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating quiz:', error);
      throw error;
    }
  },

  async deleteQuiz(quizId) {
    try {
      const response = await axiosInstance.delete(`${QUIZ_URL}${quizId}/`);
      return response.data;
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw error;
    }
  },

  async startQuiz(quizId) {
    try {
      const response = await axiosInstance.post(
        `${QUIZ_URL}${quizId}/start-quiz/`,
      );
      return response.data;
    } catch (error) {
      console.error('Error starting quiz:', error);
      throw error;
    }
  },

  async completeQuiz(quizId, data) {
    try {
      const response = await axiosInstance.post(
        `${QUIZ_URL}${quizId}/complete-quiz/`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error('Error completing quiz:', error);
      throw error;
    }
  },

  async getScores() {
    try {
      const response = await axiosInstance.get(`${QUIZ_URL}all-users-scores/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching average scores:', error);
      throw error;
    }
  },

  async getUserScores(userId) {
    try {
      const response = await axiosInstance.get(
        `${QUIZ_URL}average-user-scores/`,
        {
          params: { user: userId },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user scores:', error);
      throw error;
    }
  },

  async getUserQuizResults(fileFormat) {
    try {
      const response = await axiosInstance.get(
        `${QUIZ_URL}export-user-results/`,
        {
          params: { file_format: fileFormat },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user quiz results:', error);
      throw error;
    }
  },

  async getQuizResults(quizId, fileFormat) {
    try {
      const response = await axiosInstance.get(
        `${QUIZ_URL}${quizId}/export-quiz-results/`,
        {
          params: { file_format: fileFormat },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching quiz results:', error);
      throw error;
    }
  }
};

export default QuizService;
