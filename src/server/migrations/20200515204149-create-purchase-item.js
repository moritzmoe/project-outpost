
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('PurchaseItems', {
    PurchaseId: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    ItemId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('PurchaseItems')
};
