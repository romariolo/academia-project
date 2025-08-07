import React from 'react';

function RegisterPage() {
  return (
    <div>
      <h1>Página de Cadastro</h1>
      <form>
        <label htmlFor="username">Usuário:</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="email">E-mail:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Senha:</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default RegisterPage;
