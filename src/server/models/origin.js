module.exports = (sequelize, DataTypes) => {
  const Origin = sequelize.define('Origin', {
    name: DataTypes.STRING,
    co2: DataTypes.INTEGER
  }, {});
  Origin.associate = function (models) {
    // associations can be defined here
  };
  return Origin;
};
