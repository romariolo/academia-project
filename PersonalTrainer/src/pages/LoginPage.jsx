import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api'; // Importamos nossa API
import '../styles/LoginPage.css';

function LoginPage() {
  const [username, setUsername] = useState(''); // Mantemos o nome, mas ele guarda o e-mail
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Faz a chamada POST para o endpoint de login do backend
      const response = await api.post('/auth/login', {
        email: username,
        password: password,
      });

      // Se o login der certo, o backend retorna o usuário e o token
      const { user, token } = response.data;

      // Salvamos o token e os dados do usuário no localStorage do navegador
      localStorage.setItem('userToken', token);
      localStorage.setItem('userData', JSON.stringify(user));

      alert(`Bem-vindo, ${user.nome}!`);

      // Redireciona o usuário para o dashboard correto baseado no seu 'role'
      if (user.role === 'personal') {
        navigate('/personal/dashboard');
      } else if (user.role === 'aluno') {
        navigate('/student/dashboard');
      } else {
        // Um fallback, caso tenha outros roles no futuro
        navigate('/');
      }

    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Erro ao fazer login.';
      alert(errorMsg); // Ex: 'Credenciais inválidas.'
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
              placeholder="E-mail" // Atualizei o placeholder para ser mais claro
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