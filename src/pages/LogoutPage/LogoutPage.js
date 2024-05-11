import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutPage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Limpar o token de autenticação
        localStorage.removeItem('token');

        // Redirecionar para a página de login ou home
        navigate('/conta');
    };

    return (
        <div>
            <h1>Pronto para Deslogar?</h1>
            <p>Clique no botão abaixo para encerrar sua sessão.</p>
            <button onClick={handleLogout} style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>
                Deslogar
            </button>
        </div>
    );
}

export default LogoutPage;
