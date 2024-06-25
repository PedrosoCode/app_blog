import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function AllPostsList() {
  const [posts, setPosts] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [showModal, setShowModal] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL; // Obtém a URL base da API a partir das variáveis de ambiente

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    let query = `${apiUrl}/api/posts?title=${searchTitle}&author=${searchAuthor}`;
    axios.get(query)
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        if (error.response && error.response.status === 403) {
          setShowModal(true);
          setErrorMessage('Você não tem permissão para acessar esta página.');
        } else {
          console.error('Erro ao buscar posts:', error);
          setErrorMessage('Erro ao buscar posts.');
        }
      });
  };

  const handleSearch = () => {
    fetchPosts();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container>
      <h1 className="my-4">Todos os Posts</h1>
      <Form className="mb-4">
        <Form.Group controlId="searchTitle">
          <Form.Label>Buscar por título</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o título"
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="searchAuthor">
          <Form.Label>Buscar por autor</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o ID do autor"
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSearch}>
          Filtrar
        </Button>
      </Form>
      <Row>
        {posts.map(post => (
          <Col key={post.id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>
                  <Link to={`/posts/${post.id}`}>{post.title}</Link>
                </Card.Title>
                <Card.Text dangerouslySetInnerHTML={{ __html: post.content }} />
                <Card.Text>
                  <small className="text-muted">
                    Por {post.user_id} em {new Date(post.created_at).toLocaleDateString()}
                  </small>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Acesso Negado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{errorMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AllPostsList;
