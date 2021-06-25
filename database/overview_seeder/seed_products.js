const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const path = require('path');

function seedProducts(err, client, release) {
  return new Promise((resolve, reject) => {
    const productCsvPath = path.join(__dirname, '../../raw_files/product.csv');
    const readFileStream = fs.createReadStream(productCsvPath);
    const stream = client.query(copyFrom('COPY product FROM STDIN CSV HEADER;'));

    readFileStream.on('error', reject);

    readFileStream.on('open', () => {
      console.log('readfilestream-products open');
      console.time('seedTime-products');
      readFileStream.pipe(stream);
    });

    stream.on('finish', () => {
      console.timeEnd('seedTime-products');
      console.log('COMPLETE: product table seeded');
      // release(); // close after write process ends
      resolve();
      return client;
    });

    readFileStream.on('close', () => {
      console.log('readfilestream-products closed');
    });

    stream.on('error', reject);
  });
}

module.exports = seedProducts;

// module.exports = {
//   createProductTable: () => {
//     const productTable = 'product';

//     const createProductTableQuery = `
//       CREATE TABLE ${productTable} (
//       id SERIAL,
//       name VARCHAR,
//       slogan VARCHAR,
//       description VARCHAR,
//       category VARCHAR,
//       default_price INTEGER,
//       PRIMARY KEY(id)
//       );`;

//     db.query(createProductTableQuery)
//       .then(() => console.log('created product Table'))
//       .then(() => module.exports.createSeedTable())
//       .catch((err) => console.log(err));
//   },

//   createSeedTable: () => {
//     const styleTable = 'styles';
//     const createStyleTableQuery = `
//       CREATE TABLE ${styleTable} (
//       id SERIAL,
//       product_id INTEGER,
//       name VARCHAR,
//       sale_price VARCHAR,
//       original_price INTEGER,
//       default_style BOOLEAN,
//       PRIMARY KEY(id),
//       CONSTRAINT fk_product
//         FOREIGN KEY(product_id)
//           REFERENCES product(id)
//           ON UPDATE CASCADE
//       );`;
//     db.query(createStyleTableQuery)
//       .then(() => console.log('created styles Table'))
//       .then(() => module.exports.createSkuTable())
//       .catch((err) => console.log(err));
//   },

//   createSkuTable: () => {
//     const skuTable = 'sku';
//     const createSkuTableQuery = `
//       CREATE TABLE ${skuTable}  (
//       id SERIAL,
//       style_id INTEGER,
//       size VARCHAR(5),
//       quantity INTEGER,
//       PRIMARY KEY(id),
//       CONSTRAINT fk_style
//         FOREIGN KEY(style_id)
//           REFERENCES styles(id)
//           ON UPDATE CASCADE
//       );`;
//     db.query(createSkuTableQuery)
//       .then(() => console.log('created sku Table'))
//       .then(() => module.exports.createRelatedProductsTable())
//       .catch((err) => console.log(err));
//   },

//   createRelatedProductsTable: () => {
//     const relatedProductsTable = 'related_products';
//     const createRelatedProductsTableQuery = `
//       CREATE TABLE ${relatedProductsTable}(
//       id SERIAL,
//       current_product_id INT,
//       related_product_id INT,
//       PRIMARY KEY(id),
//       CONSTRAINT fk_product
//         FOREIGN KEY(current_product_id)
//           REFERENCES styles(id)
//           ON UPDATE CASCADE,
//       CONSTRAINT fk_relatedProduct
//         FOREIGN KEY(related_product_id)
//           REFERENCES styles(id)
//           ON UPDATE CASCADE
//       );`;
//     db.query(createRelatedProductsTableQuery)
//       .then(() => console.log('created related_products table'))
//       .then(() => module.exports.etlProducts())
//       .catch((err) => console.log(err));
//   },

//   etlProducts: () => {
//     const rawDataPathProducts = path.join(__dirname, '../raw_files/product.csv');
//     const rawDataPathStyles = path.join(__dirname, '../raw_files/styles.csv');
//     const rawDataPathSkus = path.join(__dirname, '../raw_files/skus.csv');
//     const rawDataPathRelated = path.join(__dirname, '../raw_files/related');
//     const productCopyQuery = `COPY product FROM '${rawDataPathProducts}' DELIMITER ',' CSV HEADER;`;
//     const stylesCopyQuery = `COPY styles FROM '${rawDataPathStyles}' DELIMITER ',' CSV HEADER;`;
//     const skuCopyQuery = `COPY product FROM '${rawDataPathSkus}' DELIMITER ',' CSV HEADER;`;
//     const relatedCopyQuery = `COPY styles FROM '${rawDataPathRelated}' DELIMITER ',' CSV HEADER;`;

//     db.query(productCopyQuery)
//       .then(() => {
//         console.log('products injected');
//         db.query(stylesCopyQuery);
//         db.query()
//       })
//       .then(() => {
//         console.log('styles injected');
//       })
//       .catch((err) => console.log(err));
//   },

//   dropAllTables: (seederFn) => {
//     db.query('DROP TABLE IF EXISTS product CASCADE')
//       .then(() => { db.query('DROP TABLE IF EXISTS styles CASCADE'); })
//       .then(() => { db.query('DROP TABLE IF EXISTS sku CASCADE'); })
//       .then(() => { db.query('DROP TABLE IF EXISTS related_products CASCADE'); })
//       .then(() => { seederFn(); })
//       .catch((err) => { console.log(err); });
//   },

//   initiateSeed: () => {
//     module.exports.createProductTable();
//   },
// };