const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Pega o token do header (ex: "Bearer eyJhbGci...")
      token = req.headers.authorization.split(' ')[1];

      // Verifica se o token é válido
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Busca o usuário pelo ID contido no token e o anexa ao objeto 'req'
      req.user = await User.findByPk(decoded.id, {
        attributes: { exclude: ['password_hash'] }
      });

      if (!req.user) {
        return res.status(401).json({ message: 'Não autorizado, usuário não encontrado.' });
      }

      next(); // Passa para a próxima função (o controller)
    } catch (error) {
      res.status(401).json({ message: 'Não autorizado, token inválido.' });
    }
  }

  if (!token) {
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

module.exports = { 
  protect, 
  isPersonal, 
  isStudent 
};