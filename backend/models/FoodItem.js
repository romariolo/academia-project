const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const FoodItem = sequelize.define('FoodItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descricao: { // Ex: "Ovo cozido"
    type: DataTypes.STRING,
    allowNull: false
  },
  quantidade: { // Ex: "2 unidades" ou "100g"
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'FoodItems',
  timestamps: false
});

module.exports = FoodItem;