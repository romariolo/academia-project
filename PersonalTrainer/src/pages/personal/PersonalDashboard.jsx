import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api'; 
import '../../styles/personal/PersonalDashboard.css';

export default function PersonalDashboard() {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [showPerfilModal, setShowPerfilModal] = useState(false);
  const [perfil, setPerfil] = useState({});

  useEffect(() => {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      // Preenchemos o estado do perfil com os dados do usuário logado
      setPerfil(userData);
    }

    const fetchStudents = async () => {
      try {
        const response = await api.get('/personal/students');
        setAlunos(response.data);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    };

    fetchStudents();
  }, []);

  const totalAlunos = alunos.length;
  const totalTreinos = 0; 

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  const handleChange = (e) => {
    let { name, value, files } = e.target;
    if (name === 'foto') {
      // Para a pré-visualização da imagem
      setPerfil(prev => ({ ...prev, fotoFile: files[0] }));
      return;
    }
    setPerfil(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Futuramente, aqui faremos a chamada `PUT` para a API para salvar os dados
    alert("Perfil atualizado (simulação)!");
    setShowPerfilModal(false);
  };

  return (
    <div className="personal-dashboard">
      <div className="personal-info">
        <div className="personal-photo">
          {/* Lógica para mostrar a foto nova (preview) ou a antiga */}
          {perfil.fotoFile ? (
            <img src={URL.createObjectURL(perfil.fotoFile)} alt="Preview da Foto" />
          ) : perfil.foto_url ? (
            <img src={`http://localhost:5000/${perfil.foto_url.replace(/\\/g, '/')}`} alt="Foto do Personal" />
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

      {/* CÓDIGO DO MODAL ADICIONADO DE VOLTA */}
      {showPerfilModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Atualizar Perfil</h2>
            <input type="text" name="nome" value={perfil.nome || ''} onChange={handleChange} placeholder="Nome" />
            <input type="text" name="cpf" value={perfil.cpf || ''} onChange={handleChange} placeholder="CPF" />
            <input type="text" name="rua" value={perfil.rua || ''} onChange={handleChange} placeholder="Rua" />
            <input type="text" name="numero" value={perfil.numero || ''} onChange={handleChange} placeholder="Número" />
            <input type="text" name="complemento" value={perfil.complemento || ''} onChange={handleChange} placeholder="Complemento" />
            <input type="text" name="cep" value={perfil.cep || ''} onChange={handleChange} placeholder="CEP" />
            <input type="text" name="cidade" value={perfil.cidade || ''} onChange={handleChange} placeholder="Cidade" />
            <input type="text" name="estado" value={perfil.estado || ''} onChange={handleChange} placeholder="Estado" />
            <input type="email" name="email" value={perfil.email || ''} onChange={handleChange} placeholder="Email" />
            
            <span>Nova Senha (deixe em branco para não alterar)</span>
            <input type="password" name="senha" onChange={handleChange} placeholder="Nova Senha" />
            
            <span>Foto de Perfil</span>
            <input type="file" name="foto" accept=".jpg,.jpeg,.png" onChange={handleChange} />
            
            <div className="modal-actions">
              <button onClick={handleSave} className="btn">Atualizar</button>
              <button onClick={() => setShowPerfilModal(false)} className="btn">Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {/* FIM DO CÓDIGO DO MODAL */}
    </div>
  );
}