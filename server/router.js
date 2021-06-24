const router = require('express').Router();
const cors = require('cors');
const controllers = require('./constrollers');

router.get('/o', controllers.overview.get)
  .get('/q', controllers.qAnda.get)
  .get('/r', controllers.reviews.get);

module.exports = router;
