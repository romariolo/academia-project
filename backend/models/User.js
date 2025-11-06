const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  // ... (id, nome, email, etc. continuam iguais)
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cep: {
    type: DataTypes.STRING,
  },
  rua: {
    type: DataTypes.STRING,
  },
  numero: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM('personal', 'aluno', 'nutricionista'),
    allowNull: false,
  },
  personal_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  // CAMPO NOVO ADICIONADO AQUI
  nutritionist_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  foto_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  certificado_url: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'Users',
  timestamps: true
});

module.exports = User;