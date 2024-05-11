import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import SignupLogin from './pages/Account/SignupLogin';
import ProtectedPage from './pages/ProtectedPage.js/ProtectedPage';
import LogoutPage from './pages/LogoutPage/LogoutPage';
import PrivateRoute from './components/PrivateRoute';

import MainNavbar from './components/MainNavbar/MainNavbar';
import MainFooter from './components/MainFooter/MainFooter';

// Configurar o Axios para adicionar o token JWT em todas as requisições
axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/conta" element={<SignupLogin />} />
        <Route path="/logout" element={<PrivateRoute><LogoutPage /></PrivateRoute>} />
        <Route path="/protected" element={<PrivateRoute><ProtectedPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;