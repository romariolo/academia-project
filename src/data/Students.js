function gerarMedidasBase() {
  const base = { bracoCm: 32, peitoCm: 90, cinturaCm: 80, quadrilCm: 98, gluteosCm: 120, coxaCm: 90, panturrilhaCm: 40, pesoKg: 70 };
  const fator = 0.85 + Math.random() * 0.3;
  return {
    bracoCm: Math.round(base.bracoCm * fator),
    peitoCm: Math.round(base.peitoCm * fator),
    cinturaCm: Math.round(base.cinturaCm * fator),
    quadrilCm: Math.round(base.quadrilCm * fator),
    gluteosCm: Math.round(base.gluteosCm * fator),
    coxaCm: Math.round(base.coxaCm * fator),
    panturrilhaCm: Math.round(base.panturrilhaCm * fator),
    pesoKg: Math.round(base.pesoKg * fator)
  };
}

const perfilBase = { primeiroNome: "", sobrenome: "", cpf: "", rua: "", numero: "", complemento: "", cep: "", cidade: "", estado: "", email: "", confirmarEmail: "", senha: "", confirmarSenha: "", whatsapp: "" };

let alunosFake = [
  { id: 1, nome: "Maria Natalia Araujo Felix", treinoCadastrado: false, mensalidadePaga: true, sexo: "Feminino", medidasIniciais: gerarMedidasBase(), active: true, medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 2, nome: "Rodolfo Rodrigues de Araujo", treinoCadastrado: false, mensalidadePaga: true, sexo: "Masculino", medidasIniciais: gerarMedidasBase(), active: true, medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 3, nome: "Maria Luisa Felix Rodrigues", treinoCadastrado: false, mensalidadePaga: true, sexo: "Masculino", medidasIniciais: gerarMedidasBase(), active: true, medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } }
];

const STORAGE_KEY = "alunosFake";

localStorage.setItem(STORAGE_KEY, JSON.stringify(alunosFake));

export function getAlunos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function getAlunoById(id) {
  const alunos = getAlunos();
  return alunos.find(a => a.id === id) || null;
}

export function salvarAluno(alunoAtualizado) {
  const alunos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const index = alunos.findIndex(a => a.id === alunoAtualizado.id);
  if (index >= 0) {
    alunos[index] = { 
      ...alunos[index], 
      perfil: { ...alunos[index].perfil, ...alunoAtualizado.perfil },
      medidasIniciais: { ...alunos[index].medidasIniciais, ...alunoAtualizado.medidasIniciais },
      medidas: { ...alunos[index].medidas, ...alunoAtualizado.medidas },
      treino: [...alunoAtualizado.treino]
    };
  } else {
    alunos.push(alunoAtualizado);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
  return alunos;
}

export default alunosFake;
