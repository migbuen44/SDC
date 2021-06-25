const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const path = require('path');
const config = require('../../config/config');
const pool = require('./seed_products.js');
const seedSkus = require('./seed_skus.js');

module.exports = (err, client, release) => new Promise((resolve, reject) => {
  if (err) { reject(err); }

  const stylesCsvPath = path.join(__dirname, '../../raw_files/styles.csv');

  const stream = client.query(copyFrom('COPY styles FROM STDIN CSV HEADER'));
  const readFileStream = fs.createReadStream(stylesCsvPath);

  readFileStream.on('error', (error) => console.log('styles readFileStream error', error));
  readFileStream.on('open', () => {
    console.log('readfilestream-styles open');
    console.time('seedTime-styles');
    readFileStream.pipe(stream);
  });

  stream.on('error', (error) => console.log('styles stream error', error));
  stream.on('finish', () => {
    console.timeEnd('seedTime-styles');
    console.log('COMPLETE: styles table seeded');
    release();
    resolve();
  });

  readFileStream.on('close', () => {
    console.log('readfilestream-styles closed... still writing');
  });
});
