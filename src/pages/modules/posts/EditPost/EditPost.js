import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert, Modal } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function EditPost() {
    const { postId } = useParams(); // Obter postId dos parâmetros da URL
    const [post, setPost] = useState({ title: '', content: '' });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.get(`http://localhost:3042/api/posts/${postId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setPost(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                setShowModal(true);
            } else {
                console.error('Erro ao buscar post:', error);
                setError('Erro ao buscar post');
            }
        });
    }, [postId]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        axios.put(`http://localhost:3042/api/posts/${postId}`, post, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Post atualizado com sucesso:', response.data);
            setSuccess('Post atualizado com sucesso');
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                setShowModal(true);
            } else {
                console.error('Erro ao atualizar post:', error);
                setError('Erro ao atualizar post');
            }
        });
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <Container>
            <h1>Editar Post</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formContent">
                    <Form.Label>Conteúdo</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        rows={5}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Atualizar
                </Button>
            </Form>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Acesso Negado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Você não tem permissão para editar este post.</p>
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

export default EditPost;
