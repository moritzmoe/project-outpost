/* eslint-disable object-curly-newline */
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [
    { name: 'User', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Admin', createdAt: new Date(), updatedAt: new Date() },
    { name: 'Owner', createdAt: new Date(), updatedAt: new Date() }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
