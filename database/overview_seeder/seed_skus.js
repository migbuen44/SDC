const copyFrom = require('pg-copy-streams');
const fs = require('fs');
const path = require('path');
const config = require('../../config/config.js');

module.exports = (err, client, release) => {
  if (err) { console.log(err); };
  const skusCsvPath = path.join(__dirname, '../../raw_files/skus.csv');
  const readFileStream = fs.createReadStream(skusCsvPath);
  const stream = client.query(copyFrom('COPY skus FROM STDIN CSV HEADER'));

  readFileStream.on('error', (error) => console.log(error));
  readFileStream.on('open', () => {
    console.log('readstream-skus open');
    console.time('seedTime-skus');
    readFileStream.pipe(stream);
  });

  stream.on('error', (error) => console.log(error));
  stream.on('finish', () => {
    console.timeEnd('seedTime-skus');
    console.log('COMPLETE: skus table seeded');
    release();
  });

  readFileStream.on('close', () => {
    console.log('readstream-skus closed');
  });
};