module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define('Purchase', {
    userId: DataTypes.INTEGER
  }, {});
  Purchase.associate = function (models) {
    models.Purchase.belongsTo(models.User, {
      foreignKey: 'userId'
    });
    models.Purchase.belongsToMany(models.Item, {
      through: 'PurchaseItem'
    });
  };
  return Purchase;
};
