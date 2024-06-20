// src/components/CreateWeaponForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const CreateWeaponForm = () => {
    const [weapon, setWeapon] = useState({
        name: '',
        damage: '',
        fixedBonus: '',
        fixedReduction: '',
        range: '',
        hands: 'one',
        throwable: false,
        damageType: ''
    });
    const [damageTypes, setDamageTypes] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchDamageTypes = async () => {
            try {
                const response = await axios.get('http://localhost:3042/api/damage-types');
                setDamageTypes(response.data);
            } catch (error) {
                console.error('Erro ao buscar tipos de dano:', error);
            }
        };
        fetchDamageTypes();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setWeapon({
            ...weapon,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3042/api/weapons', weapon);
            setSuccess('Arma criada com sucesso');
            setWeapon({
                name: '',
                damage: '',
                fixedBonus: '',
                fixedReduction: '',
                range: '',
                hands: 'one',
                throwable: false,
                damageType: ''
            });
        } catch (error) {
            console.error('Erro ao criar arma:', error);
            setError('Erro ao criar arma');
        }
    };

    return (
        <Container>
            <h1 className="my-4">Criar Arma de RPG</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName">
                    <Form.Label>Nome da Arma</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={weapon.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDamage">
                    <Form.Label>Dano</Form.Label>
                    <Form.Control
                        type="text"
                        name="damage"
                        value={weapon.damage}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formFixedBonus">
                    <Form.Label>Adicional Fixo</Form.Label>
                    <Form.Control
                        type="number"
                        name="fixedBonus"
                        value={weapon.fixedBonus}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formFixedReduction">
                    <Form.Label>Redutor Fixo</Form.Label>
                    <Form.Control
                        type="number"
                        name="fixedReduction"
                        value={weapon.fixedReduction}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formRange">
                    <Form.Label>Alcance</Form.Label>
                    <Form.Control
                        type="text"
                        name="range"
                        value={weapon.range}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formHands">
                    <Form.Label>Mãos</Form.Label>
                    <Form.Control
                        as="select"
                        name="hands"
                        value={weapon.hands}
                        onChange={handleChange}
                    >
                        <option value="one">Uma Mão</option>
                        <option value="two">Duas Mãos</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId="formThrowable">
                    <Form.Check
                        type="checkbox"
                        label="Pode ser arremessada"
                        name="throwable"
                        checked={weapon.throwable}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formDamageType">
                    <Form.Label>Tipo de Dano</Form.Label>
                    <Form.Control
                        as="select"
                        name="damageType"
                        value={weapon.damageType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione um tipo de dano</option>
                        {damageTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.damage}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Criar Arma
                </Button>
            </Form>
        </Container>
    );
};

export default CreateWeaponForm;
