/* eslint-disable object-curly-newline */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [
    { email: 'owner@test.com', firstname: 'Owner', lastname: 'Test', password: '$2b$10$iqML0rBPaMujInoWJVXtzOkBwTBcsgnn3tSZPLPHfwYZZFbSv5bhq', role: 3, createdAt: new Date(), updatedAt: new Date() },
    { email: 'admin@test.com', firstname: 'Admin', lastname: 'Test', password: '$2b$10$99cgwWVEHnGICgIa2ev3Xu869PY1vFGq2fkLQhyCYewKLPO7.K8iW', role: 2, createdAt: new Date(), updatedAt: new Date() },
    { email: 'jan@baummann.com', firstname: 'Jan', lastname: 'Baummann', password: '$2b$10$GeIsqHnWqFKFH8CiHlce.eT5bjEvbH5LYZJLZHtBuWdnqi1l89pJK', role: 1, createdAt: new Date(), updatedAt: new Date() }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {})
};
