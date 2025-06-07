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

  // Category Impact Stats
  getCategoryImpactStats: async () => {
    try {
      const response = await axiosInstance.get('/categories/impact-stats');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Brand Impact
  getBrandImpact: async (brand) => {
    try {
      const response = await axiosInstance.get(`/brands/${encodeURIComponent(brand)}/impact`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Top Eco-Friendly Products
  getTopEcoFriendlyProducts: async (limit = 10) => {
    try {
      const response = await axiosInstance.get(`/products/eco-friendly?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api; 