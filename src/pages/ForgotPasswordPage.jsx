import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ForgotPasswordPage.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setMensagem(`Um link de recuperação foi enviado para ${email}`);
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <h2>Recuperar Senha</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Enviar</button>
        </form>
        {mensagem && <p className="mensagem">{mensagem}</p>}
        <Link to="/" className="link">Voltar ao Login</Link>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
