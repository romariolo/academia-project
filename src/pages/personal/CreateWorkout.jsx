import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import alunosFake from '../../data/Students';
import '../../styles/personal/CreateWorkout.css';

export default function CreateWorkout() {
  const navigate = useNavigate();
  const [modalAberto, setModalAberto] = useState(false);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [videoOption, setVideoOption] = useState('');
  const [videoURL, setVideoURL] = useState('');
  const [exercicioNome, setExercicioNome] = useState('');
  const [diaSemana, setDiaSemana] = useState('');
  const [series, setSeries] = useState('');
  const [repeticoes, setRepeticoes] = useState('');
  const [carga, setCarga] = useState('');
  const [exercicios, setExercicios] = useState([]);

  function abrirModal(aluno) {
    setAlunoSelecionado(aluno);
    setVideoOption('');
    setVideoURL('');
    setExercicioNome('');
    setDiaSemana('');
    setSeries('');
    setRepeticoes('');
    setCarga('');
    setExercicios([]);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  function adicionarExercicio() {
    if (
      !exercicioNome.trim() ||
      !diaSemana.trim() ||
      !series.trim() ||
      !repeticoes.trim() ||
      !carga.trim()
    ) {
      alert(
        'Preencha o nome do exercício, dia da semana, séries, repetições e a carga.'
      );
      return;
    }
    setExercicios((prev) => [
      ...prev,
      {
        nome: exercicioNome.trim(),
        diaSemana: diaSemana.trim(),
        series: series.trim(),
        repeticoes: repeticoes.trim(),
        carga: carga.trim(),
        videoURL,
      },
    ]);
    setExercicioNome('');
    setDiaSemana('');
    setSeries('');
    setRepeticoes('');
    setCarga('');
    setVideoOption('');
    setVideoURL('');
  }

  function handleVideoFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoURL(url);
    }
  }

  function handleSalvarTreino() {
    if (exercicios.length === 0) {
      alert('Adicione ao menos um exercício antes de salvar o treino.');
      return;
    }
    alert(`Treino salvo com ${exercicios.length} exercício(s) para ${alunoSelecionado.nome}.`);
    fecharModal();
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
              Dia da Semana:
              <input
                type="text"
                value={diaSemana}
                onChange={(e) => setDiaSemana(e.target.value)}
                placeholder="Ex: Segunda-feira"
              />
            </label>

            <label>
              Nome do Exercício:
              <input
                type="text"
                value={exercicioNome}
                onChange={(e) => setExercicioNome(e.target.value)}
              />
            </label>

            <label>
              Quantidade de Séries:
              <input
                type="number"
                min="1"
                value={series}
                onChange={(e) => setSeries(e.target.value)}
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
              Carga (kg):
              <input
                type="text"
                value={carga}
                onChange={(e) => setCarga(e.target.value)}
                placeholder="Ex: 10kg"
              />
            </label>

            <label>
              Tipo de Vídeo:
              <select
                value={videoOption}
                onChange={(e) => {
                  setVideoOption(e.target.value);
                  setVideoURL('');
                }}
              >
                <option value="">-- Selecione --</option>
                <option value="link">Link do YouTube</option>
                <option value="arquivo">Arquivo de Vídeo</option>
              </select>
            </label>

            {videoOption === 'link' && (
              <label>
                Link do Vídeo (YouTube):
                <input
                  type="url"
                  value={videoURL}
                  onChange={(e) => setVideoURL(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </label>
            )}

            {videoOption === 'arquivo' && (
              <label>
                Enviar Arquivo de Vídeo:
                <input type="file" accept="video/*" onChange={handleVideoFileChange} />
              </label>
            )}

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

            <button
              className="add-btn save-btn"
              onClick={handleSalvarTreino}
            >
              💾 Salvar Treino
            </button>

            <div className="exercicios-lista">
              <h4>Exercícios adicionados:</h4>
              {exercicios.length === 0 && <p>Nenhum exercício adicionado.</p>}
              <ul>
                {exercicios.map((ex, idx) => (
                  <li key={idx}>
                    <strong>{ex.diaSemana}</strong> - {ex.nome} - {ex.series} séries - {ex.repeticoes} repetições - Carga: {ex.carga}{' '}
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
