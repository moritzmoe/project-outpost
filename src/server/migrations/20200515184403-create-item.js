
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
      foreignKey: true,
      onUpdate: 'CASCADE',
      references: {
        key: 'id',
        model: 'SubCategories'
      }
    },
    barcode: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    packaging: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      onUpdate: 'CASCADE',
      references: {
        key: 'id',
        model: 'Packagings'
      }
    },
    origin: {
      type: Sequelize.INTEGER,
      allowNull: false,
      foreignKey: true,
      onUpdate: 'CASCADE',
      references: {
        key: 'id',
        model: 'Origins'
      }
    },
    score: {
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Items')
};
