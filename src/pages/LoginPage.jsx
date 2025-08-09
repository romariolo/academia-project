import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Usuários fake
  const fakeUsers = [
    {
      email: 'personal@email.com',
      password: 'a123456',
      role: 'personal'
    },
    // você pode adicionar mais usuários aqui futuramente
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const userFound = fakeUsers.find(
      (u) => u.email === username && u.password === password
    );

    if (userFound) {
      alert(`Bem-vindo, ${userFound.role}!`);
      if (userFound.role === 'personal') {
        navigate('/personal/dashboard');
      }
      // Aqui futuramente dá pra colocar redirecionamento para outros roles
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
