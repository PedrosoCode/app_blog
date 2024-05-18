import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';

function ManageImages() {
    const [images, setImages] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    const fetchImages = () => {
        const token = localStorage.getItem('token');

        axios.get('http://localhost:3042/api/images', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setImages(response.data);
        })
        .catch(error => {
            console.error('Erro ao buscar imagens:', error);
        });
    };

    useEffect(() => {
        fetchImages();
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleUpload = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.error('Token não encontrado');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        axios.post('http://localhost:3042/api/upload', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log('Imagem enviada com sucesso:', response.data);
            setSelectedFile(null);
            fetchImages(); // Atualiza a lista de imagens após upload
        })
        .catch(error => {
            console.error('Erro ao enviar imagem:', error);
        });
    };

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');

        axios.delete(`http://localhost:3042/api/images/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log('Imagem deletada com sucesso:', response.data);
            fetchImages(); // Atualiza a lista de imagens após deleção
        })
        .catch(error => {
            console.error('Erro ao deletar imagem:', error);
        });
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Gerenciar Imagens</h1>
            <Form onSubmit={handleUpload}>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Enviar Imagem</Form.Label>
                    <Form.Control type="file" onChange={handleFileChange} required />
                </Form.Group>
                <Button variant="primary" type="submit">Enviar</Button>
            </Form>
            <Row className="mt-4">
                {images.map(image => (
                    <Col key={image.id} md={4} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={`http://localhost:3042${image.path}`} /> {/* Ajuste a URL aqui */}
                            <Card.Body>
                                <Button variant="danger" onClick={() => handleDelete(image.id)}>Deletar</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default ManageImages;
