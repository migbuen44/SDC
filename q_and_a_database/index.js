const { Pool } = require('pg');
const config = require('./config.js')

const pool = new Pool(config);

pool.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log('database connected!');
  }
})