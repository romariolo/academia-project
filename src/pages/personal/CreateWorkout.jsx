import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import alunosFake from '../../data/alunos';
import '../../styles/personal/CreateWorkout.css';

export default function CreateWorkout() {
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [exercicioNome, setExercicioNome] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [exercicios, setExercicios] = useState([]);

  function abrirModal(aluno) {
    setAlunoSelecionado(aluno);
    setVideoURL('');
    setExercicioNome('');
    setRepeticoes('');
    setExercicios([]);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function adicionarExercicio() {
    if (!exercicioNome.trim() || !repeticoes.trim()) {
      alert('Preencha o nome do exercício e a quantidade de repetições.');
      return;
    }
    setExercicios((prev) => [
      ...prev,
      { nome: exercicioNome.trim(), repeticoes: repeticoes.trim(), videoURL },
    ]);
    setExercicioNome('');
    setRepeticoes('');
    setVideoURL('');
  }

  function handleVideoChange(e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoURL(url);
    }
  }

  return (
    <div className="create-workout-container">
      <h1>Criar Treino</h1>

      <label htmlFor="select-aluno" className="label-select">
        Selecione um aluno:
      </label>
      <select
        id="select-aluno"
        onChange={(e) => {
          const id = Number(e.target.value);
          const aluno = alunosFake.find((a) => a.id === id);
          if (aluno) abrirModal(aluno);
        }}
        defaultValue=""
      >
        <option value="" disabled>
          -- Escolha um aluno --
        </option>
        {alunosFake.map((aluno) => (
          <option key={aluno.id} value={aluno.id}>
            {aluno.nome}
          </option>
        ))}
      </select>

      <button className="voltar-btn" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Treino para {alunoSelecionado.nome}</h3>

            <label>
              Nome do Exercício:
              <input
                type="text"
                value={exercicioNome}
                onChange={(e) => setExercicioNome(e.target.value)}
              />
            </label>

            <label>
              Quantidade de Repetições:
              <input
                type="number"
                min="1"
                value={repeticoes}
                onChange={(e) => setRepeticoes(e.target.value)}
              />
            </label>

            <label>
              Enviar Vídeo:
              <input type="file" accept="video/*" onChange={handleVideoChange} />
            </label>

            {videoURL && (
              <button
                className="video-btn"
                onClick={() => window.open(videoURL, '_blank')}
              >
                ▶️ Visualizar Vídeo
              </button>
            )}

            <button className="add-btn" onClick={adicionarExercicio}>
              ➕ Adicionar Exercício
            </button>

            <div className="exercicios-lista">
              <h4>Exercícios adicionados:</h4>
              {exercicios.length === 0 && <p>Nenhum exercício adicionado.</p>}
              <ul>
                {exercicios.map((ex, idx) => (
                  <li key={idx}>
                    <strong>{ex.nome}</strong> - {ex.repeticoes} repetições{' '}
                    {ex.videoURL && (
                      <button
                        className="video-btn-small"
                        onClick={() => window.open(ex.videoURL, '_blank')}
                      >
                        ▶️
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <button className="close-btn" onClick={fecharModal}>
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
