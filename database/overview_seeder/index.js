const { Pool } = require('pg');
const config = require('../../config/config');
const seedProducts = require('./seed_products');
const seedFeatures = require('./seed_features');
const seedStyles = require('./seed_styles');
const seedPhotos = require('./seed_photos');
const seedSkus = require('./seed_skus');
const seedRelated = require('./seed_related');

const testphotos = require('../../ETL/load');
const test = require('../../ETL/testload');


const pool = new Pool(config);

pool.connect((err, client, release) => {
  seedProducts(err, client)
    .then(() => {
      seedFeatures(err, client)
        .then(() => {
          seedStyles(err, client)
            .then(() => {
              // testphotos(err, client);
              seedPhotos(err, client)
              // seedSkus(err, client)
                // .then(() => {
                //   seedRelated(err, client, release);
                // })
                // .catch((error) => {
                //   console.log(error);
                //   pool.end();
                // });
            });
        });
    });
});
