module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define('Item', {
    name: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    barcode: DataTypes.STRING,
    packaging: DataTypes.INTEGER,
    origin: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    approved: DataTypes.INTEGER,
  }, {});
  Item.associate = function (models) {
    models.Item.belongsToMany(models.Purchase, {
      through: 'PurchaseItem'
    });
    models.Item.belongsTo(models.User, {
      as: 'created',
      foreignKey: 'createdBy'
    });
    models.Item.belongsTo(models.User, {
      as: 'lastUpdated',
      foreignKey: 'lastUpdatedBy'
    });
    models.Item.belongsTo(models.SubCategory, {
      foreignKey: 'categoryId'
    });
    models.Item.belongsTo(models.Packaging, {
      foreignKey: 'packaging'
    });
    models.Item.belongsTo(models.Origin, {
      foreignKey: 'origin'
    });
  };
  return Item;
};
