import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import alunosFake from "../../data/Students";
import "../../styles/personal/StudentsList.css";

export default function StudentsList() {
  const navigate = useNavigate();

  const alunosPorPagina = 5;
  const [filtroFinanceiro, setFiltroFinanceiro] = useState("todos");
  const [filtroTreino, setFiltroTreino] = useState("todos");
  const [paginaAtual, setPaginaAtual] = useState(1);

  const alunosFiltrados = useMemo(() => {
    let filtrados = [...alunosFake];

    // Filtro financeiro
    if (filtroFinanceiro === "pagos") {
      filtrados = filtrados.filter((aluno) => aluno.mensalidadePaga === true);
    } else if (filtroFinanceiro === "nao-pagos") {
      filtrados = filtrados.filter((aluno) => aluno.mensalidadePaga === false);
    }

    // Filtro treino
    if (filtroTreino === "treino-ok") {
      filtrados = filtrados.filter((aluno) => aluno.treinoCadastrado === true);
    } else if (filtroTreino === "treino-faltando") {
      filtrados = filtrados.filter((aluno) => aluno.treinoCadastrado === false);
    }

    // Ordenar alfabeticamente
    filtrados.sort((a, b) =>
      a.nome.toLowerCase().localeCompare(b.nome.toLowerCase())
    );

    return filtrados;
  }, [filtroFinanceiro, filtroTreino]);

  const totalPaginas = Math.ceil(alunosFiltrados.length / alunosPorPagina) || 1;

  useEffect(() => {
    setPaginaAtual(1); // resetar ao trocar qualquer filtro
  }, [filtroFinanceiro, filtroTreino]);

  const indicePrimeiroAluno = (paginaAtual - 1) * alunosPorPagina;
  const indiceUltimoAluno = indicePrimeiroAluno + alunosPorPagina;

  const alunosPaginaAtual = alunosFiltrados.slice(
    indicePrimeiroAluno,
    indiceUltimoAluno
  );

  function irParaPagina(n) {
    if (n < 1 || n > totalPaginas) return;
    setPaginaAtual(n);
  }

  return (
    <div className="students-list">
      <h1>Lista de Alunos</h1>

      <div className="filtro-container">
        <label htmlFor="filtroPagamentos">Filtrar por situação financeira:</label>
        <select
          id="filtroPagamentos"
          value={filtroFinanceiro}
          onChange={(e) => setFiltroFinanceiro(e.target.value)}
        >
          <option value="todos">Todos</option>
          <option value="pagos">Pagos</option>
          <option value="nao-pagos">Não Pagos</option>
        </select>

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

      <ul>
        {alunosPaginaAtual.length === 0 ? (
          <li className="nenhum-aluno">Nenhum aluno encontrado.</li>
        ) : (
          alunosPaginaAtual.map((aluno) => (
            <li key={aluno.id}>
              <span className="aluno-nome">{aluno.nome}</span>

              {/* Situação Financeira */}
              <span
                className={
                  "situacao-financeira " +
                  (aluno.mensalidadePaga ? "pago" : "nao-pago")
                }
              >
                {aluno.mensalidadePaga ? "Pago" : "Não Pago"}
              </span>

              {/* Situação do treino */}
              <span
                className={
                  "situacao-treino " +
                  (aluno.treinoCadastrado ? "treino-ok" : "treino-faltando")
                }
              >
                {aluno.treinoCadastrado
                  ? "Treino cadastrado"
                  : "Sem treino cadastrado"}
              </span>
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
