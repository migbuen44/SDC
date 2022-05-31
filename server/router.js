const router = require('express').Router();
const cors = require('cors');
const controllers = require('./controllers');
const db = require('../q_and_a_database/index.js');

router
  .route('/qa/questions')
  .get(controllers.q_and_a.getQuestions)
  .post(controllers.q_and_a.addQuestion);

router
  .route('/qa/questions/:question_id/answers')
  .get(controllers.q_and_a.getAnswers)
  .post(controllers.q_and_a.addAnswer);

router.put('/qa/questions/:question_id/helpful', controllers.q_and_a.updateQuestionHelpful);
router.put('/qa/answers/:answer_id/helpful', controllers.q_and_a.updateAnswerHelpful);
router.put('/qa/questions/:question_id/report', controllers.q_and_a.reportQuestion);
router.put('/qa/answers/:answer_id/report', controllers.q_and_a.reportAnswer);
const controller = require('./controllers/reviewsJG');
const overview = require('./controllers/overview');

// const controller = require('./controllers/reviewsJG');


router.get('/products', overview.getProducts);
router.get('/related/products/:productId', overview.getProductByIdRelated),
router.get('/products/:productId', overview.getProductById);
router.get('/products/:productId/styles', overview.getStyles);
router.get('/products/:productId/related', overview.getRelated);

router
.route('/reviews/meta')
.get(controller.getMeta);


router
.route('/reviews/:product_id')
.get(controller.get)
.post(controller.addReview);

router
  .route('/reviews/:id/helpful')
  .put(controller.updateHelpful);

router
  .route('/reviews/:id/report')
  .put(controller.updateReport);

module.exports = router;
