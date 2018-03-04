const { randomBytes } = require('crypto');
const {
  HASH_SIZE,
  HOST,
  FOUR_OH_FOUR
} = require('../../config');
const { name: modelName } = require('../models/Redirect');
const { name: hitModelName } = require('../models/Hit');

class Redirect {

  /**
   * Creates a new redirect or updates and existing one
   * @param {Object<Request>} req - the request 
   * @param {Object<Response>} res - the response 
   */
  async create (req, res) {
    const { url } = req.body;
    const R = req.app.locals.connection.model('redirect');
    const { exists, instance } = await this.checkIfUrlExists(url, R);
    try {
      // If the instance already exists, increase the timesGenerated
      if (exists) {
        const { hash, timesGenerated } = instance.get({ plain: true });
        instance.set('timesGenerated', timesGenerated + 1);
        await instance.save();
        res.json({ hash });
      // Otherwise, generate a new hash
      } else {
        const hash = this.generateHash();
        const values = { url, hash };
        // @TODO account for the very slim collision chance
        await R.create(values);
        res.json({ hash });
      }
    } catch (error) {
      res.json({ error });
    }
  }

  /**
   * Reads a redirect and creates a Hit
   * @param {Object<Request>} req - the request 
   * @param {Object<Response>} res - the response 
   */
  async read (req, res) {
    const { h: hash } = req.query;
    const query = { where: { hash } };
    const R = req.app.locals.connection.model(modelName);
    const H = req.app.locals.connection.model(hitModelName);
    try {
      const instance = await R.findOne(query);
      const { url } = instance.get({ plain: true });
      const createdAt = new Date();
      const values = { redirectHash: hash, createdAt };
      // Create a hit for the url
      try {
        await H.create(values);
      } catch (error) {
        // @TODO log
        console.error(error.message);
      }
      res.redirect(url);
    } catch (error) {
      res.redirect(FOUR_OH_FOUR);
    }
  }

  /**
   * Checks if the url already exists in the DB
   * @param {String} url - the url to check
   * @param {Object<SequelizeModel>} R - the Redirect model
   * @return {Object} - url existance and the instance, if applicable
   */
  checkIfUrlExists (url, R) {
    let exists = false;
    return new Promise(async (resolve) => {
      const query = { where: { url } };
      try {
        const instance = await R.findOne(query);
        if (instance) {
          exists = true;
          resolve({ exists, instance });
        } else {
          resolve({ exists, instance: null });
        }
      } catch (error) {
        resolve({ exists, instance: null });
      }
    });
  }

  /**
   * Generates a base36 hash
   * This can collide 1 / 2,821,109,907,456 so . . . @TODO
   * @return {String} - hash
   */
  generateHash () {
    const base36 = Math.random().toString(36);
    const tail = base36.split('.')[1];
    return tail.slice(0, 8);
  }

}
module.exports = Redirect;
