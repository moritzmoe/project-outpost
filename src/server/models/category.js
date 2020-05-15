module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING
  }, {});
  Category.associate = function (models) {
    models.Category.hasMany(models.SubCategory, {
      foreignKey: 'parentCat',
      onDelete: 'CASCADE'
    });
  };
  return Category;
};
