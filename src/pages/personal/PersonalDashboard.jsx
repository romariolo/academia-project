import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import alunosFake from '../../data/Students';
import '../../styles/personal/PersonalDashboard.css';

export default function PersonalDashboard() {
  const navigate = useNavigate();
  
  // Estado local que guarda a lista de alunos (copiada do arquivo original)
  const [alunos, setAlunos] = useState(alunosFake);

  const totalAlunos = alunos.length;
  const totalTreinos = 8; // pode ser dinâmico futuramente

  // Função para atualizar treinoCadastrado de um aluno por ID
  function atualizarTreinoCadastrado(idAluno, valor) {
    setAlunos((old) =>
      old.map((aluno) =>
        aluno.id === idAluno ? { ...aluno, treinoCadastrado: valor } : aluno
      )
    );
  }

  const handleLogout = () => {
    localStorage.removeItem('userToken');
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
