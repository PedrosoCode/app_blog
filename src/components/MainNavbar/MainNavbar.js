import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

//REVIEW - verificar de deixar menus dinâmicos

function MainNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/protected">
              <Nav.Link>Protected</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/logout">
              <Nav.Link>Logout</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Posts" id="posts-nav-dropdown">
              <LinkContainer to="/criar">
                <NavDropdown.Item>Criar Post</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/editar">
                <NavDropdown.Item>Editar Post</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/lista">
                <NavDropdown.Item>Lista de Posts</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/listaTudo">
                <NavDropdown.Item>Todos os Posts</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <NavDropdown title="Produtos" id="products-nav-dropdown">
              <LinkContainer to="/produtos">
                <NavDropdown.Item>Lista de Produtos</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/criarproduto">
                <NavDropdown.Item>Criar Produto</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/modpd">
                <NavDropdown.Item>Modificar Produto</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            <LinkContainer to="/carrinho">
              <Nav.Link>Carrinho</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/pedidos">
              <Nav.Link>Pedidos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/img">
              <Nav.Link>Gerenciar Imagens</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/footer">
              <Nav.Link>Footer Admin</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
