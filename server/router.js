const router = require('express').Router();
const cors = require('cors');
const controllers = require('./controllers');
<<<<<<< HEAD
const overview = require('./controllers/overview');

=======
const controller = require('./controllers/reviewsJG');


>>>>>>> b4e4c26c5f3e64dc1fe1492429c2be001188e87b
// router.get('/o', controllers.overview.get)
//   .get('/q', controllers.qAnda.get)
//   .get('/r', controllers.reviews.get);

<<<<<<< HEAD
router.get('/products', overview.getProducts);
router.get('/products/:productId', overview.getProductById);
router.get('/products/:productId/styles', overview.getStyles);
router.get('/products/:productId/related', overview.getRelated);
=======

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
>>>>>>> b4e4c26c5f3e64dc1fe1492429c2be001188e87b

module.exports = router;
