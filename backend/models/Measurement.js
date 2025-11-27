const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Measurement = sequelize.define('Measurement', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  is_initial: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  braco_cm: { type: DataTypes.FLOAT },
  peito_cm: { type: DataTypes.FLOAT },
  cintura_cm: { type: DataTypes.FLOAT },
  quadril_cm: { type: DataTypes.FLOAT },
  gluteos_cm: { type: DataTypes.FLOAT },
  coxa_cm: { type: DataTypes.FLOAT },
  panturrilha_cm: { type: DataTypes.FLOAT },
  peso_kg: { type: DataTypes.FLOAT },
}, {
  tableName: 'Measurements',
  timestamps: true // Salva a data de criação (createdAt) automaticamente
});

module.exports = Measurement;