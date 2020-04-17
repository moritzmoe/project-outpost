/* eslint-disable func-names */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

const db = require('../config/database');

const User = db.define('User', {
  email: {
    type: Sequelize.STRING(50),
    unique: true,
    allowNull: false
  },
  firstname: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  lastname: {
    type: Sequelize.STRING(30),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);
    }
  }
});

// instance level method
User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

// create all the defined tables in the specified database.
db.sync()
  .then(() => console.log('Users table has been successfully created, if one doesn\'t exist'))
  .catch(error => console.log('While syncing the user table this error occurred:', error));

// export User model for use in other files.
module.exports = User;
