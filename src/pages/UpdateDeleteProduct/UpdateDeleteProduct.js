import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDeleteProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({ titulo: '', descricao: '', especificacoes_tecnicas: '', preco: '' });
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3042/api/products/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                setProduct(response.data);
            } catch (error) {
                console.error('Erro ao carregar produto:', error);
                setError('Erro ao carregar produto');
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpdate = async (e) => {
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
            const response = await axios.put(`http://localhost:3042/api/products/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            setSuccess('Produto atualizado com sucesso');
            setError(null);
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            setError('Erro ao atualizar produto');
            setSuccess(null);
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:3042/api/products/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            navigate('/products');
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            setError('Erro ao deletar produto');
        }
    };

    return (
        <Container>
            <h1 className="my-4">Atualizar/Excluir Produto</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleUpdate}>
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
                    Atualizar Produto
                </Button>
                <Button variant="danger" onClick={handleDelete} className="ml-2">
                    Deletar Produto
                </Button>
            </Form>
        </Container>
    );
};

export default UpdateDeleteProduct;
