import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { FaCartPlus } from 'react-icons/fa';

const ProductDetail = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // Certifique-se de que 'quantity' está definido
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:3042/api/products/${productId}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar produto:', error);
                setError('Erro ao buscar produto.');
            });
    }, [productId]);

    const handleAddToCart = () => {
        axios.post('http://localhost:3042/api/carrinho', { produto_id: product.id, quantidade: quantity }) // Usar 'quantity' aqui
            .then(response => {
                alert('Produto adicionado ao carrinho!');
                navigate('/carrinho');
            })
            .catch(error => {
                console.error('Erro ao adicionar produto ao carrinho:', error);
                alert('Erro ao adicionar produto ao carrinho.');
            });
    };

    if (!product) return <div>Carregando...</div>;

    return (
        <Container>
            <Row className="my-4">
                <Col md={6}>
                    {product.image_path && (
                        <Card.Img variant="top" src={`http://localhost:3042${product.image_path}`} />
                    )}
                </Col>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{product.titulo}</Card.Title>
                            <Card.Text>{product.descricao}</Card.Text>
                            <Card.Text>
                                <strong>Preço: </strong>R$ {product.preco.toFixed(2)}
                            </Card.Text>
                            <Card.Text>{product.especificacoes_tecnicas}</Card.Text>
                            <Form.Group controlId="quantity">
                                <Form.Label>Quantidade</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    min="1"
                                />
                            </Form.Group>
                            <Button variant="primary" onClick={handleAddToCart} className="mt-3">
                                <FaCartPlus /> Adicionar ao Carrinho
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {error && <div className="alert alert-danger">{error}</div>}
        </Container>
    );
};

export default ProductDetail;
