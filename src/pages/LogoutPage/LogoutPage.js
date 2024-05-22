import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function LogoutPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Limpar o token de autenticação
        localStorage.removeItem('token');

        // Redirecionar para a página de login ou home
        navigate('/conta');
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="text-center">
                <Col>
                    <h1 className="mb-4">Pronto para Deslogar?</h1>
                    <p>Clique no botão abaixo para encerrar sua sessão.</p>
                    <Button variant="danger" size="lg" onClick={handleLogout}>
                        Deslogar
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}

export default LogoutPage;
