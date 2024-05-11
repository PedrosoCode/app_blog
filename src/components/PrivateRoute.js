import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  // Supondo que o token esteja armazenado em localStorage
  const token = localStorage.getItem('token');
  const isAuthenticated = token != null;

  // Se não estiver autenticado, redireciona para a página de login
  return isAuthenticated ? children : <Navigate to="/conta" />;
}

export default PrivateRoute;
