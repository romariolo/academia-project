import React from "react";
import silhuetaMale from "../assets/silhueta_male.svg";
import silhuetaFemale from "../assets/silhuetas_female.svg";

export default function BodySilhouette({ sexo = "Masculino", progresso = 1 }) {
  const imagem = sexo === "Feminino" ? silhuetaFemale : silhuetaMale;

  const escala = progresso * 1;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <img
        src={imagem}
        alt={`Silhueta ${sexo.toLowerCase()}`}
        style={{
          width: `${200 * escala}px`,
          height: `${500 * escala}px`,
          transition: "all 0.3s ease-in-out",
        }}
      />
    </div>
  );
}
