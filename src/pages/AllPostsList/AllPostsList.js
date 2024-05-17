import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';

function AllPostsList() {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3042/api/posts')
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
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container>
            <h1 className="my-4">Todos os Posts</h1>
            <Row>
                {posts.map(post => (
                    <Col key={post.id} md={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.content}</Card.Text>
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
