const Sequelize = require('sequelize');

const db = require('../config/database');

const PackMat = db.define('PackMat', {
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
});

// create all the defined tables in the specified database.
db.sync()
  .then(() => console.log('PackMat table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('While syncing the packMat table this error occurred:', error));

// export PackMat model for use in other files.
module.exports = PackMat;
