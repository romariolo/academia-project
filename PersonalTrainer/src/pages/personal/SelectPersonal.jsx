import React, { useEffect, useState } from "react";
import { getAlunos, salvarAluno, getPersonais } from "../../data/Students";
import "../../styles/personal/SelectPesonal.css";

export default function SelectPersonal({ alunoId, onSelect }) {
  const [personals, setPersonals] = useState([]);
  const [aluno, setAluno] = useState(null);

  useEffect(() => {
    const pers = getPersonais();
    setPersonals(pers);
    const todosAlunos = getAlunos();
    const a = todosAlunos.find(a => a.id === alunoId);
    setAluno(a);
  }, [alunoId]);

  function escolherPersonal(personal) {
    if (!aluno) return;
    const alunoAtualizado = { ...aluno, personalId: personal.id };
    salvarAluno(alunoAtualizado);
    if (onSelect) onSelect(personal);
    alert(`Você escolheu ${personal.nome} como seu personal!`);
  }

  return (
    <div className="select-personal-container">
      <h3>Escolha seu Personal Trainer</h3>
      <div className="personal-list">
        {personals.map(personal => (
          <div key={personal.id} className="personal-card">
            {personal.fotoPerfil ? (
              <img src={personal.fotoPerfil} alt={personal.nome} />
            ) : (
              <div className="placeholder">👤</div>
            )}
            <h4>{personal.nome}</h4>
            <p>Personal Trainer</p>
            <button onClick={() => escolherPersonal(personal)}>
              Escolher
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
