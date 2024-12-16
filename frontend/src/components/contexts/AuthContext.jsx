import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

// Custom hook for accessing AuthContext
export const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('accessToken');
    return token ? { token } : null;
  });

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username,
        password,
      });
      const { access, refresh } = response.data;
      localStorage.setItem('accessToken', access);
      localStorage.setItem('refreshToken', refresh);
      setUser({ username });
      return true; // Login successful
    } catch (error) {
      console.error(`Login failed.\nCode: ${error.code} \nMessage: ${error.message} \nStatus: ${error.response?.status}`);
      alert(`Login failed, status code: ${error.response?.status}`);
      // const errorMessage = error.response?.data?.detail || 'Login failed';
      // const var = error.response?.status === 401 ? 'Invalid credentials' : errorMessage;
      // alert(var)
      return false; // Login failed
    }
  };

  const logout = (navigate) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    if(navigate) navigate('/');
    
  };

  const isAuthenticated = !!user;

  // Rehydrate user state on app load
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && !user) {
      setUser({ token }); // Set user if token exists
    }
  }, [user]);

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
