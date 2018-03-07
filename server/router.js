const { Router } = require('express');
const { join } = require('path');
const Redirect = require('./controllers/Redirect');
const Hit = require('./controllers/Hit');
const { ROOT, FOUR_OH_FOUR } = require('../config');

const router = new Router();
const redirect = new Redirect();
const hit = new Hit();

// index
router.get('/', (req, res) => {
  res.sendFile(join(ROOT, 'public', 'index.html'));
});

// Read (redirect)
router.get('/r/', redirect.read.bind(redirect));

// Create
router.post('/r/', redirect.create.bind(redirect));

// Metrics
router.get('/stats', (req, res) => {
  res.sendFile(join(ROOT, 'public', 'index.html'));
});
router.get('/hit', hit.read.bind(hit));

// 404 for all else
router.get(FOUR_OH_FOUR, (req, res) => {
  res.sendFile(join(ROOT, 'public', `${FOUR_OH_FOUR}.html`));
});
router.all('*', (req, res) => {
  res.redirect(FOUR_OH_FOUR);
});

module.exports = router;
