/* eslint-disable object-curly-newline */

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('PurchaseItems', [

    { PurchaseId: 1, ItemId: 1, createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 1, ItemId: 3, createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 1, ItemId: 6, createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 1, ItemId: 11, createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 1, ItemId: 16, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 2, ItemId: 2, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 3, ItemId: 3, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 4, ItemId: 4, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 5, ItemId: 5, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 6, ItemId: 6, createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 7, ItemId: 7, createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 8, ItemId: 8, createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 9, ItemId: 9, createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 10, ItemId: 10, createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 11, ItemId: 11, createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 12, ItemId: 12, createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 13, ItemId: 13, createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 14, ItemId: 14, createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 15, ItemId: 15, createdAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000) },


    { PurchaseId: 2, ItemId: 3, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 3, ItemId: 4, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 4, ItemId: 5, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 5, ItemId: 6, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 6, ItemId: 7, createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 7, ItemId: 8, createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 8, ItemId: 9, createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 9, ItemId: 10, createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 10, ItemId: 11, createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 11, ItemId: 12, createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 12, ItemId: 13, createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 13, ItemId: 14, createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 14, ItemId: 15, createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 15, ItemId: 1, createdAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000) },


    { PurchaseId: 2, ItemId: 4, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 3, ItemId: 5, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 4, ItemId: 6, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 5, ItemId: 7, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 6, ItemId: 8, createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 7, ItemId: 9, createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 8, ItemId: 10, createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 9, ItemId: 11, createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 10, ItemId: 12, createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 11, ItemId: 13, createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 12, ItemId: 14, createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 13, ItemId: 15, createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 14, ItemId: 1, createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 15, ItemId: 2, createdAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000) },


    { PurchaseId: 3, ItemId: 6, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 3, ItemId: 7, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 3, ItemId: 8, createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 5, ItemId: 9, createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 5, ItemId: 10, createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 5, ItemId: 11, createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 7, ItemId: 12, createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 7, ItemId: 13, createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 7, ItemId: 14, createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 9, ItemId: 15, createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 9, ItemId: 1, createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 9, ItemId: 2, createdAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000) },

  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('value', null, {})
};
