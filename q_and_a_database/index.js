const { Pool } = require('pg');
const config = require('./config.js');

const pool = new Pool(config);

// console.log('database connected!');
pool.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('database connected');
  }
})