import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';

function LogoutPage() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        // Limpar o token de autenticação
        localStorage.removeItem('token');

        // Redirecionar para a página de login ou home
        navigate('/conta');
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="text-center">
                <Col>
                    <h1 className="mb-4">Pronto para Deslogar?</h1>
                    <p>Clique no botão abaixo para encerrar sua sessão.</p>
                    <Button variant="danger" size="lg" onClick={handleShowModal}>
                        Deslogar
                    </Button>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Você tem certeza que deseja deslogar?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={handleLogout}>
                        Deslogar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default LogoutPage;
