import React from 'react';
import { Link } from 'react-router-dom';

export default function ClientList() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Meus Clientes</h1>
      <p>Aqui será exibida a lista de clientes associados a este nutricionista.</p>
      <p>Cada cliente na lista terá um botão para criar ou editar um plano alimentar.</p>
      <br />
      <Link to="/nutritionist/dashboard">Voltar para o Dashboard</Link>
    </div>
  );
}