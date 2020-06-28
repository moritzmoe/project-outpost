module.exports = (sequelize, DataTypes) => {
  const Origin = sequelize.define('Constant', {
    name: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {});
  Origin.associate = function (models) {
    // associations can be defined here
  };
  return Origin;
};
