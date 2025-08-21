import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAlunos } from '../data/Students.js';
import '../styles/LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const fakeUsers = [
    { email: 'personal@email.com', password: 'a123456', role: 'personal' },
    { email: 'aluno@email.com', password: 'a123456', role: 'aluno' },
    { email: 'admin@email.com', password: 'a123456', role: 'admin' },
    { email: 'nutricionista@email.com', password: 'a123456', role: 'nutricionist' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const userFound = fakeUsers.find(u => u.email === username && u.password === password);

    if (userFound) {
      if (userFound.role === 'personal') {
        navigate('/personal/dashboard');
      } else if (userFound.role === 'aluno') {
        const alunos = getAlunos();
        const aluno = alunos.find(a => a.id === 2);
        localStorage.setItem('usuarioLogado', JSON.stringify(aluno));
        navigate('/student/dashboard');
      }
    } else {
      alert('Usuário ou senha inválidos!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Bem Vindo ao Smart Personal</h2>
        <form onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">Entrar</button>
        </form>
        <div className="links">
          <Link to="/register" className="link">Criar Conta</Link>
          <Link to="/forgot-password" className="link">Esqueci a Senha</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
