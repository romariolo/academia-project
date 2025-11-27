const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password_hash'] }
      });

      if (!req.user) {
        return res.status(401).json({ message: 'Não autorizado, usuário não encontrado.' });
      }
      next();
    } catch (error) {
      res.status(401).json({ message: 'Não autorizado, token inválido.' });
    }
  } else {
    res.status(401).json({ message: 'Não autorizado, nenhum token fornecido.' });
  }
};

const isPersonal = (req, res, next) => {
  if (req.user && req.user.role === 'personal') {
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado. Rota exclusiva para Personal Trainers.' });
  }
};

const isStudent = (req, res, next) => {
  if (req.user && req.user.role === 'aluno') {
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado. Rota exclusiva para alunos.' });
  }
};

// NOVA FUNÇÃO
const isNutritionist = (req, res, next) => {
  if (req.user && req.user.role === 'nutricionista') {
    next();
  } else {
    res.status(403).json({ message: 'Acesso negado. Rota exclusiva para Nutricionistas.' });
  }
};

module.exports = { 
  protect, 
  isPersonal, 
  isStudent,
  isNutritionist // Não esqueça de exportar
};