const models = require('../models');

exports.getConstants = (req, res) => {
  const id = parseInt(req.query.id, 10);
  if (!id) {
    res.status(400).json({ error: 'Please provide an id' });
  }
  models.Constant.findOne({
    where: {
      id
    },
    // attributes: ['id', 'name', 'barcode', 'origin', 'score'],
  }).then(item => res.send(item));
};

exports.updateConstant = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { content } = req.query;
  models.Constant.update({
    value: content
  }, {
    where: {
      id
    }
  }).then(res.sendStatus(200))
    .catch(err => res.send(err));
};
