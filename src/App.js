import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

import './pages/modules/misc/CardBoard/CardBoard.css'

// Pages
import HomePage from './pages/modules/pages/HomePage/HomePage';
import AboutPage from './pages/modules/pages/AboutPage/AboutPage';
import SignupLogin from './pages/modules/auth/Account/SignupLogin';
import ProtectedPage from './pages/modules/pages/ProtectedPage.js/ProtectedPage';
import LogoutPage from './pages/modules/auth/LogoutPage/LogoutPage';

import CreatePost from './pages/modules/posts/CreatePost/CreatePost';
import EditPost from './pages/modules/posts/EditPost/EditPost';
import PostList from './pages/modules/posts/PostList/PostList';
import PostDetail from './pages/modules/posts/PostDetail/PostDetail';
import AllPostsList from './pages/modules/posts/AllPostsList/AllPostsList';

import ProductDetail from './pages/modules/shop/ProductDetail/ProductDetail';
import UpdateDeleteProduct from './pages/modules/shop/UpdateDeleteProduct/UpdateDeleteProduct';
import ProductList from './pages/modules/shop/ProductList/ProductList';
import CreateProduct from './pages/modules/shop/CreateProduct/CreateProduct';

import ManageImages from './pages/modules/misc/ManageImages/ManageImages';
import AdminFooterPage from './pages/modules/admin/AdminFooterPage/AdminFooterPage';

import OrderDetail from './pages/modules/shop/cart/OrderDetail/OrderDetail';
import CartList from './pages/modules/shop/cart/CartList/CartList';
import OrderList from './pages/modules/shop/cart/OrderList/OrderList';

import CardBoard from './pages/modules/misc/CardBoard/CardBoard';

import CreateWeaponForm from './pages/modules/rpg/CreateWeaponForm';

// Components
import MainNavbar from './components/MainNavbar/MainNavbar';
import MainFooter from './components/MainFooter/MainFooter';
import PrivateRoute from './components/PrivateRoute';

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

// REVIEW - URL do roteamento para acessar páginas de forma mais intuitiva
// REVIEW - aprender a usar Salt para que senhas iguais não tenham a mesma hash
// REVIEW - impedir que todo o conteúdo no post seja mostrado na página de listagem, para melhor organização

// TODO - Adicionar suporte a Markdown nos posts 
// TODO - Criar uma imagem de placeholder para ser usada, em situações onde uma imagem não está definida
// TODO - módulo de financeiro - contas a pagar, a receber, lançamento e baixa 

//Modulo rpg de mesa
//TODO - DELETE de armas
//TODO - UPDATE de armas
//TODO - Visualizar geral, e único de armas

//TODO - ferramenta de cálculo automático de rolagem de armas 

//TODO - Implementar módulo de ficha de personagem

//FIXME - implementar lazyloading para melhor otimização
//FIXME - editar na página /lista não funciona, apenas o delete

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

        <Route path="/rpg-arma" element={<CreateWeaponForm />} />
        <Route path="/card" element={<CardBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
