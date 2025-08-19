// src/data/Students.js

function gerarMedidasBase() {
  const base = {
    bracoCm: 32,
    peitoCm: 90,
    cinturaCm: 80,
    quadrilCm: 98,
    gluteosCm: 120,
    coxaCm: 90,
    panturrilhaCm: 40,
    pesoKg: 70,
  };
  const fator = 0.85 + Math.random() * 0.3;

  return {
    bracoCm: Math.round(base.bracoCm * fator),
    peitoCm: Math.round(base.peitoCm * fator),
    cinturaCm: Math.round(base.cinturaCm * fator),
    quadrilCm: Math.round(base.quadrilCm * fator),
    gluteosCm: Math.round(base.gluteosCm * fator),
    coxaCm: Math.round(base.coxaCm * fator),
    panturrilhaCm: Math.round(base.panturrilhaCm * fator),
    pesoKg: Math.round(base.pesoKg * fator),
  };
}

const perfilBase = {
  primeiroNome: "",
  sobrenome: "",
  cpf: "",
  rua: "",
  numero: "",
  complemento: "",
  cep: "",
  cidade: "",
  estado: "",
  email: "",
  confirmarEmail: "",
  senha: "",
  confirmarSenha: "",
};

let alunosFake = [
  { id: 1, nome: "Maria Natalia", treinoCadastrado: false, mensalidadePaga: true, sexo: "Feminino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 2, nome: "Maria Oliveira", treinoCadastrado: false, mensalidadePaga: true, sexo: "Feminino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 3, nome: "Pedro Santos", treinoCadastrado: false, mensalidadePaga: false, sexo: "Masculino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 4, nome: "Rodolfo Rodrigues de Araujo", treinoCadastrado: false, mensalidadePaga: false, sexo: "Masculino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 5, nome: "Maria Luisa", treinoCadastrado: false, mensalidadePaga: true, sexo: "Feminino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 6, nome: "Silvia Maria", treinoCadastrado: false, mensalidadePaga: true, sexo: "Feminino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 7, nome: "Ramiro Rodrigues", treinoCadastrado: false, mensalidadePaga: true, sexo: "Masculino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 8, nome: "Lucas Almeida", treinoCadastrado: false, mensalidadePaga: false, sexo: "Masculino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 9, nome: "Fernanda Costa", treinoCadastrado: false, mensalidadePaga: true, sexo: "Feminino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 10, nome: "Bruno Martins", treinoCadastrado: false, mensalidadePaga: false, sexo: "Masculino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 11, nome: "Clara Ribeiro", treinoCadastrado: false, mensalidadePaga: true, sexo: "Feminino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 12, nome: "Diego Lopes", treinoCadastrado: false, mensalidadePaga: true, sexo: "Masculino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 13, nome: "Ana Beatriz", treinoCadastrado: false, mensalidadePaga: true, sexo: "Feminino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 14, nome: "Rafael Silva", treinoCadastrado: false, mensalidadePaga: false, sexo: "Masculino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 15, nome: "Juliana Melo", treinoCadastrado: false, mensalidadePaga: true, sexo: "Feminino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 16, nome: "Carlos Eduardo", treinoCadastrado: false, mensalidadePaga: false, sexo: "Masculino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 17, nome: "Patrícia Gomes", treinoCadastrado: false, mensalidadePaga: true, sexo: "Feminino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 18, nome: "André Souza", treinoCadastrado: false, mensalidadePaga: false, sexo: "Masculino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 19, nome: "Larissa Rocha", treinoCadastrado: false, mensalidadePaga: true, sexo: "Feminino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 20, nome: "Gustavo Ferreira", treinoCadastrado: false, mensalidadePaga: true, sexo: "Masculino", medidasIniciais: gerarMedidasBase(), medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
];

// 🔹 Funções de persistência (simulando BD)
export function getAlunos() {
  const alunosSalvos = JSON.parse(localStorage.getItem("alunosFake"));
  if (alunosSalvos) {
    alunosFake = alunosSalvos;
  } else {
    localStorage.setItem("alunosFake", JSON.stringify(alunosFake));
  }
  return alunosFake;
}

export function getAlunoById(id) {
  const alunos = getAlunos();
  return alunos.find((a) => a.id === id) || null;
}

export function salvarAluno(aluno) {
  const alunos = getAlunos();
  const index = alunos.findIndex((a) => a.id === aluno.id);

  if (index >= 0) {
    alunos[index] = aluno;
  } else {
    alunos.push(aluno);
  }

  localStorage.setItem("alunosFake", JSON.stringify(alunos));
}

export default getAlunos;
