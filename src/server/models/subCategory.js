const Sequelize = require('sequelize');

const db = require('../config/database');

const SubCategory = db.define('SubCategory', {
  parentCat: {
    type: Sequelize.INTEGER,
    allowNull: false,
    foreignKey: true
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
});

// create all the defined tables in the specified database.
db.sync()
  .then(() => console.log('SubCategory table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('While syncing the subCategory table this error occurred:', error));

// export User model for use in other files.
module.exports = SubCategory;
