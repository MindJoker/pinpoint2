/* eslint-disable no-unused-vars */
// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:8000/api/', // Replace with your backend API's base URL
// });

// // Add an interceptor to attach the token to all requests
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => Promise.reject(error));

// // Handle token refresh on 401 errors
// api.interceptors.response.use((response) => response, async (error) => {
//   const originalRequest = error.config;

//   if (error.response && error.response.status === 401 && !originalRequest._retry) {
//     originalRequest._retry = true;
//     const refreshToken = localStorage.getItem('refreshToken');

//     if (refreshToken) {
//       try {
//         const response = await axios.post('http://localhost:8000/api/token/refresh/', {
//           refresh: refreshToken,
//         });
//         const { access } = response.data;

//         // Store the new access token
//         localStorage.setItem('accessToken', access);
//         axios.defaults.headers.common.Authorization = `Bearer ${access}`;

//         // Retry the original request
//         originalRequest.headers.Authorization = `Bearer ${access}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         console.error('Token refresh failed:', refreshError.response?.data || refreshError.message);
//         // Optional: Redirect to login page if token refresh fails
//         localStorage.removeItem('accessToken');
//         localStorage.removeItem('refreshToken');
//         window.location.href = '/';
//       }
//     }
//   }
//   return Promise.reject(error);
// });

// export default api;

import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Adjust to your backend's URL

// Operators API
export const fetchOperators = () => axios.get(`${API_URL}/operators/`);
export const createOperatorWithUser = (data) => axios.post(`${API_URL}/operators/`, data);
export const updateOperator = (id, data) => axios.put(`${API_URL}/operators/${id}/`);
export const deleteOperator = (id) => axios.delete(`${API_URL}/operators/${id}/`);
export const assignToOperator = (id, payload) => axios.post(`${API_URL}/operators/${id}/assign/`, payload);
export const revokeFromOperator = (id, payload) => axios.post(`${API_URL}/operators/${id}/revoke/`, payload);




