import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';

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
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <LinkContainer to="/criar">
                <NavDropdown.Item>Criar Post</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/editar/:postId">
                <NavDropdown.Item>Editar Post</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/lista">
                <NavDropdown.Item>Lista de Posts</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Divider />
              <LinkContainer to="/listaTudo">
                <NavDropdown.Item>Todos os Posts</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
