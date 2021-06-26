const copyFrom = require('pg-copy-streams').from;
const fs = require('fs');
const path = require('path');
//test
const lineInputStream = require('line-input-stream');


function seedProducts(err, client) {
  return new Promise((resolve, reject) => {
    const productCsvPath = path.join(__dirname, '../../raw_files/product.csv');
    const readFileStream = lineInputStream(fs.createReadStream(productCsvPath));
    const stream = client.query(copyFrom('COPY product FROM STDIN CSV HEADER;'));

    //test//

    //test//

    readFileStream.on('error', reject);

    readFileStream.on('open', () => {
      console.log('readfilestream-products open');
      console.time('seedTime-products');
      readFileStream.pipe(stream);
    });

    readFileStream.on('line', (line) => {
      console.log(line);
      console.log('remove quotes')
    })

    stream.on('finish', () => {
      console.timeEnd('seedTime-products');
      console.log('COMPLETE: product table seeded');
      resolve();
    });

    readFileStream.on('close', () => {
      console.log('readfilestream-products closed... still writing');
    });

    stream.on('error', reject);
  });
}

module.exports = seedProducts;
