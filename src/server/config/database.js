const Sequelize = require('sequelize');

let db;
if (process.env.NODE_ENV === 'production') {
  db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true
    }
  });
} else {
  db = new Sequelize('postgres', 'postgres', 'my_pass', {
    host: 'localhost',
    dialect: 'postgres'
  });
}

module.exports = db;
