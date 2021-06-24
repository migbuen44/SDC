const db = require('../database/index.js');
const createProductTableQuery = require('../database/ETL_Products');

describe('PostgreSQL up and running', () => {
  test('database is connected', () => {
    db.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
      if (err) { console.log('failed') }
      expect(res.rows[0].message).toBe('Hello world!')
      db.end();
    });
  });
});

describe('ETL function transforms products properly', () => {
  db.query()


})




