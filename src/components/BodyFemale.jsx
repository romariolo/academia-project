import React from "react";

export function BodyFemale({ medidas = {}, progresso = 1 }) {
  return (
    <svg
      width={200 * progresso}
      height={400 * progresso}
      viewBox="0 0 200 400"
      role="img"
      aria-label="Corpo feminino estilizado"
    >
      <circle cx="100" cy="60" r="40" fill="#FDD7CE" />
      <ellipse
        cx="100"
        cy="160"
        rx={55 * (medidas.peito || 1)}
        ry={75 * (medidas.peito || 1)}
        fill="#E07B91"
      />
      <ellipse
        cx="100"
        cy="260"
        rx={35 * (medidas.cintura || 1)}
        ry={45 * (medidas.cintura || 1)}
        fill="#B04861"
      />
      <circle
        cx={40}
        cy="160"
        r={25 * (medidas.braco || 1)}
        fill="#E496A4"
      />
      <circle
        cx={160}
        cy="160"
        r={25 * (medidas.braco || 1)}
        fill="#E496A4"
      />
    </svg>
  );
}
