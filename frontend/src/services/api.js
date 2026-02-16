/**
 * API Service for Frontend
 * Centralized API communication
 */

import axios from 'axios';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth tokens here if needed
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errorData = {
      message: 'An error occurred',
      statusCode: error.response?.status || 500,
      details: error.response?.data?.error || error.message,
    };

    console.error('API Error:', errorData);
    return Promise.reject(errorData);
  }
);

/**
 * Health Check Service
 */
export const healthService = {
  check: () => apiClient.get('/health'),
};

/**
 * Query Service
 */
export const queryService = {
  getAll: () => apiClient.get('/queries'),
  send: (query, patientId) =>
    apiClient.post('/query', { query, patientId }),
};

/**
 * Patient Service
 */
export const patientService = {
  getList: () => apiClient.get('/patients/list'),
  getById: (patientId) => apiClient.get(`/patients/${patientId}`),
};

export default apiClient;
