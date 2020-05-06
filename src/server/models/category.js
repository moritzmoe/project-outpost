const Sequelize = require('sequelize');

const db = require('../config/database');

const Category = db.define('Category', {
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
});

// create all the defined tables in the specified database.
db.sync()
  .then(() => console.log('Category table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('While syncing the category table this error occurred:', error));

// export Category model for use in other files.
module.exports = Category;
