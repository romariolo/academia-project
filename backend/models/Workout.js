const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Workout = sequelize.define('Workout', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Meu Treino'
  }
}, {
  tableName: 'Workouts',
  timestamps: true
});

module.exports = Workout;