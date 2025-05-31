import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

const api = {
  // Product related endpoints
  searchProduct: async (name) => {
    try {
      const response = await axiosInstance.get(`/products/search?name=${encodeURIComponent(name)}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getAllProducts: async () => {
    try {
      const response = await axiosInstance.get('/products');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Environmental Impact related endpoints
  getEnvironmentalImpact: async (productId) => {
    try {
      const response = await axiosInstance.get(`/environmental-impacts/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search History related endpoints
  getSearchHistory: async () => {
    try {
      const response = await axiosInstance.get('/search-history');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  saveSearchHistory: async (searchQuery) => {
    try {
      const response = await axiosInstance.post('/search-history', {
        searchQuery,
        timestamp: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api; 