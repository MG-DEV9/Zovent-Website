import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Auto-attach JWT for admin requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('say_token');
  if (token) config.headers.Authorization = 'Bearer ' + token;
  return config;
});

// Public
export const fetchPayment    = id        => api.get('/payments/' + id);

// Razorpay
export const createOrder     = data      => api.post('/razorpay/create-order', data);
export const verifyPayment   = data      => api.post('/razorpay/verify', data);

// Admin
export const adminLogin      = creds     => api.post('/admin/login', creds);
export const getDashboard    = ()        => api.get('/admin/dashboard');
export const getAllPayments   = params    => api.get('/payments', { params });
export const createPayment   = data      => api.post('/payments', data);
export const updatePayment   = (id, d)   => api.put('/payments/' + id, d);
export const deletePayment   = id        => api.delete('/payments/' + id);

export default api;
