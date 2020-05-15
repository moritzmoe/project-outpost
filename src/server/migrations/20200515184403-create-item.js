
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Items', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    weight: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    categoryId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    barcode: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    packaging: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    origin: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    score: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    lastUpdatedBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Items')
};
