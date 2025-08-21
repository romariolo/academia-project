import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAlunos, salvarAluno } from '../../data/Students';
import '../../styles/personal/PersonalDashboard.css';

export default function PersonalDashboard() {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [showPerfilModal, setShowPerfilModal] = useState(false);
  const [perfil, setPerfil] = useState({
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
    comprovante: null,
    foto: null
  });

  useEffect(() => {
    setAlunos(getAlunos());
  }, []);

  const totalAlunos = alunos.length;
  const totalTreinos = alunos.reduce((acc, aluno) => acc + aluno.treino.length, 0);

  function atualizarTreinoCadastrado(idAluno, novoTreino) {
    setAlunos((old) => {
      const novosAlunos = old.map((aluno) => {
        if (aluno.id === idAluno) {
          const treinoAtualizado = [...aluno.treino, novoTreino];
          const alunoAtualizado = { ...aluno, treino: treinoAtualizado, treinoCadastrado: true };
          salvarAluno(alunoAtualizado);
          return alunoAtualizado;
        }
        return aluno;
      });
      return novosAlunos;
    });
  }

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const handleChange = (e) => {
    let { name, value, files } = e.target;
    if (name === 'comprovante' || name === 'foto') {
      setPerfil(prev => ({ ...prev, [name]: files[0] }));
      return;
    }
    if (name === 'cpf') {
      value = value.replace(/\D/g, '').slice(0, 11);
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    }
    if (name === 'cep') {
      value = value.replace(/\D/g, '').slice(0, 8);
      value = value.replace(/(\d{2})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{1,3})$/, '$1-$2');
      if (value.length === 10) {
        setPerfil(prev => ({ ...prev, cidade: 'Cidade Exemplo', estado: 'UF' }));
      }
    }
    setPerfil(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setShowPerfilModal(false);
  };

  return (
    <div className="personal-dashboard">
      <div className="personal-info">
        <div className="personal-photo">
          {perfil.foto ? (
            <img src={URL.createObjectURL(perfil.foto)} alt="Foto do Personal" />
          ) : (
            <div className="placeholder">👤</div>
          )}
        </div>
        <div className="personal-name">{perfil.nome || "Seu Nome"}</div>
      </div>

      <header className="dashboard-header">
        <h1>Área do Personal Trainer</h1>
        <div>
          <button onClick={() => setShowPerfilModal(true)} className="btn">Perfil</button>
          <button onClick={handleLogout} className="btn logout-btn">Sair</button>
        </div>
      </header>

      <section className="dashboard-actions">
        <Link to="/personal/students" className="btn">📋 Meus Alunos</Link>
        <Link to="/personal/create-workout" className="btn">➕ Criar Treino</Link>
        <Link to="/personal/progress/1" className="btn">📊 Visualizar Progresso</Link>
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

      {showPerfilModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Atualizar Perfil</h2>
            <input type="text" name="nome" value={perfil.nome} onChange={handleChange} placeholder="Nome" />
            <input type="text" name="cpf" value={perfil.cpf} onChange={handleChange} placeholder="CPF" />
            <input type="text" name="rua" value={perfil.rua} onChange={handleChange} placeholder="Rua" />
            <input type="text" name="numero" value={perfil.numero} onChange={handleChange} placeholder="Número" />
            <input type="text" name="complemento" value={perfil.complemento} onChange={handleChange} placeholder="Complemento" />
            <input type="text" name="cep" value={perfil.cep} onChange={handleChange} placeholder="CEP" />
            <input type="text" name="cidade" value={perfil.cidade} onChange={handleChange} placeholder="Cidade" readOnly />
            <input type="text" name="estado" value={perfil.estado} onChange={handleChange} placeholder="Estado" readOnly />
            <input type="email" name="email" value={perfil.email} onChange={handleChange} placeholder="Email" />
            <input type="email" name="confirmarEmail" value={perfil.confirmarEmail} onChange={handleChange} placeholder="Confirmar Email" />
            <input type="password" name="senha" value={perfil.senha} onChange={handleChange} placeholder="Senha" />
            <input type="password" name="confirmarSenha" value={perfil.confirmarSenha} onChange={handleChange} placeholder="Confirmar Senha" />
            <span>Comprovante de Profissão</span>
            <input type="file" name="comprovante" accept=".pdf,.jpg,.jpeg,.png" onChange={handleChange} />
            <span>Foto de Perfil</span>
            <input type="file" name="foto" accept=".jpg,.jpeg,.png" onChange={handleChange} />
            <div className="modal-actions">
              <button onClick={handleSave} className="btn">Atualizar</button>
              <button onClick={() => setShowPerfilModal(false)} className="btn">Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
