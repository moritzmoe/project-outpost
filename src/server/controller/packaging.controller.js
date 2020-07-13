const models = require('../models');

exports.getPackaging = (req, res) => {
  models.Packaging.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'co2'] }
  }).then(packMats => res.send(packMats));
};
