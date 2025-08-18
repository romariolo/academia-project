import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import alunosFake from "../../data/Students";
import "../../styles/personal/ProgressView.css";
import BodySilhouette from "../../components/BodySilhouette.";

const ALUNOS_POR_PAGINA = 20;

export default function ProgressView() {
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const navigate = useNavigate();

  const totalPaginas = Math.ceil(alunosFake.length / ALUNOS_POR_PAGINA);

  const alunosPagina = alunosFake.slice(
    (paginaAtual - 1) * ALUNOS_POR_PAGINA,
    paginaAtual * ALUNOS_POR_PAGINA
  );

  function abrirModal(aluno) {
    setAlunoSelecionado(aluno);
  }

  function fecharModal() {
    setAlunoSelecionado(null);
  }

  function irParaPagina(numero) {
    if (numero < 1 || numero > totalPaginas) return;
    setPaginaAtual(numero);
  }

  function calcularProgresso(medidas) {
    if (!medidas) return 1;
    const { peitoCm = 0, cinturaCm = 0, bracoCm = 0, coxaCm = 0 } = medidas;
    const total = peitoCm + cinturaCm + bracoCm + coxaCm;
    const media = total / 4;
    return Math.min(Math.max(media / 100, 0.9), 1.8);
  }

  return (
    <div className="progress-view-container">
      <button className="voltar-btn" onClick={() => navigate(-1)}>
        ← Voltar
      </button>

      <h1>Visualizar Progresso</h1>

      <ul className="alunos-lista">
        {alunosPagina.map((aluno) => (
          <li
            key={aluno.id}
            className="aluno-item"
            onClick={() => abrirModal(aluno)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") abrirModal(aluno);
            }}
          >
            {aluno.nome}
          </li>
        ))}
      </ul>

      <div className="paginacao">
        <button
          onClick={() => irParaPagina(paginaAtual - 1)}
          disabled={paginaAtual === 1}
        >
          ← Anterior
        </button>

        <span>
          Página {paginaAtual} de {totalPaginas}
        </span>

        <button
          onClick={() => irParaPagina(paginaAtual + 1)}
          disabled={paginaAtual === totalPaginas}
        >
          Próxima →
        </button>
      </div>

      {alunoSelecionado && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <h3 id="modal-title">Progresso de {alunoSelecionado.nome}</h3>

            <div className="progresso-container" style={{ display: "flex", gap: "40px", alignItems: "center" }}>
              <BodySilhouette
                sexo={alunoSelecionado.sexo}
                progresso={calcularProgresso(alunoSelecionado.medidas)}
              />
              <div>
                <h4>Medidas Alcançadas</h4>
                <ul>
                  <li>Braço: {alunoSelecionado.medidas?.bracoCm ?? "-"} cm</li>
                  <li>Peito: {alunoSelecionado.medidas?.peitoCm ?? "-"} cm</li>
                  <li>Cintura: {alunoSelecionado.medidas?.cinturaCm ?? "-"} cm</li>
                  <li>Quadril: {alunoSelecionado.medidas?.quadrilCm ?? "-"} cm</li>
                  <li>Glúteos: {alunoSelecionado.medidas?.gluteosCm ?? "-"} cm</li>
                  <li>Coxas: {alunoSelecionado.medidas?.coxaCm ?? "-"} cm</li>
                  <li>Panturrilha: {alunoSelecionado.medidas?.panturrilhaCm ?? "-"} cm</li>
                </ul>
              </div>
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
