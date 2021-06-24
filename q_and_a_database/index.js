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
});

const getQuestions = (product_id, page, count, callback) => {
  let queryString =  `SELECT * FROM questions WHERE product_id = ${product_id} limit ${count}`;//add index to product_id in postgres

  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};
