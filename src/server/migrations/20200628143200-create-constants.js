
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Constants', {
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
    value: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    createdBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      onUpdate: 'CASCADE',
      references: {
        key: 'id',
        model: 'Users'
      }
    },
    lastUpdatedBy: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      onUpdate: 'CASCADE',
      references: {
        key: 'id',
        model: 'Users'
      }
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Constants')
};
