const { Pool } = require('pg');
const config = require('../../config/config.js');
const seedProducts = require('./seed_products.js');
const seedStyles = require('./seed_styles.js');

const pool = new Pool(config);

pool.connect((err, client, release) => {
  seedProducts(err, client, release)
    .then(() => {
      seedStyles(err, client, release);
    })
    .catch((error) => console.log(error));
})



  // pool.connect()
  // .then((client) => {
  //   seedProducts(client)
  //     .then((client2) => {
  //       seedStyles(client2);
  //     })
  //     .catch((err) => console.log(err));
  // })
  // .catch((err) => console.log(err));
