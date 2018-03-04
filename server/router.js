const { Router } = require('express');
const { join } = require('path');
const Redirect = require('./controllers/Redirect');
const { ROOT, FOUR_OH_FOUR } = require('../config');

const router = new Router();
const redirect = new Redirect();

router.get('/', (req, res) => {
  res.sendFile(join(ROOT, 'public', 'index.html'));
});
console.log(FOUR_OH_FOUR)
router.get(FOUR_OH_FOUR, (req, res) => {
  res.sendFile(join(ROOT, 'public', `${FOUR_OH_FOUR}.html`));
});
router.get('/r/', redirect.read.bind(redirect));
router.post('/r/', redirect.create.bind(redirect));

module.exports = router;
