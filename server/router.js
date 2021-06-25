const router = require('express').Router();
const cors = require('cors');
const controllers = require('./controllers');
const db = require('../q_and_a_database/index.js');

router
  .route('/qa/questions')
  .get((req, res) => {
    let { product_id, count } = req.query;

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

router
  .route('/qa/questions/:question_id/answers')
  .get((req, res) => {
    let { question_id } = req.params;
    let { count } = req.query;

    db.getAnswers(question_id, count, (err, results) => {
      if (err) {
        res.send('error');
      } else {
        res.send(results);
      }
    });
  });


  // .get('/o', controllers.overview.get)
  // .get('/q', controllers.qAnda.get)
  // .get('/r', controllers.reviews.get);

module.exports = router;
