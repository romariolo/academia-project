import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/personal/PersonalDashboard.css'; // Importa o CSS

export default function ClientList() {
  return (
    // Aplica a classe principal para o container
    <div className="personal-dashboard"> 
      <h1>Meus Clientes</h1>
      <p>Aqui será exibida a lista de clientes associados a este nutricionista.</p>
      <p>Cada cliente na lista terá um botão para criar ou editar um plano alimentar.</p>
      <br />
      {/* Aplica a classe de botão no link */}
      <Link to="/nutritionist/dashboard" className="btn">
        Voltar para o Dashboard
      </Link>
    </div>
  );
}