import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'; // Importando o ícone de "Remover do Carrinho"

const CartList = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3042/api/carrinho')
            .then(response => {
                setCartItems(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar itens do carrinho:', error);
                setError('Erro ao buscar itens do carrinho.');
            });
    }, []);

    const handleRemoveFromCart = (itemId) => {
        axios.delete(`http://localhost:3042/api/carrinho/${itemId}`)
            .then(response => {
                setCartItems(cartItems.filter(item => item.id !== itemId));
                alert('Item removido do carrinho!');
            })
            .catch(error => {
                console.error('Erro ao remover item do carrinho:', error);
                alert('Erro ao remover item do carrinho.');
            });
    };

    return (
        <Container>
            <h1 className="my-4">Meu Carrinho</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <Row>
                {cartItems.map(item => (
                    <Col key={item.id} md={4} className="mb-4">
                        <Card>
                            {item.image_path && (
                                <Card.Img variant="top" src={`http://localhost:3042${item.image_path}`} />
                            )}
                            <Card.Body>
                                <Card.Title>{item.titulo}</Card.Title>
                                <Card.Text>{item.descricao}</Card.Text>
                                <Card.Text>
                                    <strong>Preço: </strong>{item.preco_unitario}
                                </Card.Text>
                                <Card.Text>
                                    <strong>Quantidade: </strong>{item.quantidade}
                                </Card.Text>
                                <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
                                    <FaTrash /> Remover do Carrinho
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default CartList;
