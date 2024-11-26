import axiosInstance from "../utils/axiosInstance";

const QUIZ_URL = 'api/quiz/quizzes/';

const QuizService = {
  async getQuizzes(companyId) {
    try {
      const response = await axiosInstance.get(`${QUIZ_URL}`, {
        params: { company: companyId },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching quizzes:', error);
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
};

export default QuizService;
