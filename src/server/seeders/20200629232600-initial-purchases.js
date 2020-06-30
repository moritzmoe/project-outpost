/* eslint-disable object-curly-newline */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Purchases', [
    { userId: 3, createdAt: new Date(), updatedAt: new Date() },
    { userId: 3, createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    { userId: 3, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { userId: 3, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },

    { userId: 3, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { userId: 3, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { userId: 3, createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000) },

    { userId: 3, createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) },
    { userId: 3, createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
    { userId: 3, createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000) },

    { userId: 3, createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000) },
    { userId: 3, createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) },
    { userId: 3, createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000) },

    { userId: 3, createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) },
    { userId: 3, createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000) },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('value', null, {})
};
