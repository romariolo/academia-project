import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAlunos } from "../../data/Students";
import "../../styles/personal/StudentsList.css";

export default function StudentsList() {
  const navigate = useNavigate();
  const alunosPorPagina = 5;
  const [filtroTreino, setFiltroTreino] = useState("todos");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    const lista = getAlunos().map(aluno => ({
      ...aluno,
      treino: aluno.treino || []
    }));
    setAlunos(lista);
  }, []);

  const alunosFiltrados = useMemo(() => {
    let filtrados = [...alunos];
    if (filtroTreino === "treino-ok") {
      filtrados = filtrados.filter(aluno => aluno.treino.length > 0);
    } else if (filtroTreino === "treino-faltando") {
      filtrados = filtrados.filter(aluno => aluno.treino.length === 0);
    }
    filtrados.sort((a, b) => a.nome.toLowerCase().localeCompare(b.nome.toLowerCase()));
    return filtrados;
  }, [filtroTreino, alunos]);

  const totalPaginas = Math.ceil(alunosFiltrados.length / alunosPorPagina) || 1;
  const indicePrimeiroAluno = (paginaAtual - 1) * alunosPorPagina;
  const indiceUltimoAluno = indicePrimeiroAluno + alunosPorPagina;
  const alunosPaginaAtual = alunosFiltrados.slice(indicePrimeiroAluno, indiceUltimoAluno);

  function irParaPagina(n) {
    if (n < 1 || n > totalPaginas) return;
    setPaginaAtual(n);
  }

  return (
    <div className="students-list">
      <h1>Lista de Alunos</h1>

      <div className="filtros-wrapper">
        <div className="filtro-container">
          <label htmlFor="filtroTreino">Filtrar por treino:</label>
          <select
            id="filtroTreino"
            value={filtroTreino}
            onChange={(e) => setFiltroTreino(e.target.value)}
          >
            <option value="todos">Todos</option>
            <option value="treino-ok">Com treino cadastrado</option>
            <option value="treino-faltando">Sem treino cadastrado</option>
          </select>
        </div>
      </div>

      <ul>
        {alunosPaginaAtual.length === 0 ? (
          <li className="nenhum-aluno">Nenhum aluno encontrado.</li>
        ) : (
          alunosPaginaAtual.map((aluno) => (
            <li key={aluno.id}>
              <span className="aluno-nome">{aluno.nome}</span>
              <span
                className={
                  "situacao-treino " +
                  (aluno.treino.length > 0 ? "treino-ok" : "treino-faltando")
                }
              >
                {aluno.treino.length > 0 ? "Com Treino Cadastrado" : "Sem Treino Cadastrado"}
              </span>
              <button
                className="btn-treino"
                onClick={() => {
                  if (aluno.treino.length === 0) {
                    alert("Este aluno ainda não possui treino cadastrado.");
                  } else {
                    navigate(`/personal/create-workout?id=${aluno.id}`);
                  }
                }}
              >
                ➕ Criar/Editar Treino
              </button>
            </li>
          ))
        )}
      </ul>

      <div className="paginacao">
        <button
          onClick={() => irParaPagina(paginaAtual - 1)}
          disabled={paginaAtual === 1}
        >
          ← Anterior
        </button>

        <span>
          Página {alunosFiltrados.length === 0 ? 0 : paginaAtual} de {totalPaginas}
        </span>

        <button
          onClick={() => irParaPagina(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas || totalPaginas === 0}
        >
          Próxima →
        </button>
      </div>

      <button className="voltar-btn" onClick={() => navigate(-1)}>
        ← Voltar
      </button>
    </div>
  );
}
