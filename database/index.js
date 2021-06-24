const { Pool } = require('pg');
const config = require('../config/config.js');

const pool = new Pool(config);

pool.connect((err) => {
  err ? console.error(err) : console.log('Connected to database!');
});

module.exports = pool;
