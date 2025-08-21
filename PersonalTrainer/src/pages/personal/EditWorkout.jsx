// src/pages/personal/EditWorkout.jsx
import React, { useState } from "react";
import "../../styles/personal/EditWorkout.css";

export default function EditWorkout() {
  const [exercicios, setExercicios] = useState([
    { nome: "Supino", series: 3, repeticoes: 12, carga: "50kg", videoURL: "" },
    { nome: "Agachamento", series: 4, repeticoes: 10, carga: "80kg", videoURL: "" },
  ]);

  function handleChange(index, campo, valor) {
    const novosEx = [...exercicios];
    novosEx[index][campo] = valor;
    setExercicios(novosEx);
  }

  function adicionarExercicio() {
    setExercicios([...exercicios, { nome: "", series: 0, repeticoes: 0, carga: "", videoURL: "" }]);
  }

  function removerExercicio(index) {
    const novosEx = [...exercicios];
    novosEx.splice(index, 1);
    setExercicios(novosEx);
  }

  function salvarTreino() {
    alert("Treino salvo com sucesso!");
  }

  return (
    <div className="edit-workout-container">
      <h2>Editar Treino</h2>
      {exercicios.map((ex, idx) => (
        <div key={idx} className="exercicio-item">
          <input
            type="text"
            placeholder="Nome do exercício"
            value={ex.nome}
            onChange={(e) => handleChange(idx, "nome", e.target.value)}
          />
          <input
            type="number"
            placeholder="Séries"
            value={ex.series}
            onChange={(e) => handleChange(idx, "series", e.target.value)}
          />
          <input
            type="number"
            placeholder="Repetições"
            value={ex.repeticoes}
            onChange={(e) => handleChange(idx, "repeticoes", e.target.value)}
          />
          <input
            type="text"
            placeholder="Carga"
            value={ex.carga}
            onChange={(e) => handleChange(idx, "carga", e.target.value)}
          />
          <input
            type="text"
            placeholder="URL do vídeo"
            value={ex.videoURL}
            onChange={(e) => handleChange(idx, "videoURL", e.target.value)}
          />
          <button onClick={() => removerExercicio(idx)}>Remover</button>
        </div>
      ))}
      <button onClick={adicionarExercicio}>Adicionar Exercício</button>
      <button onClick={salvarTreino}>Salvar Treino</button>
    </div>
  );
}
