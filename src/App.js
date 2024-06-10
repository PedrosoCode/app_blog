import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage/HomePage';
import AboutPage from './pages/AboutPage/AboutPage';
import SignupLogin from './pages/Account/SignupLogin';
import ProtectedPage from './pages/ProtectedPage.js/ProtectedPage';
import LogoutPage from './pages/LogoutPage/LogoutPage';
import PrivateRoute from './components/PrivateRoute';
import CartList from './pages/CartList/CartList';
import OrderList from './pages/OrderList/OrderList';

import MainNavbar from './components/MainNavbar/MainNavbar';
import MainFooter from './components/MainFooter/MainFooter';
import CreatePost from './pages/CreatePost/CreatePost';
import EditPost from './pages/EditPost/EditPost';
import PostList from './pages/PostList/PostList';
import PostDetail from './pages/PostDetail/PostDetail';
import AllPostsList from './pages/AllPostsList/AllPostsList';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import OrderDetail from './pages/OrderDetail/OrderDetail';

import UpdateDeleteProduct from './pages/UpdateDeleteProduct/UpdateDeleteProduct';

import ProductList from './pages/ProductList/ProductList';
import CreateProduct from './pages/CreateProduct/CreateProduct';

import ManageImages from './pages/ManageImages/ManageImages';
import AdminFooterPage from './pages/AdminFooterPage/AdminFooterPage';

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

//REVIEW - URL do roteamento para acessar páginas de forma mais intuitiva
//REVIEW - aprender a usar Salt para que senhas iguais não tenham a mesma hash
//TODO - Adicionar suporte a Markdown nos posts 
//TODO - Criar uma imagem de placeholder para ser usada, em situações onde uma imagem não está definida
//FIXME - rever a hierarquia de pastas para ter um front mais organizado

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home </Link>
        <Link to="/about"> About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/conta" element={<SignupLogin />} />
        <Route path="/logout" element={<PrivateRoute><LogoutPage /></PrivateRoute>} /> 
        <Route path="/protected" element={<PrivateRoute><ProtectedPage /></PrivateRoute>} />
        <Route path="/criar" element={<CreatePost />} />
        <Route path="/editar/:postId" element={<EditPost />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/lista" element={<PostList />} />
        <Route path="/listaTudo" element={<AllPostsList />} />
        <Route path="/img" element={<ManageImages />} />
        <Route path="/footer" element={<PrivateRoute adminOnly={true}><AdminFooterPage /></PrivateRoute>} /> 
        <Route path="/produtos" element={<ProductList />} />
        <Route path="/carrinho" element={<CartList />} />
        <Route path="/criarproduto" element={<PrivateRoute><CreateProduct /></PrivateRoute>} /> 
        <Route path="/modpd/:id" element={<UpdateDeleteProduct />} />
        <Route path="/pedidos" element={<PrivateRoute><OrderList /></PrivateRoute>} /> 
        <Route path="/produtos/:productId" element={<ProductDetail />} />
        <Route path="/pedidos/:orderId" element={<PrivateRoute><OrderDetail /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
