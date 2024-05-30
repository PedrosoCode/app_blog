import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const CreateProduct = () => {
    const [product, setProduct] = useState({ titulo: '', descricao: '', especificacoes_tecnicas: '', preco: '' });
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('titulo', product.titulo);
        formData.append('descricao', product.descricao);
        formData.append('especificacoes_tecnicas', product.especificacoes_tecnicas);
        formData.append('preco', product.preco);

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await axios.post('http://localhost:3042/api/products', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess('Produto criado com sucesso');
            setProduct({ titulo: '', descricao: '', especificacoes_tecnicas: '', preco: '' });
            setImage(null);
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            setError('Erro ao criar produto');
        }
    };

    return (
        <Container>
            <h1 className="my-4">Criar Produto</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                        type="text"
                        name="titulo"
                        value={product.titulo}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="descricao"
                        value={product.descricao}
                        onChange={handleChange}
                        rows={3}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formTechSpecs">
                    <Form.Label>Especificações Técnicas</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="especificacoes_tecnicas"
                        value={product.especificacoes_tecnicas}
                        onChange={handleChange}
                        rows={3}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formPrice">
                    <Form.Label>Preço</Form.Label>
                    <Form.Control
                        type="number"
                        name="preco"
                        value={product.preco}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formImage">
                    <Form.Label>Imagem (opcional)</Form.Label>
                    <Form.Control
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Criar Produto
                </Button>
            </Form>
        </Container>
    );
};

export default CreateProduct;
