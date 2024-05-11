import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Tab, Nav, Row, Col, Form, Button } from 'react-bootstrap';

function SignupLogin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3042/auth/signup', {
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
      const response = await axios.post('http://localhost:3042/auth/login', {
        username, password
      });
      console.log('Resposta do login:', response.data);
      // Salvar o token no localStorage
      localStorage.setItem('token', response.data.token);
      // Redirecionar o usuário ou fazer outra ação pós-login
    } catch (error) {
      console.error('Erro ao logar:', error.response.data);
    }
  };

  return (
    <Container className="mt-5">
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
                <Form.Label>Nome de usuário ou Email</Form.Label>
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
