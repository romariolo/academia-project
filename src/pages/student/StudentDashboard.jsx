import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BodySilhouette from "../../components/BodySilhouette.";
import { getAlunoById, salvarAluno } from "../../data/Students";
import "../../styles/student/StudentDashboard.css";

export default function StudentDashboard() {
  const [aluno, setAluno] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("iniciais");
  const [menuAberto, setMenuAberto] = useState(false);
  const [diaSelecionado, setDiaSelecionado] = useState("");
  const [opcoesDiasTreino, setOpcoesDiasTreino] = useState([]);
  const navigate = useNavigate();
  const ordemDias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

  useEffect(() => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!usuarioLogado) {
      navigate("/login");
      return;
    }
    const alunoEncontrado = getAlunoById(usuarioLogado.id);
    if (!alunoEncontrado) {
      navigate("/login");
      return;
    }
    const treinoLista = alunoEncontrado.treino || [];
    setAluno({
      ...alunoEncontrado,
      medidasIniciais: alunoEncontrado.medidasIniciais || {},
      medidas: alunoEncontrado.medidas || {},
      perfil: alunoEncontrado.perfil || {},
      treino: treinoLista,
    });
    const diasTreinoDisponiveis = Array.from(
      new Set(
        (treinoLista || []).map((t) => {
          const d = t.dia || t.diaSemana || "";
          return String(d).split("-")[0].split(" ")[0];
        }).filter(Boolean)
      )
    );
    setOpcoesDiasTreino(diasTreinoDisponiveis);
  }, [navigate]);

  function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  }

  function handleChange(e, campo, tipo) {
    let valor = e.target.value;
    if (campo === "cpf") valor = valor.replace(/\D/g, "").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2").slice(0, 14);
    if (campo === "whatsapp") valor = valor.replace(/\D/g, "").replace(/^(\d{2})(\d)/g, "$1 $2").replace(/(\d{1})(\d{4})(\d{4})$/, "$1 $2-$3").slice(0, 13);
    if (campo === "cep") valor = valor.replace(/\D/g, "").replace(/^(\d{2})(\d{3})(\d)/, "$1.$2-$3").slice(0, 10);
    setAluno(prev => ({ ...prev, [tipo]: { ...prev[tipo], [campo]: valor } }));
    if (campo === "cep" && valor.length === 10) {
      const cepNumeros = valor.replace(/\D/g, "");
      fetch(`https://viacep.com.br/ws/${cepNumeros}/json/`).then(res => res.json()).then(data => {
        if (!data.erro) setAluno(prev => ({ ...prev, perfil: { ...prev.perfil, cidade: data.localidade, estado: data.uf } }));
      });
    }
  }

  function salvar(tipo) {
    if (!aluno) return;
    if (tipo === "perfil" && aluno.perfil.cpf && !validarCPF(aluno.perfil.cpf)) {
      alert("CPF inválido!");
      return;
    }
    salvarAluno(aluno);
    alert(`${tipo === "perfil" ? "Perfil" : "Medidas/Treinos"} salvos!`);
  }

  function calcularVariacao(campo) {
    const toNumber = v => parseFloat((v || "0").toString().replace(",", "."));
    const atual = toNumber(aluno.medidas[campo]);
    const inicial = toNumber(aluno.medidasIniciais[campo]);
    const diff = atual - inicial;
    return diff.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).replace(".", ",");
  }

  function handleLogout() {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  }

  function normalizeDia(t) {
    const raw = t?.dia || t?.diaSemana || "";
    return String(raw).split("-")[0].split(" ")[0];
  }

  if (!aluno) return null;

  const camposMedidas = [
    { key: "bracoCm", label: "Braço", unidade: "cm" },
    { key: "peitoCm", label: "Peito", unidade: "cm" },
    { key: "cinturaCm", label: "Cintura", unidade: "cm" },
    { key: "quadrilCm", label: "Quadril", unidade: "cm" },
    { key: "gluteosCm", label: "Glúteos", unidade: "cm" },
    { key: "coxaCm", label: "Coxas", unidade: "cm" },
    { key: "panturrilhaCm", label: "Panturrilha", unidade: "cm" },
    { key: "pesoKg", label: "Peso", unidade: "kg" },
  ];

  const camposPerfil = [
    { key: "primeiroNome", label: "Primeiro Nome", tipo: "text" },
    { key: "sobrenome", label: "Sobrenome", tipo: "text" },
    { key: "cpf", label: "CPF", tipo: "text" },
    { key: "whatsapp", label: "WhatsApp", tipo: "text" },
    { key: "rua", label: "Rua", tipo: "text" },
    { key: "numero", label: "Número", tipo: "text" },
    { key: "complemento", label: "Complemento", tipo: "text" },
    { key: "cep", label: "CEP", tipo: "text" },
    { key: "cidade", label: "Cidade", tipo: "text", readOnly: true },
    { key: "estado", label: "Estado", tipo: "text", readOnly: true },
    { key: "email", label: "E-mail", tipo: "email" },
    { key: "confirmarEmail", label: "Confirmar E-mail", tipo: "email" },
    { key: "senha", label: "Senha", tipo: "password" },
    { key: "confirmarSenha", label: "Confirmar Senha", tipo: "password" },
  ];

  const treinosPorDia = ordemDias.map(dia => ({
    dia,
    treinos: (aluno.treino || []).filter(t => normalizeDia(t) === dia)
  }));
  const treinosFiltrados = (aluno.treino || []).filter(t => normalizeDia(t) === diaSelecionado);

  return (
    <div className="student-dashboard-container">
      <div className={`sidebar ${menuAberto ? "ativo" : ""}`}>
        <h2>{`${aluno.perfil.primeiroNome || ""} ${aluno.perfil.sobrenome || ""}`}</h2>
        <button className={abaAtiva === "perfil" ? "active" : ""} onClick={() => setAbaAtiva("perfil")}>Perfil</button>
        <button className={abaAtiva === "iniciais" ? "active" : ""} onClick={() => setAbaAtiva("iniciais")}>Medidas Iniciais</button>
        <button className={abaAtiva === "atuais" ? "active" : ""} onClick={() => setAbaAtiva("atuais")}>Medidas Atuais</button>
        <button className={abaAtiva === "variacao" ? "active" : ""} onClick={() => setAbaAtiva("variacao")}>Variação</button>
        <button className={abaAtiva === "meusTreinos" ? "active" : ""} onClick={() => setAbaAtiva("meusTreinos")}>Meus Treinos</button>
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
            <h3>{abaAtiva === "iniciais" ? "Medidas Iniciais" : "Medidas Finais"}</h3>
            <ul>
              {camposMedidas.map(({ key, label, unidade }) => (
                <li key={key}>
                  <label htmlFor={`${abaAtiva}-${key}`}>{label}:</label>
                  <input
                    id={`${abaAtiva}-${key}`}
                    type="text"
                    inputMode="decimal"
                    placeholder="000,00"
                    maxLength={6}
                    value={abaAtiva === "iniciais" ? aluno.medidasIniciais[key] || "" : aluno.medidas[key] || ""}
                    onChange={(e) => handleChange(e, key, abaAtiva === "iniciais" ? "medidasIniciais" : "medidas")}
                  />
                  {unidade}
                </li>
              ))}
            </ul>
            <button className="btn-save" onClick={() => salvar(abaAtiva === "iniciais" ? "medidasIniciais" : "medidas")}>Salvar</button>
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
                            <span>{ex.nome || ex.nomeExercicio} - {ex.series}x{ex.repeticoes} - Carga: {ex.carga}</span>
                            {ex.videoURL && (
                              <button className="video-btn-small" onClick={() => window.open(ex.videoURL, "_blank")}>▶️</button>
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
                      <span>{ex.nome || ex.nomeExercicio} - {ex.series}x{ex.repeticoes} - Carga: {ex.carga}</span>
                      {ex.videoURL && (
                        <button className="video-btn-small" onClick={() => window.open(ex.videoURL, "_blank")}>▶️</button>
                      )}
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
