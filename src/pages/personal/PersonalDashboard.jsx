// src/pages/personal/PersonalDashboard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import alunosFake from '../../data/alunos';
import '../../styles/personal/PersonalDashboard.css';

export default function PersonalDashboard() {
  const navigate = useNavigate();
  const totalAlunos = alunosFake.length;
  const totalTreinos = 8; // pode ser dinâmico futuramente

  const handleLogout = () => {
    // Limpar dados de autenticação/localStorage, se houver
    localStorage.removeItem('userToken');
    // Redirecionar para login
    navigate('/login');
  };

  return (
    <div className="personal-dashboard">
      <header className="dashboard-header">
        <h1>Área do Personal Trainer</h1>
        <button onClick={handleLogout} className="btn logout-btn">
          Sair
        </button>
      </header>

      <section className="dashboard-actions">
        <Link to="/personal/students" className="btn">
          📋 Meus Alunos
        </Link>
        <Link to="/personal/create-workout" className="btn">
          ➕ Criar Treino
        </Link>
        <Link to="/personal/progress/1" className="btn">
          📊 Visualizar Progresso
        </Link>
      </section>

      <section className="dashboard-summary">
        <div className="summary-item">
          <h2>Alunos Cadastrados</h2>
          <p>{totalAlunos}</p>
        </div>
        <div className="summary-item">
          <h2>Treinos Criados</h2>
          <p>{totalTreinos}</p>
        </div>
      </section>
    </div>
  );
}
