import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      axios.get('http://localhost:3042/api/auth/verifyToken', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        setIsAuthenticated(true);
        setIsAdmin(response.data.role === 'adm');
        setIsLoading(false);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/conta" />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
