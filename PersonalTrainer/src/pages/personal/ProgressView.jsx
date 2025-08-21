import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAlunos } from "../../data/Students";
import "../../styles/personal/ProgressView.css";
import BodySilhouette from "../../components/BodySilhouette.";

const ALUNOS_POR_PAGINA = 5;

export default function ProgressView() {
  const [alunos, setAlunos] = useState([]);
  const [alunoSelecionado, setAlunoSelecionado] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const alunosSalvos = getAlunos().map((aluno) => ({
      ...aluno,
      medidasIniciais: aluno.medidasIniciais || aluno.medidas,
    }));
    setAlunos(alunosSalvos);
    localStorage.setItem("alunosFake", JSON.stringify(alunosSalvos));
  }, []);

  const totalPaginas = Math.ceil(alunos.length / ALUNOS_POR_PAGINA);

  const alunosPagina = alunos.slice(
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

  function calcularVariacao(inicial, atual) {
    return inicial != null && atual != null ? atual - inicial : 0;
  }

  function calcularProgresso(medidasIniciais, medidasAtuais) {
    if (!medidasIniciais || !medidasAtuais) return 1;
    const { peitoCm: p1 = 0, cinturaCm: c1 = 0, bracoCm: b1 = 0, coxaCm: cx1 = 0 } = medidasIniciais;
    const { peitoCm: p2 = 0, cinturaCm: c2 = 0, bracoCm: b2 = 0, coxaCm: cx2 = 0 } = medidasAtuais;
    const totalInicial = p1 + c1 + b1 + cx1;
    const totalAtual = p2 + c2 + b2 + cx2;
    const mediaInicial = totalInicial / 4;
    const mediaAtual = totalAtual / 4;
    return Math.min(Math.max(mediaAtual / mediaInicial, 0.9), 1.8);
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
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h3 id="modal-title">Progresso de {alunoSelecionado.nome}</h3>

            <div
              className="progresso-container"
              style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}
            >
              <BodySilhouette
                sexo={alunoSelecionado.sexo}
                progresso={calcularProgresso(
                  alunoSelecionado.medidasIniciais,
                  alunoSelecionado.medidas
                )}
              />

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div>
                  <h4>Medidas Iniciais</h4>
                  <ul>
                    <li>Braço: {alunoSelecionado.medidasIniciais?.bracoCm ?? "-"} cm</li>
                    <li>Peito: {alunoSelecionado.medidasIniciais?.peitoCm ?? "-"} cm</li>
                    <li>Cintura: {alunoSelecionado.medidasIniciais?.cinturaCm ?? "-"} cm</li>
                    <li>Quadril: {alunoSelecionado.medidasIniciais?.quadrilCm ?? "-"} cm</li>
                    <li>Glúteos: {alunoSelecionado.medidasIniciais?.gluteosCm ?? "-"} cm</li>
                    <li>Coxas: {alunoSelecionado.medidasIniciais?.coxaCm ?? "-"} cm</li>
                    <li>Panturrilha: {alunoSelecionado.medidasIniciais?.panturrilhaCm ?? "-"} cm</li>
                    <li>Peso: {alunoSelecionado.medidasIniciais?.pesoKg ?? "-"} kg</li>
                  </ul>
                </div>

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
                    <li>Peso: {alunoSelecionado.medidas?.pesoKg ?? "-"} kg</li>
                  </ul>
                </div>

                <div>
                  <h4>Variação</h4>
                  <ul>
                    <li>Braço: {calcularVariacao(alunoSelecionado.medidasIniciais?.bracoCm, alunoSelecionado.medidas?.bracoCm)} cm</li>
                    <li>Peito: {calcularVariacao(alunoSelecionado.medidasIniciais?.peitoCm, alunoSelecionado.medidas?.peitoCm)} cm</li>
                    <li>Cintura: {calcularVariacao(alunoSelecionado.medidasIniciais?.cinturaCm, alunoSelecionado.medidas?.cinturaCm)} cm</li>
                    <li>Quadril: {calcularVariacao(alunoSelecionado.medidasIniciais?.quadrilCm, alunoSelecionado.medidas?.quadrilCm)} cm</li>
                    <li>Glúteos: {calcularVariacao(alunoSelecionado.medidasIniciais?.gluteosCm, alunoSelecionado.medidas?.gluteosCm)} cm</li>
                    <li>Coxas: {calcularVariacao(alunoSelecionado.medidasIniciais?.coxaCm, alunoSelecionado.medidas?.coxaCm)} cm</li>
                    <li>Panturrilha: {calcularVariacao(alunoSelecionado.medidasIniciais?.panturrilhaCm, alunoSelecionado.medidas?.panturrilhaCm)} cm</li>
                    <li>Peso: {calcularVariacao(alunoSelecionado.medidasIniciais?.pesoKg, alunoSelecionado.medidas?.pesoKg)} kg</li>
                  </ul>
                </div>
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
