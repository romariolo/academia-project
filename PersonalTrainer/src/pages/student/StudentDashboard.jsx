import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import BodySilhouette from "../../components/BodySilhouette.";
import SelectPersonal from "../../pages/personal/SelectPersonal";
import "../../styles/student/StudentDashboard.css";

export default function StudentDashboard() {
  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(true);
  const [abaAtiva, setAbaAtiva] = useState("perfil");
  const [menuAberto, setMenuAberto] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState("");
  const [opcoesDiasTreino, setOpcoesDiasTreino] = useState([]);
  const [modalPersonalAberto, setModalPersonalAberto] = useState(false);
  const navigate = useNavigate();
  const ordemDias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  const fetchAlunoData = async () => {
    setLoading(true);
    try {
      const response = await api.get('/users/me');
      const userData = response.data;
      
      const initialMeasurements = userData.Measurements?.find(m => m.is_initial) || {};
      const currentMeasurements = userData.Measurements?.[0] || initialMeasurements;
      
      const alunoFormatado = {
        id: userData.id,
        nome: userData.nome,
        sexo: userData.sexo || 'Masculino',
        medidasIniciais: {
            bracoCm: initialMeasurements.braco_cm || '', peitoCm: initialMeasurements.peito_cm || '', cinturaCm: initialMeasurements.cintura_cm || '', quadrilCm: initialMeasurements.quadril_cm || '', gluteosCm: initialMeasurements.gluteos_cm || '', coxaCm: initialMeasurements.coxa_cm || '', panturrilhaCm: initialMeasurements.panturrilha_cm || '', pesoKg: initialMeasurements.peso_kg || '',
        },
        medidas: {
            bracoCm: currentMeasurements.braco_cm || '', peitoCm: currentMeasurements.peito_cm || '', cinturaCm: currentMeasurements.cintura_cm || '', quadrilCm: currentMeasurements.quadril_cm || '', gluteosCm: currentMeasurements.gluteos_cm || '', coxaCm: currentMeasurements.coxa_cm || '', panturrilhaCm: currentMeasurements.panturrilha_cm || '', pesoKg: currentMeasurements.peso_kg || '',
        },
        perfil: {
            primeiroNome: userData.nome?.split(' ')[0] || '',
            sobrenome: userData.nome?.split(' ').slice(1).join(' ') || '',
            cpf: userData.cpf || '',
            whatsapp: userData.whatsapp || '',
            rua: userData.rua || '',
            numero: userData.numero || '',
            complemento: userData.complemento || '',
            cep: userData.cep || '',
            cidade: userData.cidade || '',
            estado: userData.estado || '',
            email: userData.email || '',
        },
        treino: userData.ReceivedWorkouts?.[0]?.Exercises || [],
      };
      
      setAluno(alunoFormatado);

      const diasTreinoDisponiveis = Array.from(
          new Set((alunoFormatado.treino || []).map(t => String(t.dia_semana).split("-")[0].split(" ")[0]).filter(Boolean))
      );
      setOpcoesDiasTreino(diasTreinoDisponiveis);

    } catch (error) {
      console.error("Erro ao buscar dados do aluno:", error);
      handleLogout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlunoData();
  }, []);

  const salvar = async (tipo) => {
    if (!aluno) return;
    try {
      if (tipo === 'perfil') {
        const response = await api.put('/users/me', aluno.perfil);
        localStorage.setItem('userData', JSON.stringify(response.data));
        alert("Perfil salvo com sucesso!");
      } else {
        const isInitial = tipo === 'medidasIniciais';
        const dataToSave = isInitial ? aluno.medidasIniciais : aluno.medidas;
        await api.post('/student/measurements', { ...dataToSave, is_initial: isInitial });
        alert("Medidas salvas com sucesso!");
        fetchAlunoData(); 
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Erro ao salvar os dados.';
      alert(errorMsg);
    }
  };

  function handleChange(e, campo, tipo) {
    let valor = e.target.value;
    setAluno((prev) => ({ ...prev, [tipo]: { ...prev[tipo], [campo]: valor } }));
  }

  function calcularVariacao(campo) {
    const toNumber = (v) => parseFloat((v || "0").toString().replace(",", "."));
    const atual = toNumber(aluno.medidas[campo]);
    const inicial = toNumber(aluno.medidasIniciais[campo]);
    const diff = atual - inicial;
    return diff.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(".", ",");
  }

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    navigate('/login');
  };

  function normalizeDia(t) {
    const raw = t?.dia || t?.diaSemana || "";
    return String(raw).split("-")[0].split(" ")[0];
  }

  if (loading || !aluno) {
    return <h1>Carregando dados do aluno...</h1>;
  }

  const camposMedidas = [
    { key: "bracoCm", label: "Braço", unidade: "cm" }, { key: "peitoCm", label: "Peito", unidade: "cm" }, { key: "cinturaCm", label: "Cintura", unidade: "cm" }, { key: "quadrilCm", label: "Quadril", unidade: "cm" }, { key: "gluteosCm", label: "Glúteos", unidade: "cm" }, { key: "coxaCm", label: "Coxas", unidade: "cm" }, { key: "panturrilhaCm", label: "Panturrilha", unidade: "cm" }, { key: "pesoKg", label: "Peso", unidade: "kg" },
  ];

  const camposPerfil = [
    { key: "primeiroNome", label: "Primeiro Nome", tipo: "text" }, { key: "sobrenome", label: "Sobrenome", tipo: "text" }, { key: "cpf", label: "CPF", tipo: "text" }, { key: "whatsapp", label: "WhatsApp", tipo: "text" }, { key: "rua", label: "Rua", tipo: "text" }, { key: "numero", label: "Número", tipo: "text" }, { key: "complemento", label: "Complemento", tipo: "text" }, { key: "cep", label: "CEP", tipo: "text" }, { key: "cidade", label: "Cidade", tipo: "text", readOnly: true }, { key: "estado", label: "Estado", tipo: "text", readOnly: true }, { key: "email", label: "E-mail", tipo: "email" }, { key: "confirmarEmail", label: "Confirmar E-mail", tipo: "email" }, { key: "senha", label: "Senha", tipo: "password" }, { key: "confirmarSenha", label: "Confirmar Senha", tipo: "password" },
  ];

  const treinosPorDia = ordemDias.map((dia) => ({
    dia,
    treinos: (aluno.treino || []).filter((t) => normalizeDia(t) === dia),
  }));
  const treinosFiltrados = (aluno.treino || []).filter(
    (t) => normalizeDia(t) === diaSelecionado
  );

  return (
    <div className="student-dashboard-container">
      <div className={`sidebar ${menuAberto ? "ativo" : ""}`}>
        <h2>{`${aluno.perfil.primeiroNome || ""} ${aluno.perfil.sobrenome || ""}`}</h2>
        <button className={abaAtiva === "perfil" ? "active" : ""} onClick={() => setAbaAtiva("perfil")}>Perfil</button>
        <button className={abaAtiva === "iniciais" ? "active" : ""} onClick={() => setAbaAtiva("iniciais")}>Medidas Iniciais</button>
        <button className={abaAtiva === "atuais" ? "active" : ""} onClick={() => setAbaAtiva("atuais")}>Medidas Atuais</button>
        <button className={abaAtiva === "variacao" ? "active" : ""} onClick={() => setAbaAtiva("variacao")}>Variação</button>
        <button className={abaAtiva === "meusTreinos" ? "active" : ""} onClick={() => setAbaAtiva("meusTreinos")}>Meus Treinos</button>
        <button className="btn-personal" onClick={() => setModalPersonalAberto(true)}>Escolher Personal</button>
        <button className="btn-logout" onClick={handleLogout}>Sair</button>
      </div>

      <div className="menu-toggle" onClick={() => setMenuAberto(!menuAberto)}>☰</div>

      <div className={`dashboard-content ${menuAberto ? "blurred" : ""}`}>
        {abaAtiva !== "perfil" && abaAtiva !== "meusTreinos" && (
          <div className="silhouette-wrapper">
            <BodySilhouette sexo={aluno.sexo} progresso={1} />
          </div>
        )}

        {abaAtiva === "perfil" && (
          <div className="perfil-section">
            <h3>Perfil</h3>
            <ul>
              {camposPerfil.map(({ key, label, tipo, readOnly }) => (
                <li key={key}>
                  <label htmlFor={`perfil-${key}`}>{label}:</label>
                  <input
                    id={`perfil-${key}`}
                    type={tipo}
                    value={aluno.perfil[key] || ""}
                    readOnly={readOnly || false}
                    onChange={(e) => handleChange(e, key, "perfil")}
                  />
                </li>
              ))}
            </ul>
            <button className="btn-save" onClick={() => salvar("perfil")}>Salvar</button>
          </div>
        )}

        {(abaAtiva === "iniciais" || abaAtiva === "atuais") && (
          <div className="medidas-section">
            <h3>{abaAtiva === "iniciais" ? "Medidas Iniciais" : "Medidas Atuais"}</h3>
            <ul>
              {camposMedidas.map(({ key, label, unidade }) => (
                <li key={key}>
                  <label htmlFor={`${abaAtiva}-${key}`}>{label}:</label>
                  <input
                    id={`${abaAtiva}-${key}`}
                    type="text"
                    inputMode="decimal"
                    placeholder="00,00"
                    maxLength={6}
                    value={abaAtiva === "iniciais" ? aluno.medidasIniciais[key] || "" : aluno.medidas[key] || ""}
                    onChange={(e) => handleChange(e, key, abaAtiva === "iniciais" ? "medidasIniciais" : "medidas")}
                  />
                  {unidade}
                </li>
              ))}
            </ul>
            <button className="btn-save" onClick={() => salvar(abaAtiva)}>Salvar</button>
          </div>
        )}

        {abaAtiva === "variacao" && (
          <div className="medidas-section">
            <h3>Variação</h3>
            <ul>
              {camposMedidas.map(({ key, label, unidade }) => (
                <li key={key}>{label}: {calcularVariacao(key)} {unidade}</li>
              ))}
            </ul>
          </div>
        )}

        {abaAtiva === "meusTreinos" && (
          <div className="treinos-section">
            <h3>Meus Treinos</h3>
            <label>
              Filtrar por dia:
              <select value={diaSelecionado} onChange={(e) => setDiaSelecionado(e.target.value)}>
                <option value="">Todos os dias</option>
                {opcoesDiasTreino.map((dia) => (
                  <option key={dia} value={dia}>{dia}</option>
                ))}
              </select>
            </label>

            {((!diaSelecionado && treinosPorDia.every((d) => d.treinos.length === 0)) ||
             (diaSelecionado && treinosFiltrados.length === 0)) ? (
              <p>Nenhum treino disponível.</p>
            ) : (
              !diaSelecionado ? (
                treinosPorDia.map(({ dia, treinos }) =>
                  treinos.length > 0 && (
                    <div key={dia} className="dia-treino">
                      <h4>{dia}</h4>
                      <ul>
                        {treinos.map((ex, idx) => (
                          <li key={idx}>
                            <span>{ex.nome} - {ex.series}x{ex.repeticoes} - Carga: {ex.carga}</span>
                            {ex.video_url && (
                              <button className="video-btn-small" onClick={() => window.open(ex.video_url, "_blank")}>▶️</button>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )
              ) : (
                <ul>
                  {treinosFiltrados.map((ex, idx) => (
                    <li key={idx}>
                      <span>{ex.nome} - {ex.series}x{ex.repeticoes} - Carga: {ex.carga}</span>
                      {ex.video_url && (
                        <button className="video-btn-small" onClick={() => window.open(ex.video_url, "_blank")}>▶️</button>
                      )}
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>
        )}

        {modalPersonalAberto && (
          <div className="modal-overlay" onClick={() => setModalPersonalAberto(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setModalPersonalAberto(false)}>X</button>
              <SelectPersonal alunoId={aluno.id} onSelect={() => setModalPersonalAberto(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}