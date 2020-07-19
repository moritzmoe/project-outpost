module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Roles', [
    { id: 1, name: 'User', createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: 'Admin', createdAt: new Date(), updatedAt: new Date() },
    { id: 3, name: 'Owner', createdAt: new Date(), updatedAt: new Date() }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Roles', null, {})
};
