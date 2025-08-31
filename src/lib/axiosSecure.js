import axios from 'axios';

export const axiosSecure = axios.create({
  //baseURL: 'https://joyscelond-backend.onrender.com',
  baseURL: 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000, // 10 seconds timeout
});

// Request interceptor
axiosSecure.interceptors.request.use(
  (config) => {
    // Add auth token if available (from localStorage, cookies, etc.)
    const token = localStorage.getItem('Authorization');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Response interceptor
// axiosSecure.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     // Handle common errors
//     if (error.response?.status === 401) {
//       // Handle unauthorized - redirect to login
//       localStorage.removeItem('Authorization');
//       window.location.href = '/login';
//     }
    
//     if (error.response?.status === 403) {
//       // Handle forbidden
//       console.error('Access forbidden');
//     }
    
//     if (error.response?.status >= 500) {
//       // Handle server errors
//       console.error('Server error occurred');
//     }
    
//     return Promise.reject(error);
//   }
// );

export default axiosSecure;