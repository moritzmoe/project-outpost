const Sequelize = require('sequelize');

const db = require('../config/database');

const Origin = db.define('Origin', {
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
  .then(() => console.log('Origin table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('While syncing the Origin table this error occurred:', error));

// export PackType model for use in other files.
module.exports = Origin;
