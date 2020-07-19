/* eslint-disable object-curly-newline */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    { email: 'owner@test.com', firstname: 'Owner', lastname: 'Test', password: '$2b$10$iqML0rBPaMujInoWJVXtzOkBwTBcsgnn3tSZPLPHfwYZZFbSv5bhq', role: 3, createdAt: new Date(), updatedAt: new Date() },
    { email: 'admin@test.com', firstname: 'Admin', lastname: 'Test', password: '$2b$10$99cgwWVEHnGICgIa2ev3Xu869PY1vFGq2fkLQhyCYewKLPO7.K8iW', role: 2, createdAt: new Date(), updatedAt: new Date() },
    { email: 'user@test.com', firstname: 'User', lastname: 'Test', password: '$2b$10$fHx8mW9Bjy3tMdnF8XRO5.vru0OMS3T0fiGX03vcKgMwRpjzL7lSG', role: 1, createdAt: new Date(), updatedAt: new Date() }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
