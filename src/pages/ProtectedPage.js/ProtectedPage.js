import React from 'react';

function ProtectedPage() {
  return (
    <div style={{ padding: "20px", fontSize: "20px" }}>
      <h1>Página Protegida</h1>
      <p>Este é um conteúdo exclusivo para usuários autenticados. Aproveite todas as informações seguras disponíveis aqui.</p>
      <div>
        <button onClick={() => alert("Você está utilizando um recurso protegido!")}>
          Clique aqui para uma ação protegida
        </button>
      </div>
    </div>
  );
}

export default ProtectedPage;
