const db = require('../../database/index'); // For database connection, if connection is created in other file, I think you could change this temporarily.

module.exports = {
  getProducts: (callback, query) => {
    db.query(`SELECT * FROM product LIMIT ${query.count || 5} OFFSET ${query.count * (query.page - 1) || 0}`, (err, response) => {
      if (err) { callback(err); }
      callback(null, response);
    });
  },
};