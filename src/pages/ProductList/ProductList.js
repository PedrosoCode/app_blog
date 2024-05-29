import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3042/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar produtos:', error);
                setError('Erro ao buscar produtos.');
            });
    }, []);

    return (
        <Container>
            <h1 className="my-4">Produtos Disponíveis</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <Row>
                {products.map(product => (
                    <Col key={product.id} md={4} className="mb-4">
                        <Card>
                            {product.image_path && (
                                <Card.Img variant="top" src={`http://localhost:3042${product.image_path}`} />
                            )}
                            <Card.Body>
                                <Card.Title>{product.titulo}</Card.Title>
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
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ProductList;
