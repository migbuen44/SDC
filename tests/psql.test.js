const db = require('../database/index.js');

describe('PostgreSQL up and running', () => {
  test('database is connected', () => {
    db.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
      expect(res.rows[0].message).toBe('Hello world!');
      db.end();
    });
  });
});



