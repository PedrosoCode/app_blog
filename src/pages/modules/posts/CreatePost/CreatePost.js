import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

function CreatePost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');

        axios.post('http://localhost:3042/api/posts', { title, content }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Post criado com sucesso:', response.data);
            setTitle('');
            setContent('');
        })
        .catch(error => {
            console.error('Erro ao criar post:', error);
        });
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Criar Post</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle" className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        required 
                        placeholder="Digite o título do post"
                    />
                </Form.Group>
                <Form.Group controlId="formContent" className="mb-3">
                    <Form.Label>Conteúdo</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={5} 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        required 
                        placeholder="Digite o conteúdo do post"
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Criar</Button>
            </Form>
        </Container>
    );
}

export default CreatePost;
