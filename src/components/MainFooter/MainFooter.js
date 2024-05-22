import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';

const MainFooter = () => {
    const [footerContent, setFooterContent] = useState({});

    useEffect(() => {
        axios.get('http://localhost:3042/api/footer')
            .then(response => {
                setFooterContent(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar conteúdo do footer:', error);
            });
    }, []);

    //TODO - Condicionar a tabela e o front para permitir que o usuário defina links dinâmicos e não apenas texto simples

    return (
        <footer className="bg-dark text-white mt-4">
            <Container fluid className="py-3">
                <Row>
                    <Col md={4}>
                        <h5>{footerContent.about_us_title}</h5>
                        <p>{footerContent.about_us_description}</p>
                    </Col>
                    <Col md={4}>
                        <h5>{footerContent.contact_title}</h5>
                        <ul className="list-unstyled">
                            <li>{footerContent.contact_phone}</li>
                            <li>{footerContent.contact_email}</li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>{footerContent.socials_title}</h5>
                        <ul className="list-unstyled">
                            <li>{footerContent.socials_instagram}</li>
                            <li>{footerContent.socials_whatsapp}</li>
                            <li>{footerContent.socials_linkedin}</li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default MainFooter;
