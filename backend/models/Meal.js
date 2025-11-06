const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Meal = sequelize.define('Meal', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: { // Ex: "Café da Manhã", "Almoço", "Ceia"
    type: DataTypes.STRING,
    allowNull: false
  },
  horario: { // Ex: "08:00"
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Meals',
  timestamps: false
});

module.exports = Meal;