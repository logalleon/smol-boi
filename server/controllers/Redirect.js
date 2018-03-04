const { randomBytes } = require('crypto');
const {
  HASH_SIZE,
  HOST,
  FOUR_OH_FOUR
} = require('../../config');
const { name: modelName } = require('../models/Redirect');

class Redirect {

  create (req, res) {
    const { url } = req.body;
    const hash = this.generateHash();
    const values = { url, hash };
    const R = req.app.locals.connection.model('redirect');
    R.create(values)
      .then(() => {
        res.json({hash});
      })
      .catch((error) => {
        res.json({error});
      });
  }

  read (req, res) {
    const { h: hash } = req.query;
    const query = { where: { hash } };
    const R = req.app.locals.connection.model(modelName);
    R.findOne(query)
      .then((instance) => {
        const { url } = instance.get({ plain: true });
        res.redirect(url);
      })
      .catch((error) => {
        res.redirect(FOUR_OH_FOUR);
      });
  }

  generateHash () {
    const base36 = Math.random().toString(36);
    const tail = base36.split('.')[1];
    return tail.slice(0, 8);
  }

}
module.exports = Redirect;
