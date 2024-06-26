import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Alert, Form } from 'react-bootstrap';
import './ListWeapons.css'; // Importando o arquivo CSS para estilos customizados

//FIXME - Adicionar um filtro por nome, atual removido por não funcionar
//TODO - Criar um botão de remover todos os filtros
//REVIEW - Verificar geração de tabela onde uma arma pode ter vários danos de tipo diferente 1 -> N

const ListWeapons = () => {
    const [weapons, setWeapons] = useState([]);
    const [filteredWeapons, setFilteredWeapons] = useState([]);
    const [error, setError] = useState(null);
    const [damageTypeFilter, setDamageTypeFilter] = useState('');

    useEffect(() => {
        const fetchWeapons = async () => {
            try {
                const response = await axios.get('http://localhost:3042/api/weapons');
                setWeapons(response.data);
                setFilteredWeapons(response.data); // Inicializa os dados filtrados com todos os dados recebidos
            } catch (error) {
                console.error('Erro ao buscar armas:', error);
                setError('Erro ao buscar armas');
            }
        };
        fetchWeapons();
    }, []);

    useEffect(() => {
        // Função para aplicar filtro baseado no tipo de dano selecionado
        const applyDamageTypeFilter = () => {
            if (damageTypeFilter) {
                const filteredData = weapons.filter(weapon =>
                    weapon.tipo_dano.toLowerCase().includes(damageTypeFilter.toLowerCase())
                );
                setFilteredWeapons(filteredData);
            } else {
                setFilteredWeapons(weapons); // Se nenhum filtro estiver selecionado, exibir todas as armas
            }
        };

        applyDamageTypeFilter(); // Aplicar o filtro sempre que houver mudanças em damageTypeFilter ou weapons
    }, [damageTypeFilter, weapons]);

    const handleDamageTypeFilterChange = (event) => {
        setDamageTypeFilter(event.target.value);
    };

    return (
        <Container>
            <h1 className="my-4">Lista de Armas de RPG</h1>
            {error && <Alert variant="danger">Erro ao buscar armas</Alert>}
            <Form className="mb-3">
                <Form.Group controlId="damageTypeFilter">
                    <Form.Label>Filtrar por tipo de dano:</Form.Label>
                    <Form.Control
                        as="select"
                        value={damageTypeFilter}
                        onChange={handleDamageTypeFilterChange}
                    >
                        <option value="">Todos</option>
                        {/* Opções de tipo de dano baseadas nos dados existentes */}
                        {weapons.map((weapon) => (
                            <option key={weapon.codigo_arma} value={weapon.tipo_dano}>
                                {weapon.tipo_dano}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Form>
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Dano</th>
                            <th>Adicional Fixo</th>
                            <th>Redutor Fixo</th>
                            <th>Alcance</th>
                            <th>Mãos</th>
                            <th>Arremessável</th>
                            <th>Tipo de Dano</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWeapons.map((weapon) => (
                            <tr key={weapon.codigo_arma}>
                                <td>{weapon.nome_arma}</td>
                                <td>{weapon.dano}</td>
                                <td>{weapon.bonus_fixo}</td>
                                <td>{weapon.penalidade_fixa}</td>
                                <td>{weapon.alcance}</td>
                                <td>{weapon.empunhadura}</td>
                                <td>{weapon.lancamento}</td>
                                <td>{weapon.tipo_dano}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default ListWeapons;
