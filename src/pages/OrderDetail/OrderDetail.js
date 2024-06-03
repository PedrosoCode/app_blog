import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Table, Card, Row, Col } from 'react-bootstrap';

const OrderDetail = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = () => {
        axios.get(`http://localhost:3042/api/pedidos/${orderId}`)
            .then(response => {
                setOrder(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar detalhes do pedido:', error);
                setError('Erro ao buscar detalhes do pedido.');
            });
    };

    if (!order) return <div>Carregando...</div>;

    return (
        <Container>
            <h1 className="my-4">Detalhes do Pedido</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <Card className="mb-4">
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
            <div className="d-none d-md-block">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Imagem</th>
                            <th>Produto</th>
                            <th>Quantidade</th>
                            <th>Preço Unitário</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.itens.map(item => (
                            <tr key={item.id}>
                                <td>
                                    {item.image_path && (
                                        <img src={`http://localhost:3042${item.image_path}`} alt={item.titulo} style={{ width: '50px', height: '50px' }} />
                                    )}
                                </td>
                                <td>{item.titulo}</td>
                                <td>{item.quantidade}</td>
                                <td>R$ {item.preco_unitario.toFixed(2)}</td>
                                <td>R$ {(item.preco_unitario * item.quantidade).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="d-block d-md-none">
                {order.itens.map(item => (
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
                                    <Card.Text><strong>Quantidade:</strong> {item.quantidade}</Card.Text>
                                    <Card.Text><strong>Preço Unitário:</strong> R$ {item.preco_unitario.toFixed(2)}</Card.Text>
                                    <Card.Text><strong>Total:</strong> R$ {(item.preco_unitario * item.quantidade).toFixed(2)}</Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default OrderDetail;
