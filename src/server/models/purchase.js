const Sequelize = require('sequelize');

const db = require('../config/database');

const Purchase = db.define('Purchase', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true
  }
});

// create all the defined tables in the specified database.
db.sync()
  .then(() => console.log('Purchase table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('While syncing the purchase table this error occurred:', error));

// export User model for use in other files.
module.exports = Purchase;
