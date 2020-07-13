
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('PurchaseItems', {
    PurchaseId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        key: 'id',
        model: 'Purchases'
      }
    },
    ItemId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
      references: {
        key: 'id',
        model: 'Items'
      }
    },
    quantity: {
      allowNull: false,
      type: Sequelize.INTEGER,
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
