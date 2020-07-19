module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Origins', [
    { name: 'Deutschland', co2: 50, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Europa', co2: 150, createdAt: new Date(), updatedAt: new Date() },
    { name: 'Welt', co2: 250, createdAt: new Date(), updatedAt: new Date() }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Origins', null, {})
};
