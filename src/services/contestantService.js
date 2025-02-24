import axios from 'axios';

export const contestantService = {
  // Get all contestants
  getAllContestants: async () => {
    try {
      const response = await axios.get('/auth/contestants');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Delete a contestant
  deleteContestant: async (userId) => {
    try {
      const response = await axios.delete(`/auth/contestant/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
