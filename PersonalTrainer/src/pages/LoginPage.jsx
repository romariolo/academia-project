import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', {
        email: username,
        password: password,
      });
      
      const { user, token } = response.data;
      localStorage.setItem('userToken', token);
      localStorage.setItem('userData', JSON.stringify(user));
      alert(`Bem-vindo, ${user.nome}!`);

      if (user.role === 'personal') {
        navigate('/personal/dashboard');
      } else if (user.role === 'aluno') {
        navigate('/student/dashboard');
      } else if (user.role === 'nutricionista') {
        navigate('/nutritionist/dashboard'); 
      } else {
        navigate('/');
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Erro ao fazer login.';
      alert(errorMsg);
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
              placeholder="E-mail"
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