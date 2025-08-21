import React, { useEffect, useState } from "react";
import { getPersonais } from "../../data/Students";
import SelectPersonal from "../personal/SelectPersonal";
import "../../styles/personal/PersonalList.css";

export default function PersonalList({ alunoId }) {
  const [personals, setPersonals] = useState([]);

  useEffect(() => {
    const pers = getPersonais();
    setPersonals(pers);
  }, []);

  return (
    <div className="personal-list-container">
      <h1>Personals Disponíveis</h1>
      <div className="personal-list-grid">
        {personals.map(personal => (
          <div key={personal.id} className="personal-card">
            <SelectPersonal alunoId={alunoId} onSelect={() => {}} />
          </div>
        ))}
      </div>
    </div>
  );
}
