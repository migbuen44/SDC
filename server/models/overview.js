const db = require('../../database/index'); // For database connection, if connection is created in other file, I think you could change this temporarily.

module.exports = {
  getProducts: (callback, query) => {
    db.query(`SELECT * FROM product LIMIT ${query.count || 5} OFFSET ${query.count * (query.page - 1) || 0}`, (err, response) => {
      if (err) { callback(err); }
      callback(null, response);
    });
  },
  getProductById: (callback, productId) => {
    const query = [
      `SELECT * FROM product WHERE id = ${productId}`,
      `SELECT feature, value FROM features WHERE product_id = ${productId}`,
    ];
    db.query(query.join(';'), (err, response) => {
      if (err) { callback(err); }
      callback(null, response);
    });
  },
  getStyles: (callback, productId) => {
    const query = `SELECT * FROM styles WHERE product_id = ${productId}`;
    db.query(query, (err, responseStyle) => {
      if (err) { callback(err); }
      callback(null, responseStyle.rows);
    });
  },
  getStyleData: (callback, style) => {
    const queries = [
      `SELECT thumbnail_url, url FROM photos WHERE style_id = ${style.id}`,
      `SELECT id, size, quantity FROM skus WHERE style_id = ${style.id}`,
    ];
    const testQuery = `SELECT * FROM skus WHERE style_id = ${style.id}`;
    db.query(testQuery, (err, response) => {
      console.log(style.id, ' <- style id - response -> ', response.rows)
    });
    db.query(queries.join(';'), (err, response) => {
      if (err) { callback(err); }
      // callback(null, response);
      // console.log(response[0]);
    });
  },
};
