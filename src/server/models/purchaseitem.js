module.exports = (sequelize, DataTypes) => {
  const PurchaseItem = sequelize.define('PurchaseItem', {
    PurchaseId: DataTypes.INTEGER,
    ItemId: DataTypes.INTEGER
  }, {});
  PurchaseItem.associate = function (models) {
    // associations can be defined here
  };
  return PurchaseItem;
};
