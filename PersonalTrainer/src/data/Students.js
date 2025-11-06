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
  whatsapp: "" 
};

let alunosFake = [
  { id: 1, nome: "Maria Natalia Araujo Felix", treinoCadastrado: false, mensalidadePaga: true, sexo: "Feminino", medidasIniciais: gerarMedidasBase(), active: true, medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 2, nome: "Rodolfo Rodrigues de Araujo", treinoCadastrado: false, mensalidadePaga: true, sexo: "Masculino", medidasIniciais: gerarMedidasBase(), active: true, medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } },
  { id: 3, nome: "Maria Luisa Felix Rodrigues", treinoCadastrado: false, mensalidadePaga: true, sexo: "Masculino", medidasIniciais: gerarMedidasBase(), active: true, medidas: gerarMedidasBase(), treino: [], perfil: { ...perfilBase } }
];

let personaisFake = [
  {
    id: 1,
    nome: "Carlos Eduardo Silva",
    cpf: "123.456.789-00",
    rua: "Av. Paulista",
    numero: "1000",
    complemento: "Ap 12",
    cep: "01310-000",
    cidade: "São Paulo",
    estado: "SP",
    email: "carlos.silva@exemplo.com",
    confirmarEmail: "carlos.silva@exemplo.com",
    senha: "123456",
    confirmarSenha: "123456",
    whatsapp: "(11) 99999-1111",
    comprovanteProfissao: "carlos-comprovante.pdf",
    fotoPerfil: "carlos-foto.jpg"
  },
  {
    id: 2,
    nome: "Fernanda Oliveira Santos",
    cpf: "987.654.321-00",
    rua: "Rua das Flores",
    numero: "200",
    complemento: "",
    cep: "40000-000",
    cidade: "Salvador",
    estado: "BA",
    email: "fernanda.santos@exemplo.com",
    confirmarEmail: "fernanda.santos@exemplo.com",
    senha: "abcdef",
    confirmarSenha: "abcdef",
    whatsapp: "(71) 98888-2222",
    comprovanteProfissao: "fernanda-comprovante.pdf",
    fotoPerfil: "fernanda-foto.jpg"
  },
  {
    id: 3,
    nome: "João Pedro Almeida",
    cpf: "555.666.777-88",
    rua: "Rua das Palmeiras",
    numero: "350",
    complemento: "Casa 2",
    cep: "30140-100",
    cidade: "Belo Horizonte",
    estado: "MG",
    email: "joao.almeida@exemplo.com",
    confirmarEmail: "joao.almeida@exemplo.com",
    senha: "qwerty",
    confirmarSenha: "qwerty",
    whatsapp: "(31) 97777-3333",
    comprovanteProfissao: "joao-comprovante.pdf",
    fotoPerfil: "joao-foto.jpg"
  }
];

const STORAGE_KEY_ALUNOS = "alunosFake";
const STORAGE_KEY_PERSONAIS = "personaisFake";

localStorage.setItem(STORAGE_KEY_ALUNOS, JSON.stringify(alunosFake));
localStorage.setItem(STORAGE_KEY_PERSONAIS, JSON.stringify(personaisFake));

export function getAlunos() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_ALUNOS)) || [];
}

export function getAlunoById(id) {
  const alunos = getAlunos();
  return alunos.find(a => a.id === id) || null;
}

export function salvarAluno(alunoAtualizado) {
  const alunos = JSON.parse(localStorage.getItem(STORAGE_KEY_ALUNOS)) || [];
  const index = alunos.findIndex(a => a.id === alunoAtualizado.id);
  if (index >= 0) {
    alunos[index] = { 
      ...alunos[index], 
      perfil: { ...alunos[index].perfil, ...alunoAtualizado.perfil },
      medidasIniciais: { ...alunos[index].medidasIniciais, ...alunoAtualizado.medidasIniciais },
      medidas: { ...alunos[index].medidas, ...alunoAtualizado.medidas },
      treino: [...alunoAtualizado.treino],
      personalId: alunoAtualizado.personalId || null
    };
  } else {
    alunos.push(alunoAtualizado);
  }
  localStorage.setItem(STORAGE_KEY_ALUNOS, JSON.stringify(alunos));
  return alunos;
}

export function getPersonais() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY_PERSONAIS)) || [];
}

export default { alunosFake, personaisFake };
