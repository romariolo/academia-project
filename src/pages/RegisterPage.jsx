import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegisterPage.css';

function RegisterPage() {
  const [form, setForm] = useState({
    nome: '',
    cpf: '',
    rua: '',
    numero: '',
    complemento: '',
    cep: '',
    cidade: '',
    estado: '',
    email: '',
    confirmarEmail: '',
    senha: '',
    confirmarSenha: ''
  });

  const [mensagem, setMensagem] = useState('');
  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validarCPF = (cpf) => {
    return /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpf);
  };

  const validarSenha = (senha) => {
    return /^(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/.test(senha);
  };

  const buscarCEP = async (cep) => {
    if (cep.length === 8) {
      try {
        const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await resp.json();
        if (!data.erro) {
          setForm((prev) => ({
            ...prev,
            rua: data.logradouro || '',
            cidade: data.localidade || '',
            estado: data.uf || ''
          }));
        }
      } catch (err) {
        console.error('Erro ao buscar CEP:', err);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let novosErros = {};

    if (!validarCPF(form.cpf)) {
      novosErros.cpf = 'CPF inválido. Formato: 000.000.000-00';
    }
    if (form.email !== form.confirmarEmail) {
      novosErros.confirmarEmail = 'Os e-mails não coincidem.';
    }
    if (!validarSenha(form.senha)) {
      novosErros.senha = 'A senha deve ter pelo menos 6 caracteres, incluindo um número e um caractere especial.';
    }
    if (form.senha !== form.confirmarSenha) {
      novosErros.confirmarSenha = 'As senhas não coincidem.';
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length === 0) {
      setMensagem(`Conta criada com sucesso para ${form.nome}!`);
      setForm({
        nome: '',
        cpf: '',
        rua: '',
        numero: '',
        complemento: '',
        cep: '',
        cidade: '',
        estado: '',
        email: '',
        confirmarEmail: '',
        senha: '',
        confirmarSenha: ''
      });
    } else {
      setMensagem('');
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Criar Conta</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} required />

          <input type="text" name="cpf" placeholder="CPF (000.000.000-00)" value={form.cpf} onChange={handleChange} required />
          {erros.cpf && <p className="erro">{erros.cpf}</p>}

          <input type="text" name="rua" placeholder="Rua" value={form.rua} onChange={handleChange} required />
          <input type="text" name="numero" placeholder="Número" value={form.numero} onChange={handleChange} required />
          <input type="text" name="complemento" placeholder="Complemento" value={form.complemento} onChange={handleChange} />

          <input type="text" name="cep" placeholder="CEP (somente números)" value={form.cep} onChange={(e) => { handleChange(e); buscarCEP(e.target.value.replace(/\D/g, '')); }} required />
          
          <input type="text" name="cidade" placeholder="Cidade" value={form.cidade} readOnly />
          <input type="text" name="estado" placeholder="Estado" value={form.estado} readOnly />

          <input type="email" name="email" placeholder="E-mail" value={form.email} onChange={handleChange} required />
          <input type="email" name="confirmarEmail" placeholder="Confirmar E-mail" value={form.confirmarEmail} onChange={handleChange} required />
          {erros.confirmarEmail && <p className="erro">{erros.confirmarEmail}</p>}

          <input type="password" name="senha" placeholder="Senha" value={form.senha} onChange={handleChange} required />
          {erros.senha && <p className="erro">{erros.senha}</p>}

          <input type="password" name="confirmarSenha" placeholder="Confirmar Senha" value={form.confirmarSenha} onChange={handleChange} required />
          {erros.confirmarSenha && <p className="erro">{erros.confirmarSenha}</p>}

          <button type="submit">Cadastrar</button>
        </form>

        {mensagem && <p className="mensagem">{mensagem}</p>}

        <Link to="/login" className="link">Voltar ao Login</Link>
      </div>
    </div>
  );
}

export default RegisterPage;
