import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Tab, Nav, Row, Col, Form, Button, Modal } from 'react-bootstrap';

function SignupLogin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false); // Estado para controlar a visibilidade do modal
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3042/api/auth/signup', {
        username, email, password
      });
      console.log('Resposta do cadastro:', response.data);
    } catch (error) {
      console.error('Erro ao cadastrar:', error.response ? error.response.data : 'Erro desconhecido');
    }
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3042/api/auth/login', {
        username, password
      });
      console.log('Resposta do login:', response.data);
      localStorage.setItem('token', response.data.token);
      setShowModal(true); // Abrir o modal após o login bem-sucedido
    } catch (error) {
      console.error('Erro ao logar:', error.response.data);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    navigate('/'); // Redirecionar para a home após fechar o modal
  };

  return (
    <Container className="mt-5">
      {/* Modal de Feedback */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login bem-sucedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>Você foi logado com sucesso! Bem-vindo ao sistema.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      <Tab.Container defaultActiveKey="signup">
        <Nav variant="pills" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="signup">Cadastrar-se</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="login">Login</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="signup">
            <Form onSubmit={handleSignup}>
              <Form.Group className="mb-3">
                <Form.Label>Nome de usuário</Form.Label>
                <Form.Control type="text" placeholder="Digite seu nome de usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit">Cadastrar-se</Button>
            </Form>
          </Tab.Pane>
          <Tab.Pane eventKey="login">
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Nome de usuário</Form.Label>
                <Form.Control type="text" placeholder="Digite seu nome de usuário ou email" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Senha</Form.Label>
                <Form.Control type="password" placeholder="Digite sua senha" value={password} onChange={(e) => setPassword(e.target.value)} />
              </Form.Group>
              <Button variant="primary" type="submit">Login</Button>
            </Form>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}

export default SignupLogin;
