const db = require('../../database/index'); // For database connection, if connection is created in other file, I think you could change this temporarily.

module.exports = {
  getProducts: (callback, query) => {
    const queryString = `SELECT * FROM product LIMIT ${query.count || 5} OFFSET ${query.count * (query.page - 1) || 0}`;
    // const queryString = `select t1.*, t3.thumbnail_url, t4.feature, t4.value
    // from product t1
    // inner join styles t2 on t1.id = t2.product_id
    // inner join photos t3 on t2.id = t3.style_id
    // inner join features t4 on t1.id = t4.product_id
    // where t1.id = 3;`;
    const queryStringTest = `EXPLAIN ANALYZE ${queryString}`;
    db.query(queryString, (err, response) => {
      if (err) { callback(err); }
      callback(null, response);
    });
  },
  getProductById: (callback, productId) => {
    // const queryString = [
    //   `SELECT * FROM product WHERE id = ${productId}`,
    //   `SELECT feature, value FROM features WHERE product_id = ${productId}`,
    // ];
    // const queryString = [
    //   `SELECT * FROM product WHERE id = ${productId}`,
    //   `SELECT feature, value FROM features WHERE product_id = ${productId}`,
    //   `select t3.thumbnail_url
    //     from product t1
    //     inner join styles t2 on t1.id = t2.product_id
    //     inner join photos t3 on t2.id = t3.style_id
    //     where t1.id = ${productId} limit 1;`,
    // ];
    const queryString = [
      `select t1.*, t3.thumbnail_url
        from product t1
        left join styles t2 on t1.id = t2.product_id
        left join photos t3 on t2.id = t3.style_id
        where t1.id = ${productId} limit 1;`,
      `SELECT feature, value FROM features WHERE product_id = ${productId}`,
    ];
    const queryStringTest = [
      `EXPLAIN ANALYZE SELECT * FROM product WHERE id = ${productId}`,
      `EXPLAIN ANALYZE SELECT feature, value FROM features WHERE product_id = ${productId}`,
    ];
    db.query(queryString.join(';'), (err, response) => {
      if (err) { callback(err); }
      callback(null, response);
    });
  },
  getProductByIdRelated: (callback, productId) => {
    const queryString = `select t1.*, t3.thumbnail_url
    from product t1
    left join styles t2 on t1.id = t2.product_id
    left join photos t3 on t2.id = t3.style_id
    where t1.id = ${productId} limit 1;`;

    db.query(queryString, (err, response) => {
      if (err) { callback(err); }
      callback(null, response);
    });
  },

  getStyles: async (callback, productId) => {
    const queryString = `SELECT * FROM styles WHERE product_id = ${productId}`;
    const queryStringTest = `EXPLAIN ANALYZE SELECT * FROM styles WHERE product_id = ${productId}`;
    db.query(queryString, (err, res) => {
      if (err) { callback(err); }
      const stylesData = res.rows;
      const shapedData = { product_id: productId, results: [] };
      const iterateStyles = async () => {
        for (let i = 0; i < stylesData.length; i += 1) {
          const style = stylesData[i];
          const queries = [
            `SELECT thumbnail_url, url FROM photos WHERE style_id = '${style.id}'`,
            `SELECT id, size, quantity FROM skus WHERE style_id = '${style.id}'`,
          ];
          const suppStyleData = await db.query(queries.join(';'))
          const template = {
            style_id: style.id,
            name: style.name,
            original_price: style.original_price,
            sale_price: style.sale_price,
            'default?': style.default_style,
            photos: [],
            skus: {},
          };

          for (let j = 0; j < suppStyleData[1].rows.length; j += 1) {
            const sku = suppStyleData[1].rows[j];
            template.skus = { [sku.id]: { quantity: sku.quantity, size: sku.size } };
          }
          template.photos = suppStyleData[0].rows;
          shapedData.results.push(template);
        }
      };
      iterateStyles()
        .then(() => {
          callback(null, shapedData);
        });
    });
  },
  getRelated: (callback, productId) => {
    const queryString = `SELECT related_product_id FROM related_products WHERE current_product_id = ${productId}`;
    db.query(queryString, (err, res) => {
      if (err) { callback(err); }
      const relatedArr = res.rows.map((ids) => ids.related_product_id);
      callback(null, relatedArr);
    });
  },
};

// getStyles: (callback, productId) => {
//   const query = `SELECT * FROM styles WHERE product_id = ${productId}`;
//   db.query(query, (err, responseStyle) => {
//     if (err) { callback(err); }
//     const shapedData = { productId, results: [] };
//     const stylesArray = responseStyle.rows;

//     // for every style, create a shaped style object
//     stylesArray.map((style, i) => {
//       shapedData.results.push({
//         style_id: style.id,
//         name: style.name,
//         original_price: style.original_price,
//         sale_price: style.sale_price,
//         'default?': style.default_style,
//         photos: [],
//         skus: {},
//       });

//       // for every style, get styleData and pass in styleId and shapedObject
//       module.exports.getStyleData((err2, response) => {
//         if (err2) { callback(err2); }
//         shapedData.results.push(response);
//       }, style.id, shapedData.results[i]);
//     });
//     callback(null, shapedData);
//   });
// },

// getStyleData: (callback, styleId, results) => {
//   const queries = [
//     `SELECT thumbnail_url, url FROM photos WHERE style_id = '${styleId}'`,
//     `SELECT id, size, quantity FROM skus WHERE style_id = '${styleId}'`,
//   ];
//   db.query(queries.join(';'), (err, response) => {
//     if (err) { callback(err); }
//     const styleObj = results;
//     const photosArr = response[0].rows;
//     const skusArr = response[1].rows;

//     styleObj.photos = photosArr;
//     skusArr.map((size) => {
//       styleObj.skus[size.id] = {
//         quantity: size.quantity,
//         size: size.size,
//       };
//       console.log(styleObj);
//       return 0;
//     });
//     callback(null, styleObj);
//   });
// },\





// getStyles: async (callback, productId) => {
//   const query = `SELECT * FROM styles WHERE product_id = ${productId}`;
//   const stylesData = await db.query(query);
//   const result = { product_id: productId, results: [] };
//   for (var i = 0; i < stylesData.rows.length; i++ ) {
//     const style = stylesData.rows[i];
//     const shapedData = {
//       style_id: style.id,
//       name: style.name,
//       original_price: style.original_price,
//       sale_price: style.sale_price,
//       'default?': style.default_style,
//       photos: [],
//       skus: {},
//     };
//     module.exports.getStyleData((err, styleData) => {
//       if (err) { callback(err); }
//       // styleData[1].rows.map((sku, i) => {
//       //   shapedData.skus[sku.id] = { quantity: sku.quantity, size: sku.size };
//       // });
//       shapedData.photos = styleData[0].rows;
//       result.results.push(shapedData);
//       // console.log(result)
//       console.log(shapedData);
//     }, style.id);
//     result.results.push(shapedData);
//   }