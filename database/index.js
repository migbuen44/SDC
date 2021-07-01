const { Pool } = require('pg');
const config = require('../config/config');

const pool = new Pool(config);

pool.connect((err) => {
  if (err) { console.error(err); }
  // err ? console.error(err) : console.log('Connected to database!');
});

// pool.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message);
//   pool.end();
// //   err ? console.error(err) : console.log('Connected to database!');
// });

module.exports = pool;
