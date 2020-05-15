module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define('SubCategory', {
    parentCat: DataTypes.INTEGER,
    name: DataTypes.STRING,
    co2: DataTypes.INTEGER
  }, {});
  SubCategory.associate = function (models) {
    // associations can be defined here
  };
  return SubCategory;
};
