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
      // @TODO YES
      const { url } = instances[0].redirect.get({ plain: true });
      const hits = instances.map((instance) => {
        const { createdAt } = instance.get({ plain: true });
        return { createdAt };
      });
      res.json({ hash: redirectHash, hits, url });
    } catch (error) {
      res.json({ error });
    }
  }
}
module.exports = Hit;
