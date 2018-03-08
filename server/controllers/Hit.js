const { Op } = require('sequelize');

class Hit {
  async read (req, res) {
    const { h: redirectHash, days } = req.query;
    const now = new Date().getTime();
    const diff = now - (days * 24 * 60 * 60 * 1000);
    const H = req.app.locals.connection.model('hit');
    const R = req.app.locals.connection.model('redirect');
    const query = {
      where: {
        redirectHash,
        createdAt: {
          [Op.gt]: diff,
        },
      },
      // Left join on those haters
      include: [{ model: R }],
    };
    try {
      const instances = await H.findAll(query);
      // There are hits!
      if (instances.length) {
        const { url } = instances[0].redirect.get({ plain: true });
        const hits = instances.map((instance) => {
          const { createdAt } = instance.get({ plain: true });
          return { createdAt };
        });
        res.json({ hash: redirectHash, hits, url });
      // No hits, which means we have to pick up the url from the redirects table
      } else {
        const q = { where: { hash: redirectHash } };
        const instance = await R.findOne(q);
        const { url } = instance.get({ plain: true });
        res.json({ hash: redirectHash, hits: [], url });
      }
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
}
module.exports = Hit;
