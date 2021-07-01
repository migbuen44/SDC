<<<<<<< HEAD
// const { Pool } = require('pg');
// const config = require('../config/config.js');
=======
const { Pool } = require('pg');
const config = require('../config/config');
>>>>>>> 096ce07f431b4f4f0a329c55fed39141158d8eb0

<<<<<<< HEAD
// const pool = new Pool({ config });
=======
const pool = new Pool(config);
>>>>>>> b4e4c26c5f3e64dc1fe1492429c2be001188e87b

<<<<<<< HEAD
// pool.connect((err) => {
//   err ? console.error(err) : console.log('Connected to database!');
// });

// module.exports = pool;
=======
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
>>>>>>> 096ce07f431b4f4f0a329c55fed39141158d8eb0
