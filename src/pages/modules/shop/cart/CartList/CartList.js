import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Button, Row, Col, Card } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

const CartList = () => {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = () => {
        axios.get('http://localhost:3042/api/carrinho')
            .then(response => {
                console.log('Cart items fetched:', response.data); // Debugging log
                setCartItems(response.data);
                calculateTotal(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar itens do carrinho:', error);
                setError('Erro ao buscar itens do carrinho.');
            });
    };

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.preco_unitario * item.quantidade, 0);
        setTotal(total);
    };

    const handleRemoveFromCart = (itemId) => {
        axios.delete(`http://localhost:3042/api/carrinho/${itemId}`)
            .then(response => {
                const updatedCartItems = cartItems.filter(item => item.id !== itemId);
                setCartItems(updatedCartItems);
                calculateTotal(updatedCartItems);
                alert('Item removido do carrinho!');
            })
            .catch(error => {
                console.error('Erro ao remover item do carrinho:', error);
                alert('Erro ao remover item do carrinho.');
            });
    };

    const handleUpdateQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) return;

        axios.put(`http://localhost:3042/api/carrinho/${itemId}`, { quantidade: newQuantity })
            .then(response => {
                const updatedCartItems = cartItems.map(item =>
                    item.id === itemId ? { ...item, quantidade: newQuantity } : item
                );
                setCartItems(updatedCartItems);
                calculateTotal(updatedCartItems);
            })
            .catch(error => {
                console.error('Erro ao atualizar quantidade do item:', error);
                alert('Erro ao atualizar quantidade do item.');
            });
    };

    const handleCheckout = () => {
        axios.post('http://localhost:3042/api/pedido')
            .then(response => {
                alert('Pedido fechado com sucesso!');
                setCartItems([]);
                setTotal(0);
            })
            .catch(error => {
                console.error('Erro ao fechar o pedido:', error.response.data);
                alert(`Erro ao fechar o pedido: ${error.response.data}`);
            });
    };
    

    return (
        <Container>
            <h1 className="my-4">Meu Carrinho</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            {cartItems.length === 0 && <div className="alert alert-info">Seu carrinho está vazio. Coloque alguns itens antes de fazer uma compra.</div>}
            <div className="d-none d-md-block">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Produto</th>
                            <th>Descrição</th>
                            <th>Preço Unitário</th>
                            <th>Quantidade</th>
                            <th>Total</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.id}>
                                <td>
                                    {item.image_path && (
                                        <img src={`http://localhost:3042${item.image_path}`} alt={item.titulo} style={{ width: '50px', height: '50px' }} />
                                    )}
                                </td>
                                <td>{item.titulo}</td>
                                <td>{item.descricao}</td>
                                <td>{item.preco_unitario.toFixed(2)}</td>
                                <td>
                                    <Button variant="light" onClick={() => handleUpdateQuantity(item.id, item.quantidade - 1)}>
                                        <FaMinus />
                                    </Button>
                                    {' '}
                                    {item.quantidade}
                                    {' '}
                                    <Button variant="light" onClick={() => handleUpdateQuantity(item.id, item.quantidade + 1)}>
                                        <FaPlus />
                                    </Button>
                                </td>
                                <td>{(item.preco_unitario * item.quantidade).toFixed(2)}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>
                                        <FaTrash /> Remover
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</td>
                            <td colSpan="2" style={{ fontWeight: 'bold' }}>{total.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </Table>
                <Button variant="success" onClick={handleCheckout} block="true">Fechar Pedido</Button>
            </div>
            <div className="d-block d-md-none">
                {cartItems.map(item => (
                    <Card key={item.id} className="mb-3">
                        <Card.Body>
                            <Row>
                                <Col xs={4}>
                                    {item.image_path && (
                                        <img src={`http://localhost:3042${item.image_path}`} alt={item.titulo} style={{ width: '100%', height: 'auto' }} />
                                    )}
                                </Col>
                                <Col xs={8}>
                                    <Card.Title>{item.titulo}</Card.Title>
                                    <Card.Text>{item.descricao}</Card.Text>
                                    <Card.Text><strong>Preço Unitário:</strong> R$ {item.preco_unitario.toFixed(2)}</Card.Text>
                                    <Card.Text><strong>Quantidade:</strong>
                                        <Button variant="light" size="sm" onClick={() => handleUpdateQuantity(item.id, item.quantidade - 1)}>
                                            <FaMinus />
                                        </Button>
                                        {' '}
                                        {item.quantidade}
                                        {' '}
                                        <Button variant="light" size="sm" onClick={() => handleUpdateQuantity(item.id, item.quantidade + 1)}>
                                            <FaPlus />
                                        </Button>
                                    </Card.Text>
                                    <Card.Text><strong>Total:</strong> R$ {(item.preco_unitario * item.quantidade).toFixed(2)}</Card.Text>
                                    <Button variant="danger" size="sm" onClick={() => handleRemoveFromCart(item.id)}>
                                        <FaTrash /> Remover
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
                <Card className="mt-3">
                    <Card.Body>
                        <Row>
                            <Col xs={6} style={{ textAlign: 'right', fontWeight: 'bold' }}>Total</Col>
                            <Col xs={6} style={{ fontWeight: 'bold' }}>R$ {total.toFixed(2)}</Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Button variant="success" block="true" onClick={handleCheckout}>Fechar Pedido</Button>
            </div>
        </Container>
    );
};

export default CartList;
