const csv = require('csv');
const fs = require('fs');
const path = require('path');
const db = require('./index.js');

module.exports = {
  createProductTable: () => {
    const productTable = 'product';

    const createProductTableQuery = `
      CREATE TABLE ${productTable} (
      id SERIAL,
      name VARCHAR,
      slogan VARCHAR,
      description VARCHAR,
      category VARCHAR,
      default_price INTEGER,
      PRIMARY KEY(id)
      );`;

    db.query(createProductTableQuery)
      .then(() => console.log('created product Table'))
      .then(() => module.exports.createSeedTable())
      .catch((err) => console.log(err));
  },

  createSeedTable: () => {
    const styleTable = 'styles';
    const createStyleTableQuery = `
      CREATE TABLE ${styleTable} (
      id SERIAL,
      product_id INTEGER,
      name VARCHAR,
      sale_price VARCHAR,
      original_price INTEGER,
      default_style BOOLEAN,
      PRIMARY KEY(id),
      CONSTRAINT fk_product
        FOREIGN KEY(product_id)
          REFERENCES product(id)
          ON UPDATE CASCADE
      );`;
    db.query(createStyleTableQuery)
      .then(() => console.log('created styles Table'))
      .then(() => module.exports.createSkuTable())
      .catch((err) => console.log(err));
  },

  createSkuTable: () => {
    const skuTable = 'sku';
    const createSkuTableQuery = `
      CREATE TABLE ${skuTable}  (
      id SERIAL,
      style_id INTEGER,
      size VARCHAR(5),
      quantity INTEGER,
      PRIMARY KEY(id),
      CONSTRAINT fk_style
        FOREIGN KEY(style_id)
          REFERENCES styles(id)
          ON UPDATE CASCADE
      );`;
    db.query(createSkuTableQuery)
      .then(() => console.log('created Sku Table'))
      .then(() => module.exports.createRelatedProductsTable())
      .catch((err) => console.log(err));
  },

  createRelatedProductsTable: () => {
    const relatedProductsTable = 'related_products';
    const createRelatedProductsTableQuery = `
      CREATE TABLE ${relatedProductsTable}(
      id SERIAL,
      current_product_id INT,
      related_product_id INT,
      PRIMARY KEY(id),
      CONSTRAINT fk_product
        FOREIGN KEY(current_product_id)
          REFERENCES styles(id)
          ON UPDATE CASCADE,
      CONSTRAINT fk_relatedProduct
        FOREIGN KEY(related_product_id)
          REFERENCES styles(id)
          ON UPDATE CASCADE
      );`;
    db.query(createRelatedProductsTableQuery)
      .then(() => console.log('created related_products table'))
      .then(() => module.exports.etlProducts())
      .catch((err) => console.log(err));
  },

  createTables: () => {
    module.exports.createProductTable();
  },

  dropAllTables: (seederFn) => {
    db.query('DROP TABLE IF EXISTS product CASCADE')
      .then(() => { db.query('DROP TABLE IF EXISTS styles CASCADE'); })
      .then(() => { db.query('DROP TABLE IF EXISTS sku CASCADE'); })
      .then(() => { db.query('DROP TABLE IF EXISTS related_products CASCADE'); })
      .then(() => { seederFn(); })
      .catch((err) => { console.log(err); });
  },

  etlProducts: () => {
    const rawDataPathProducts = path.join(__dirname, '../raw_files/testData-raw-product.csv');
    const rawDataPathStyles = path.join(__dirname, '../raw_files/testData-raw-styles.csv');
    const productCopyQuery = `COPY product FROM '${rawDataPathProducts}' DELIMITER ',' CSV HEADER;`;
    const stylesCopyQuery = `COPY styles FROM '${rawDataPathStyles}' DELIMITER ',' CSV HEADER;`;

    db.query(productCopyQuery)
      .then(() => db.query(stylesCopyQuery))
      .catch((err) => console.log(err));
  },
};

module.exports.dropAllTables(module.exports.createTables);

// let stream = db.query(copyFrom(productCopyQuery));
// let fileStream = fs.createReadStream('./../')











// createProductTable: () => {
//   const productTable = 'product';

//   const createProductTableQuery = `
//     CREATE TABLE ${productTable} (
//     id SERIAL,
//     name VARCHAR,
//     slogan VARCHAR,
//     description VARCHAR,
//     category VARCHAR,
//     default_price INTEGER,
//     PRIMARY KEY(id)
//     );`;

//   db.query(createProductTableQuery)
//     .then(() => console.log('created product Table'))
//     .then(() => module.exports.createSeedTable())
//     .catch((err) => console.log(err));
// },

// createSeedTable: () => {
//   const styleTable = 'style';
//   const createStyleTableQuery = `
//     CREATE TABLE ${styleTable} (
//     id SERIAL,
//     product_id INTEGER,
//     sale_price INTEGER,
//     original_price INTEGER,
//     default_style BOOLEAN,
//     PRIMARY KEY(id),
//     CONSTRAINT fk_product
//       FOREIGN KEY(product_id)
//         REFERENCES product(id)
//     );`;
//   db.query(createStyleTableQuery)
//     .then(() => console.log('created styles Table'))
//     .then(() => module.exports.createSkuTable())
//     .catch((err) => console.log(err));
// },

// createSkuTable: () => {
//   const skuTable = 'sku';
//   const createSkuTableQuery = `
//     CREATE TABLE ${skuTable}  (
//     id SERIAL,
//     style_id INTEGER,
//     size VARCHAR(5),
//     quantity INTEGER,
//     PRIMARY KEY(id),
//     CONSTRAINT fk_style
//       FOREIGN KEY(style_id)
//         REFERENCES style(id)
//     );`;
//   db.query(createSkuTableQuery)
//     .then(() => console.log('created Sku Table'))
//     .then(() => module.exports.createRelatedProductsTable())
//     .catch((err) => console.log(err));
// },

// createRelatedProductsTable: () => {
//   const relatedProductsTable = 'related_products';
//   const createRelatedProductsTableQuery = `
//     CREATE TABLE ${relatedProductsTable}(
//     id SERIAL,
//     current_product_id INT,
//     related_product_id INT,
//     PRIMARY KEY(id),
//     CONSTRAINT fk_product
//       FOREIGN KEY(current_product_id)
//         REFERENCES style(id),
//     CONSTRAINT fk_relatedProduct
//       FOREIGN KEY(related_product_id)
//         REFERENCES style(id)
//     );`;
//   db.query(createRelatedProductsTableQuery)
//     .then(() => console.log('created related_products table'))
//     .then(() => module.exports.etlProducts())
//     .catch((err) => console.log(err));
// },
