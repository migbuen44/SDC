const { Pool } = require('pg');
const config = require('../../config/config.js');
const seedProducts = require('./seed_products.js');
const seedStyles = require('./seed_styles.js');

const pool = new Pool(config);

// pool.connect(seedProducts);
pool.connect(seedStyles);
