import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getAlunos, salvarAluno } from '../../data/Students';
import '../../styles/personal/CreateWorkout.css';

export default function CreateWorkout() {
  const navigate = useNavigate();
  const location = useLocation();
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
  const [editandoIndex, setEditandoIndex] = useState(null);

  const alunos = getAlunos();
  const diasDaSemana = ['Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado','Domingo'];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = Number(params.get('id'));
    if (id) {
      const aluno = alunos.find(a => a.id === id);
      if (aluno) abrirModal(aluno);
      else alert('Aluno não encontrado.');
    }
  }, [location.search]);

  function abrirModal(aluno) {
    setAlunoSelecionado(aluno);
    setVideoOption('');
    setVideoURL('');
    setExercicioNome('');
    setDiaSemana('');
    setSeries('');
    setRepeticoes('');
    setCarga('');
    setExercicios(aluno.treino || []);
    setModalAberto(true);
    setEditandoIndex(null);
  }

  function fecharModal() {
    setModalAberto(false);
    setEditandoIndex(null);
  }

  function limparCampos() {
    setExercicioNome('');
    setDiaSemana('');
    setSeries('');
    setRepeticoes('');
    setCarga('');
    setVideoOption('');
    setVideoURL('');
    setEditandoIndex(null);
  }

  function adicionarOuEditarExercicio() {
    if (!exercicioNome.trim() || !diaSemana.trim() || !series.trim() || !repeticoes.trim() || !carga.trim()) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const novoExercicio = {
      nome: exercicioNome.trim(),
      diaSemana: diaSemana.trim(),
      series: series.trim(),
      repeticoes: repeticoes.trim(),
      carga: carga.trim(),
      videoURL,
    };

    if (editandoIndex !== null) {
      const copia = [...exercicios];
      copia[editandoIndex] = novoExercicio;
      setExercicios(copia);
    } else {
      setExercicios(prev => [...prev, novoExercicio]);
    }

    limparCampos();
  }

  function editarExercicio(index) {
    const ex = exercicios[index];
    setExercicioNome(ex.nome);
    setDiaSemana(ex.diaSemana);
    setSeries(ex.series);
    setRepeticoes(ex.repeticoes);
    setCarga(ex.carga);
    setVideoURL(ex.videoURL || '');
    setVideoOption(ex.videoURL?.startsWith('blob:') ? 'arquivo' : ex.videoURL ? 'link' : '');
    setEditandoIndex(index);
  }

  function excluirExercicio(index) {
    if (!window.confirm("Tem certeza que deseja excluir este exercício?")) return;
    const copia = exercicios.filter((_, i) => i !== index);
    setExercicios(copia);
    const alunoAtualizado = { ...alunoSelecionado, treino: copia, treinoCadastrado: copia.length > 0 };
    salvarAluno(alunoAtualizado);
    setAlunoSelecionado(alunoAtualizado);
    if (editandoIndex === index) limparCampos();
    alert("Exercício excluído com sucesso!");
  }

  function handleVideoFileChange(e) {
    const file = e.target.files[0];
    if (file) setVideoURL(URL.createObjectURL(file));
  }

  function handleSalvarTreino() {
    if (exercicios.length === 0) {
      alert('Adicione ao menos um exercício antes de salvar o treino.');
      return;
    }
    const alunoAtualizado = { ...alunoSelecionado, treino: [...exercicios], treinoCadastrado: true };
    salvarAluno(alunoAtualizado);
    alert(`Treino salvo com ${exercicios.length} exercício(s) para ${alunoSelecionado.nome}.`);
    fecharModal();
  }

  return (
    <div className="create-workout-container">
      <h1>Criar Treino</h1>

      <label htmlFor="select-aluno" className="label-select">Selecione um aluno:</label>
      <select id="select-aluno" onChange={(e) => {
        const id = Number(e.target.value);
        const aluno = alunos.find(a => a.id === id);
        if (aluno) abrirModal(aluno);
      }} defaultValue="">
        <option value="" disabled>-- Escolha um aluno --</option>
        {alunos.map(aluno => (<option key={aluno.id} value={aluno.id}>{aluno.nome}</option>))}
      </select>

      <button className="voltar-btn" onClick={() => navigate(-1)}>← Voltar</button>

      {modalAberto && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Treino para {alunoSelecionado.nome}</h3>

            <label>Dia da Semana:
              <select value={diaSemana} onChange={(e) => setDiaSemana(e.target.value)}>
                <option value="">-- Escolha o dia --</option>
                {diasDaSemana.map((dia, idx) => (<option key={idx} value={dia}>{dia}</option>))}
              </select>
            </label>

            <label>Nome do Exercício:
              <input type="text" value={exercicioNome} onChange={(e) => setExercicioNome(e.target.value)} />
            </label>

            <label>Séries:
              <input type="number" min="1" value={series} onChange={(e) => setSeries(e.target.value)} />
            </label>

            <label>Repetições:
              <input type="number" min="1" value={repeticoes} onChange={(e) => setRepeticoes(e.target.value)} />
            </label>

            <label>Carga (kg):
              <input type="text" value={carga} onChange={(e) => setCarga(e.target.value)} placeholder="Ex: 10kg" />
            </label>

            <label>Tipo de Vídeo:
              <select value={videoOption} onChange={(e) => { setVideoOption(e.target.value); setVideoURL(''); }}>
                <option value="">-- Selecione --</option>
                <option value="link">Link do YouTube</option>
                <option value="arquivo">Arquivo de Vídeo</option>
              </select>
            </label>

            {videoOption === 'link' && <label>Link do Vídeo:<input type="url" value={videoURL} onChange={(e) => setVideoURL(e.target.value)} /></label>}
            {videoOption === 'arquivo' && <label>Upload de Vídeo:<input type="file" accept="video/*" onChange={handleVideoFileChange} /></label>}
            {videoURL && <button className="video-btn" onClick={() => window.open(videoURL, '_blank')}>▶️ Visualizar Vídeo</button>}

            <button className="add-btn" onClick={adicionarOuEditarExercicio}>{editandoIndex !== null ? '✏️ Atualizar Exercício' : '➕ Adicionar Exercício'}</button>
            <button className="add-btn save-btn" onClick={handleSalvarTreino}>💾 Salvar Treino</button>

            <div className="exercicios-lista">
              <h4>Exercícios adicionados:</h4>
              {exercicios.length === 0 && <p>Nenhum exercício adicionado.</p>}
              <ul>
                {exercicios.map((ex, idx) => (
                  <li key={idx}>
                    <strong>{ex.diaSemana}</strong> - {ex.nome} - {ex.series} séries - {ex.repeticoes} repetições - Carga: {ex.carga}
                    {ex.videoURL && <button className="video-btn-small" onClick={() => window.open(ex.videoURL, '_blank')}>▶️</button>}
                    <button className="edit-btn" onClick={() => editarExercicio(idx)}>✏️</button>
                    <button className="delete-btn" onClick={() => excluirExercicio(idx)}>🗑️</button>
                  </li>
                ))}
              </ul>
            </div>

            <button className="close-btn" onClick={fecharModal}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
