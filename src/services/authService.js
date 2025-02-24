import axios from 'axios';

export const authService = {
  // Register a new stakeholder
  register: async (username, password) => {
    try {
      const response = await axios.post('/auth/stakeholder/register', {
        username,
        password
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Login stakeholder and get token
  login: async (username, password) => {
    try {
      // Create form data
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post('/auth/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      // Format the response to match what the AuthContext expects
      return {
        token: response.data.access_token,
        user: { username }
      };
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  // Verify if token is still valid
  verifyToken: async (token) => {
    try {
      const response = await axios.get('/auth/token/verify', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      return false;
    }
  }
};
