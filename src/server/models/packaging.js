module.exports = (sequelize, DataTypes) => {
  const Packaging = sequelize.define('Packaging', {
    name: DataTypes.STRING,
    co2: DataTypes.INTEGER
  }, {});
  Packaging.associate = function (models) {
    // associations can be defined here
  };
  return Packaging;
};
