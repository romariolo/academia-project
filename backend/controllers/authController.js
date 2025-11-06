const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { 
    nome, 
    email, 
    password, 
    cpf, 
    cep, 
    rua, 
    numero, 
    role, 
    personal_id 
  } = req.body;

  if (!password) {
    return res.status(400).json({ message: 'A senha é obrigatória.' });
  }
  
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'Este e-mail já está em uso.' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const foto_url = req.files && req.files.foto ? req.files.foto[0].path : null;
    const certificado_url = req.files && req.files.certificado ? req.files.certificado[0].path : null;

    const newUser = await User.create({
      nome,
      email,
      password_hash,
      cpf,
      cep,
      rua,
      numero,
      role,
      personal_id: role === 'aluno' ? personal_id : null,
      foto_url,
      certificado_url
    });

    const userResponse = { ...newUser.toJSON() };
    delete userResponse.password_hash;

    res.status(201).json(userResponse);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar o usuário.', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'E-mail e senha são obrigatórios.' });
  }

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const payload = {
      id: user.id,
      role: user.role
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '8h'
    });
    
    const userResponse = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      role: user.role,
      foto_url: user.foto_url
    };

    res.status(200).json({ user: userResponse, token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login.', error: error.message });
  }
};

module.exports = {
  register,
  login
};