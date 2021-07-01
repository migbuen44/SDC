const router = require('express').Router();
const cors = require('cors');
const controllers = require('./controllers');
const controller = require('./controllers/reviewsJG');


// router.get('/o', controllers.overview.get)
//   .get('/q', controllers.qAnda.get)
//   .get('/r', controllers.reviews.get);


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
