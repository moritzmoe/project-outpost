/* eslint-disable object-curly-newline */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Constants', [
    { name: 'co2Convert', value: 67, createdBy: 1, lastUpdatedBy: 1, createdAt: new Date(), updatedAt: new Date() },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('value', null, {})
};
