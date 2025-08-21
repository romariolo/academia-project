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
    confirmarSenha: '',
    role: '',
    foto: null,
    certificado: null
  });

  const [mensagem, setMensagem] = useState('');
  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'foto' || name === 'certificado') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleRoleChange = (e) => {
    setForm({ ...form, role: e.target.value, certificado: null });
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
    if (!form.role) {
      novosErros.role = 'Selecione uma função.';
    }
    if ((form.role === 'personal' || form.role === 'nutricionist') && !form.certificado) {
      novosErros.certificado = 'Adicione seu certificado profissional.';
    }

    setErros(novosErros);

    if (Object.keys(novosErros).length === 0) {
      setMensagem(`Conta criada com sucesso para ${form.nome} como ${form.role}!`);
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
        confirmarSenha: '',
        role: '',
        foto: null,
        certificado: null
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
          <span>Foto de Perfil</span>
          <input type="file" name="foto" accept=".jpg,.jpeg,.png" onChange={handleChange} />

          <div className="role-selection">
            <label>Aluno
              <input type="radio" name="role" value="aluno" checked={form.role === 'aluno'} onChange={handleRoleChange} /> 
            </label>
            <label>Personal
              <input type="radio" name="role" value="personal" checked={form.role === 'personal'} onChange={handleRoleChange} /> 
            </label>
            <label>Nutricionista
              <input type="radio" name="role" value="nutricionist" checked={form.role === 'nutricionist'} onChange={handleRoleChange} /> 
            </label>
          </div>
          {erros.role && <p className="erro">{erros.role}</p>}

          {(form.role === 'personal' || form.role === 'nutricionist') && (
            <>
              <span>Certificado Profissional</span>
              <input type="file" name="certificado" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} />
              {erros.certificado && <p className="erro">{erros.certificado}</p>}
            </>
          )}

          <button type="submit">Cadastrar</button>
        </form>

        {mensagem && <p className="mensagem">{mensagem}</p>}
        <Link to="/login" className="link">Voltar ao Login</Link>
      </div>
    </div>
  );
}

export default RegisterPage;
