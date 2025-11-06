import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Vamos usar o mesmo estilo do dashboard do personal para manter a consistência
import '../../styles/personal/PersonalDashboard.css'; 

export default function NutritionistDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  return (
    <div className="personal-dashboard">
      <header className="dashboard-header">
        <h1>Área do Nutricionista</h1>
        <div>
          {/* Futuramente podemos adicionar um botão de perfil aqui */}
          <button onClick={handleLogout} className="btn logout-btn">Sair</button>
        </div>
      </header>

      <section className="dashboard-actions">
        <Link to="/nutritionist/clients" className="btn">
          👥 Meus Clientes
        </Link>
        <Link to="/nutritionist/create-plan" className="btn">
          🥗 Criar Plano Alimentar
        </Link>
      </section>

      <section className="dashboard-summary">
        <div className="summary-item">
          <h2>Clientes Ativos</h2>
          <p>0</p>
        </div>
        <div className="summary-item">
          <h2>Planos Criados</h2>
          <p>0</p>
        </div>
      </section>
    </div>
  );
}