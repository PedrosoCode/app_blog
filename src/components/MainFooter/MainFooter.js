import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const MainFooter = () => {
    return (
        <footer className="bg-dark text-white mt-4">
            <Container fluid className="py-3">
                <Row>
                    <Col md={4}>
                        <h5>Sobre Nós</h5>
                        <p>Descrição breve sobre a empresa ou o propósito do site.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Contato</h5>
                        <ul className="list-unstyled">
                            <li>Email: contato@empresa.com</li>
                            <li>Telefone: (00) 0000-0000</li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Redes Sociais</h5>
                        <ul className="list-unstyled">
                            <li>Facebook</li>
                            <li>Twitter</li>
                            <li>Instagram</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default MainFooter;
