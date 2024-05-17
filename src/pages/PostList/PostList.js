import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Modal } from 'react-bootstrap';

function PostList() {
    const [posts, setPosts] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get('http://localhost:3042/api/user/posts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setPosts(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                setShowModal(true);
            } else {
                console.error('Erro ao buscar posts:', error);
            }
        });
    }, []);

    const editPost = (postId) => {
        // Implementar lógica de edição
    };

    const deletePost = (postId) => {
        const token = localStorage.getItem('token');

        axios.delete(`http://localhost:3042/api/posts/${postId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Post deletado com sucesso');
            setPosts(posts.filter(post => post.id !== postId));
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                setShowModal(true);
            } else {
                console.error('Erro ao deletar post:', error);
            }
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container>
            <h1 className="my-4">Posts</h1>
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
                                <Button variant="primary" onClick={() => editPost(post.id)} className="me-2">
                                    Editar
                                </Button>
                                <Button variant="danger" onClick={() => deletePost(post.id)}>
                                    Deletar
                                </Button>
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
                    <p>Você não tem permissão para acessar esta página.</p>
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

export default PostList;
