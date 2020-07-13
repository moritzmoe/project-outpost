const models = require('../models');

exports.getOrigins = (req, res) => {
  models.Origin.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt', 'co2'] }
  }).then(origins => res.send(origins));
};
