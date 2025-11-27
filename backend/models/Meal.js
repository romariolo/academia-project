const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Meal = sequelize.define('Meal', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  horario: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'Meals',
  timestamps: false
});

module.exports = Meal;