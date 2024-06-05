import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:3042/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
                setError('Erro ao buscar produtos.');
            });
    };

    const handleAddToCart = (productId) => {
        axios.post('http://localhost:3042/api/carrinho', { produto_id: productId, quantidade: 1 })
            .then(response => {
                alert('Produto adicionado ao carrinho!');
            })
            .catch(error => {
                console.error('Erro ao adicionar produto ao carrinho:', error);
                alert('Erro ao adicionar produto ao carrinho.');
            });
    };

    const handleSearch = () => {
        let query = `http://localhost:3042/api/products?title=${searchTitle}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
        axios.get(query)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
                setError('Erro ao buscar produtos.');
            });
    };

    return (
        <Container>
            <h1 className="my-4">Produtos Disponíveis</h1>
            {error && <div className="alert alert-danger">{error}</div>}
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
                <Form.Group controlId="minPrice">
                    <Form.Label>Preço mínimo</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Preço mínimo"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="maxPrice">
                    <Form.Label>Preço máximo</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Preço máximo"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" onClick={handleSearch}>
                    Filtrar
                </Button>
            </Form>
            <Row>
                {products.map(product => (
                    <Col key={product.id} md={4} className="mb-4">
                        <Card>
                            {product.image_path && (
                                <Card.Img variant="top" src={`http://localhost:3042${product.image_path}`} />
                            )}
                            <Card.Body>
                                <Card.Title style={{ cursor: 'pointer' }} onClick={() => navigate(`/produtos/${product.id}`)}>
                                    {product.titulo}
                                </Card.Title>
                                <Card.Text>{product.descricao}</Card.Text>
                                <Card.Text>
                                    <strong>Preço: </strong>{product.preco}
                                </Card.Text>
                                <Card.Text>
                                    <small className="text-muted">
                                        Por usuário {product.user_id}
                                        <br />
                                        id {product.id}
                                    </small>
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleAddToCart(product.id)}>
                                    <FaCartPlus /> Adicionar ao Carrinho
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductList;
