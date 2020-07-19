module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('PurchaseItems', [

    { PurchaseId: 1, ItemId: 1, quantity: 1, createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 2, ItemId: 2, quantity: 2, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 3, ItemId: 3, quantity: 3, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 4, ItemId: 4, quantity: 1, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 5, ItemId: 5, quantity: 2, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 6, ItemId: 6, quantity: 2, createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 7, ItemId: 7, quantity: 4, createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 8, ItemId: 8, quantity: 1, createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 9, ItemId: 9, quantity: 2, createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 10, ItemId: 10, quantity: 1, createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 11, ItemId: 11, quantity: 2, createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 12, ItemId: 12, quantity: 1, createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 13, ItemId: 13, quantity: 2, createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 14, ItemId: 14, quantity: 2, createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 15, ItemId: 15, quantity: 2, createdAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000) },


    { PurchaseId: 2, ItemId: 3, quantity: 4, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 3, ItemId: 4, quantity: 3, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 4, ItemId: 5, quantity: 1, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 5, ItemId: 6, quantity: 3, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 6, ItemId: 7, quantity: 1, createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 7, ItemId: 8, quantity: 2, createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 8, ItemId: 9, quantity: 1, createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 9, ItemId: 10, quantity: 3, createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 10, ItemId: 11, quantity: 1, createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 11, ItemId: 12, quantity: 1, createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 12, ItemId: 13, quantity: 1, createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 13, ItemId: 14, quantity: 1, createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 14, ItemId: 15, quantity: 1, createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 15, ItemId: 1, quantity: 1, createdAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000) },


    { PurchaseId: 2, ItemId: 4, quantity: 2, createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 3, ItemId: 5, quantity: 2, createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 4, ItemId: 6, quantity: 1, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 5, ItemId: 7, quantity: 1, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 6, ItemId: 8, quantity: 1, createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 7, ItemId: 9, quantity: 1, createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 8, ItemId: 10, quantity: 1, createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 9, ItemId: 11, quantity: 1, createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 10, ItemId: 12, quantity: 1, createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 11, ItemId: 13, quantity: 1, createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 12, ItemId: 14, quantity: 1, createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 13, ItemId: 15, quantity: 1, createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 14, ItemId: 1, quantity: 1, createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 15, ItemId: 2, quantity: 1, createdAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000) },


    { PurchaseId: 3, ItemId: 6, quantity: 2, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 3, ItemId: 7, quantity: 1, createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 3, ItemId: 8, quantity: 1, createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 5, ItemId: 9, quantity: 1, createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 5, ItemId: 10, quantity: 2, createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 5, ItemId: 11, quantity: 1, createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 7, ItemId: 12, quantity: 1, createdAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 19 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 7, ItemId: 13, quantity: 1, createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 7, ItemId: 14, quantity: 1, createdAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 22 * 24 * 60 * 60 * 1000) },

    { PurchaseId: 9, ItemId: 15, quantity: 1, createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 9, ItemId: 1, quantity: 1, createdAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000) },
    { PurchaseId: 9, ItemId: 2, quantity: 1, createdAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000), updatedAt: new Date(Date.now() - 33 * 24 * 60 * 60 * 1000) },

  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('value', null, {})
};
