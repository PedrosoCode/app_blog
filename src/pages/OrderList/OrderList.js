import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Card, Row, Col } from 'react-bootstrap';

//TODO - Permitir visualizar os ítens do pedido

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios.get('http://localhost:3042/api/pedidos')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar pedidos:', error);
                setError('Erro ao buscar pedidos.');
            });
    };

    return (
        <Container>
            <h1 className="my-4">Meus Pedidos</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="d-none d-md-block">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID do Pedido</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Data do Pedido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>R$ {order.total.toFixed(2)}</td>
                                <td>{order.status}</td>
                                <td>{new Date(order.criado_em).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="d-block d-md-none">
                {orders.map(order => (
                    <Card key={order.id} className="mb-3">
                        <Card.Body>
                            <Row>
                                <Col xs={6}><strong>ID do Pedido:</strong></Col>
                                <Col xs={6}>{order.id}</Col>
                            </Row>
                            <Row>
                                <Col xs={6}><strong>Total:</strong></Col>
                                <Col xs={6}>R$ {order.total.toFixed(2)}</Col>
                            </Row>
                            <Row>
                                <Col xs={6}><strong>Status:</strong></Col>
                                <Col xs={6}>{order.status}</Col>
                            </Row>
                            <Row>
                                <Col xs={6}><strong>Data do Pedido:</strong></Col>
                                <Col xs={6}>{new Date(order.criado_em).toLocaleDateString()}</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default OrderList;
