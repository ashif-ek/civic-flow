import axios from 'axios';

// Use explicit Railway backend URL in production, or fallback to relative /api for local dev proxy
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (window.location.hostname.includes('vercel.app') 
    ? 'https://civicflow-backend-production.up.railway.app/api' 
    : '/api');

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('civicflow_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
        localStorage.removeItem('civicflow_token');
        localStorage.removeItem('civicflow_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
