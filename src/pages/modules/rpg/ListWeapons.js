import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, ListGroup, ListGroupItem } from 'react-bootstrap';

const ListWeapons = () => {
    const [weapons, setWeapons] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeapons = async () => {
            try {
                const response = await axios.get('http://localhost:3042/api/weapons');
                setWeapons(response.data);
            } catch (error) {
                console.error('Erro ao buscar armas:', error);
                setError('Erro ao buscar armas');
            }
        };
        fetchWeapons();
    }, []);

    return (
        <Container>
            <h1 className="my-4">Lista de Armas de RPG</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <ListGroup>
                {weapons.map((weapon) => (
                    <ListGroupItem key={weapon.codigo_arma}>
                        <strong>Nome:</strong> {weapon.nome_arma} | 
                        <strong> Dano:</strong> {weapon.damage} | 
                        <strong> Adicional Fixo:</strong> {weapon.bonus_fixo} | 
                        <strong> Redutor Fixo:</strong> {weapon.penalidade_fixa} | 
                        <strong> Alcance:</strong> {weapon.alcance} | 
                        <strong> Mãos:</strong> {weapon.empunhadura} | 
                        <strong> Arremessável:</strong> {weapon.lancamento} | 
                        <strong> Tipo de Dano:</strong> {weapon.tipo_dano}
                    </ListGroupItem>
                ))}
            </ListGroup>
        </Container>
    );
};

export default ListWeapons;
