// this is important!
module.exports = {
  development: {
    username: 'postgres',
    password: 'my_pass',
    database: 'postgres',
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:'
  },
  production: {
    username: 'postgres',
    password: process.env.DB_PASSWORD,
    database: 'postgresdb',
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: '5432',
    ssl: true,
    dialectOptions: {
      ssl: 'Amazon RDS'
    }
  }
};
