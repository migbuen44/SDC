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

const getQuestions = (product_id, count, callback) => {
  let queryString = `SELECT * FROM questions WHERE product_id = ${product_id} limit ${count};`;//add index to product_id in postgres

  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    } else {
      const resultRows = result.rows;
      callback(null, resultRows);
    }
  });
};

const getAnswers = (question_id, count, callback) => {
  let queryString = `SELECT * FROM answers WHERE question_id = ${question_id} limit ${count};`;

  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    } else {
      const resultRows = result.rows;
      callback(null, resultRows);
    }
  });
};

const addQuestion = (product_id, body, name, email, callback) => {
  let queryString = `INSERT INTO questions(product_id, body,
    name, email, reported, helpfulness) VALUES (${product_id}, '${body}',
    '${name}', '${email}', 0, 0);`;

  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    } else {
      const resultRows = result.rows;
      callback(null, resultRows);
    }
  });
};

const addAnswer = (question_id, body, date_written, name, email, callback) => {
  let queryString = `INSERT INTO answers (question_id, body, date_written,
    name, email, reported, helpfulness) VALUES (${question_id}, '${body}',
    ${date_written}, '${name}', '${email}', 0, 0);`;

  pool.query(queryString, (err, result) => {
    if (err) {
      callback(err);
    } else {
      const resultRows = result.rows;
      callback(null, resultRows);
    }
  });
};

module.exports = {
  getQuestions,
  getAnswers,
  addQuestion,
  addAnswer
};
