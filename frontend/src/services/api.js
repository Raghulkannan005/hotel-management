import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance with base URL
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Remove /api prefix if using the deployed backend
const apiPrefix = baseURL.includes('vercel.app') ? '' : '/api';

const api = axios.create({
  baseURL: `${baseURL}${apiPrefix}`,
  headers: {
    'Content-Type': 'application/json',
  },
  // Disable credentials for CORS
  withCredentials: false
});

// Request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log request for debugging
    console.log('API Request:', config.method.toUpperCase(), config.url);
    
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Create a standardized error object
    const errorResponse = {
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'An unexpected error occurred',
      errors: error.response?.data?.errors || []
    };
    
    // Log error for debugging
    console.error('API Error:', errorResponse);
    
    // Handle CORS errors
    if (error.message === 'Network Error') {
      console.error('Network Error Details:', error);
      toast.error('Network error: Could not connect to the server. This might be a CORS issue.');
      return Promise.reject({ message: 'Network error: Could not connect to the server' });
    }
    
    // Handle specific error codes
    if (errorResponse.status === 401) {
      // Unauthorized - clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    } else if (errorResponse.status === 403) {
      // Forbidden - redirect to home or show permission error
      toast.error('You do not have permission to perform this action');
    } else if (errorResponse.status === 404) {
      // Not found 
      toast.error('The requested resource was not found');
    } else if (errorResponse.status === 422 || errorResponse.status === 400) {
      // Validation errors - show detailed validation errors
      if (errorResponse.errors.length > 0) {
        errorResponse.errors.forEach(err => {
          toast.error(err.msg || err.message);
        });
      } else {
        toast.error(errorResponse.message);
      }
    } else {
      // Generic error message
      toast.error(errorResponse.message);
    }
    
    return Promise.reject(errorResponse);
  }
);

export default api; 