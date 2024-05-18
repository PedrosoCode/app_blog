import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserInfo() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token'); // Obtém o token do local storage

        if (!token) {
            console.error('Nenhum token encontrado');
            return; // Encerra o useEffect se não houver token
        }

        axios.get('http://localhost:3042/api/usuario', {
            headers: {
                'Authorization': `Bearer ${token}`  // Inclui o token no cabeçalho da requisição
            }
        })
        .then(response => {
            setUser(response.data);
        })
        .catch(error => {
            console.error('Erro ao buscar dados do usuário:', error);
        });
    }, []);

    if (!user) {
        return <div>Carregando informações do usuário...</div>;
    }

    return (
        <div>
            <h1>Informações do Usuário</h1>
            <p>Nome: {user.username}</p>
            <p>ID: {user.id}</p>
        </div>
    );
}

export default UserInfo;
