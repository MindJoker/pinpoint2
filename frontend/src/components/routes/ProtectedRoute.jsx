import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  // console.log("Is Authenticated:", isAuthenticated); // Debugging line
  // console.log("Children:", children);

  if (!isAuthenticated) {
    return <Navigate to="/" />; // Redirect to login if not authenticated
  }

  return children;
};

export default ProtectedRoute;
