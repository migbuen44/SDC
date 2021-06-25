const router = require('express').Router();
const cors = require('cors');
const controllers = require('./controllers');
const db = require('../q_and_a_database/index.js');

router
  .route('/qa/questions')
  .get((req, res) => {
    let { product_id, page, count } = req.query;

    if (!count) {
      count = 4;
    }
    db.getQuestions(product_id, count, (err, result) => {
      if (err) {
        res.send('error');
      } else {
        res.send(result);
      }
    });
  });


  // .get('/o', controllers.overview.get)
  // .get('/q', controllers.qAnda.get)
  // .get('/r', controllers.reviews.get);

module.exports = router;
