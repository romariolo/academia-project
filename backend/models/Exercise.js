const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Exercise = sequelize.define('Exercise', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dia_semana: {
    type: DataTypes.STRING,
    allowNull: false
  },
  series: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  repeticoes: {
    type: DataTypes.STRING,
    allowNull: false
  },
  carga: {
    type: DataTypes.STRING,
    allowNull: false
  },
  video_url: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Exercises',
  timestamps: false
});

module.exports = Exercise;