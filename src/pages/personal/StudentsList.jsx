import React from 'react';
import { useNavigate } from 'react-router-dom';
import alunosFake from '../../data/Students';
import '../../styles/personal/StudentsList.css';

export default function StudentsList() {
  const navigate = useNavigate();

  return (
    <div className="students-list">
      <h1>Lista de Alunos</h1>
      <ul>
        {alunosFake.map((aluno) => (
          <li key={aluno.id}>{aluno.nome}</li>
        ))}
      </ul>
      <button className="voltar-btn" onClick={() => navigate(-1)}>← Voltar</button>
    </div>
  );
}
