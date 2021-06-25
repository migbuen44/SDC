const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const path = require('path');
const config = require('../../config/config');
const pool = require('../index.js');

module.exports = (err, client, release) => {
  if (err) { console.log('error1', err); }

  const stylesCsvPath = path.join(__dirname, '../../raw_files/styles.csv');

  const stream = client.query(copyFrom('COPY styles FROM STDIN CSV HEADER'));
  const readFileStream = fs.createReadStream(stylesCsvPath);

  readFileStream.on('error', (error) => console.log('error2', error));
  stream.on('error', (error) => console.log('error3', error));
  stream.on('end', () => {
    console.log('tables seeded');
    release();
  });

  readFileStream.on('open', () => {
    console.log('styles readFilestream open');
    console.time('styles_seedTime');
    readFileStream.pipe(stream);
  });
  readFileStream.on('close', () => {
    console.log('styles readFilestream closed');
    console.timeEnd('styles_seedTime');
    // release();
  });
};
