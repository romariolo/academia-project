import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/personal/PersonalDashboard.css'; // Importa o CSS

export default function CreateDietPlan() {
  return (
    // Aplica a classe principal para o container
    <div className="personal-dashboard">
      <h1>Criar/Editar Plano Alimentar</h1>
      <p>Este será o formulário para montar o plano alimentar de um cliente específico.</p>
      <p>Terá campos para adicionar refeições (café da manhã, almoço, etc.) e os alimentos de cada refeição.</p>
      <br />
      {/* Aplica a classe de botão no link */}
      <Link to="/nutritionist/clients" className="btn">
        Voltar para a Lista de Clientes
      </Link>
    </div>
  );
}