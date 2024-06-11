import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const AdminFooterPage = () => {
    const [footerContent, setFooterContent] = useState({
        about_us_title: '',
        about_us_description: '',
        contact_title: '',
        contact_phone: '',
        contact_email: '',
        socials_title: '',
        socials_instagram: '',
        socials_whatsapp: '',
        socials_linkedin: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3042/api/footer')
            .then(response => {
                setFooterContent(response.data);
            })
            .catch(error => {
                console.error('Erro ao buscar conteúdo do footer:', error);
            });
    }, []);

    const handleChange = (e) => {
        setFooterContent({ ...footerContent, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        axios.put('http://localhost:3042/api/footer', footerContent, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setSuccess('Conteúdo atualizado com sucesso');
            setError(null);
        })
        .catch(error => {
            console.error('Erro ao atualizar conteúdo:', error);
            setError('Erro ao atualizar conteúdo');
            setSuccess(null);
        });
    };

    return (
        <Container>
            <h1>Gerenciar Conteúdo do Footer</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formAboutUsTitle" className="mb-3">
                    <Form.Label>Sobre Nós - Título</Form.Label>
                    <Form.Control
                        type="text"
                        name="about_us_title"
                        value={footerContent.about_us_title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formAboutUsDescription" className="mb-3">
                    <Form.Label>Sobre Nós - Descrição</Form.Label>
                    <Form.Control
                        type="text"
                        name="about_us_description"
                        value={footerContent.about_us_description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formContactTitle" className="mb-3">
                    <Form.Label>Contato - Título</Form.Label>
                    <Form.Control
                        type="text"
                        name="contact_title"
                        value={footerContent.contact_title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formContactPhone" className="mb-3">
                    <Form.Label>Contato - Telefone</Form.Label>
                    <Form.Control
                        type="text"
                        name="contact_phone"
                        value={footerContent.contact_phone}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formContactEmail" className="mb-3">
                    <Form.Label>Contato - Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="contact_email"
                        value={footerContent.contact_email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formSocialsTitle" className="mb-3">
                    <Form.Label>Redes Sociais - Título</Form.Label>
                    <Form.Control
                        type="text"
                        name="socials_title"
                        value={footerContent.socials_title}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formSocialsInstagram" className="mb-3">
                    <Form.Label>Redes Sociais - Instagram</Form.Label>
                    <Form.Control
                        type="text"
                        name="socials_instagram"
                        value={footerContent.socials_instagram}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formSocialsWhatsApp" className="mb-3">
                    <Form.Label>Redes Sociais - WhatsApp</Form.Label>
                    <Form.Control
                        type="text"
                        name="socials_whatsapp"
                        value={footerContent.socials_whatsapp}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formSocialsLinkedIn" className="mb-3">
                    <Form.Label>Redes Sociais - LinkedIn</Form.Label>
                    <Form.Control
                        type="text"
                        name="socials_linkedin"
                        value={footerContent.socials_linkedin}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Salvar Alterações</Button>
            </Form>
        </Container>
    );
}

export default AdminFooterPage;
