
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('SubCategories', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    parentCat: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    co2: {
      type: Sequelize.INTEGER,
      allowNull: false
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('SubCategories')
};
