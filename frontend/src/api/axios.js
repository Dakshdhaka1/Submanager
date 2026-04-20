import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
});

// Automatically attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const registerUser = (data) => API.post('/api/auth/register', data);
export const loginUser = (data) => API.post('/api/auth/login', data);

// Subscription API
export const getSubscriptions = () => API.get('/api/subscriptions');
export const getSubscriptionById = (id) => API.get(`/api/subscriptions/${id}`);
export const createSubscription = (data) => API.post('/api/subscriptions', data);
export const updateSubscription = (id, data) => API.put(`/api/subscriptions/${id}`, data);
export const deleteSubscription = (id) => API.delete(`/api/subscriptions/${id}`);
export const cancelSubscription = (id) => API.patch(`/api/subscriptions/${id}/cancel`);
export const activateSubscription = (id) => API.patch(`/api/subscriptions/${id}/activate`);

// Summary & Renewals
export const getExpenseSummary = () => API.get('/api/subscriptions/summary');
export const getUpcomingRenewals = (days = 7) => API.get(`/api/subscriptions/renewals?days=${days}`);

// Google OAuth URL
export const GOOGLE_AUTH_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/oauth2/authorization/google`;

export default API;
