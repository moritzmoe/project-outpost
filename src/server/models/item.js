const Sequelize = require('sequelize');

const db = require('../config/database');

const Item = db.define('Item', {
  name: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  weight: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true
  },
  barcode: {
    type: Sequelize.STRING(16),
    allowNull: false,
    unique: true
  },
  packaging: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true
  },
  origin: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  createdBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true
  },
  lastUpdatedBy: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true
  }
});

db.sync()
  .then(() => console.log('item table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('This error occured', error));


module.exports = Item;
