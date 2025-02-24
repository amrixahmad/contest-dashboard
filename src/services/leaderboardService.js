import axios from 'axios';

export const leaderboardService = {
  // Get leaderboard data
  getLeaderboard: async () => {
    try {
      const response = await axios.get('/leaderboard/');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};
