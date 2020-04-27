const Sequelize = require('sequelize');

const db = require('../config/database');

const PackType = db.define('PackType', {
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
});

// create all the defined tables in the specified database.
db.sync()
  .then(() => console.log('PackType table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('While syncing the packType table this error occurred:', error));

// export PackType model for use in other files.
module.exports = PackType;
