const Sequelize = require('sequelize');

const db = require('../config/database');

const Item = db.define('item', {
  name: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  barcode: {
    type: Sequelize.STRING
  },
  packtype: {
    type: Sequelize.STRING
  },
  packmat: {
    type: Sequelize.STRING
  },
  origin: {
    type: Sequelize.STRING
  },
  score: {
    type: Sequelize.STRING
  },
});

db.sync()
  .then(() => console.log('item table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('This error occured', error));


module.exports = Item;
