import React from "react";

export function BodyMale({ medidas = {}, progresso = 1 }) {
  return (
    <svg
      width={200 * progresso}
      height={400 * progresso}
      viewBox="0 0 200 400"
      role="img"
      aria-label="Corpo masculino estilizado"
    >
      <circle cx="100" cy="60" r="40" fill="#FAD8B0" />
      <ellipse
        cx="100"
        cy="160"
        rx={60 * (medidas.peito || 1)}
        ry={80 * (medidas.peito || 1)}
        fill="#C36"
      />
      <ellipse
        cx="100"
        cy="260"
        rx={40 * (medidas.cintura || 1)}
        ry={50 * (medidas.cintura || 1)}
        fill="#A23"
      />
      <circle
        cx={40}
        cy="160"
        r={30 * (medidas.braco || 1)}
        fill="#D67"
      />
      <circle
        cx={160}
        cy="160"
        r={30 * (medidas.braco || 1)}
        fill="#D67"
      />
    </svg>
  );
}
