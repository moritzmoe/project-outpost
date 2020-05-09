const Sequelize = require('sequelize');

const db = require('../config/database');

const Packaging = db.define('Packaging', {
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  co2: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

// create all the defined tables in the specified database.
db.sync()
  .then(() => console.log('Packaging table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('While syncing the Packaging table this error occurred:', error));

// export PackType model for use in other files.
module.exports = Packaging;
