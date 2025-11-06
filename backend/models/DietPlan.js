const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DietPlan = sequelize.define('DietPlan', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Plano Alimentar'
  },
  observacoes: {
    type: DataTypes.TEXT,
    allowNull: true,
  }
}, {
  tableName: 'DietPlans',
  timestamps: true
});

module.exports = DietPlan;