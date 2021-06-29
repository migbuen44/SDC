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
  getStyles: async (callback, productId) => {
    const query = `SELECT * FROM styles WHERE product_id = ${productId}`;
    const stylesData = await db.query(query);
    const result = { product_id: productId, results: [] };
    for (var i = 0; i < stylesData.rows.length; i++ ) {
      const style = stylesData.rows[i];
      const shapedData = {
        style_id: style.id,
        name: style.name,
        original_price: style.original_price,
        sale_price: style.sale_price,
        'default?': style.default_style,
        photos: [],
        skus: {},
      };
      module.exports.getStyleData((err, styleData) => {
        if (err) { callback(err); }
        // styleData[1].rows.map((sku, i) => {
        //   shapedData.skus[sku.id] = { quantity: sku.quantity, size: sku.size };
        // });
        shapedData.photos = styleData[0].rows;
        result.results.push(shapedData);
        // console.log(result)
        console.log(shapedData);
      }, style.id);
      result.results.push(shapedData);
    }
    // await stylesData.rows.map((style) => {
    // });
    // console.log(result);

    // const placeholder = {
    //   style_id: style.id,
    //   name: style.name,
    //   original_price: style.original_price,
    //   sale_price: style.sale_price,
    //   'default?': style.default_style,
    //   photos: [],
    //   skus: {},
    // };
    // callback(null, shapedData);
  },
  getStyleData: (callback, styleId) => {
    const queries = [
      `SELECT thumbnail_url, url FROM photos WHERE style_id = '${styleId}'`,
      `SELECT id, size, quantity FROM skus WHERE style_id = '${styleId}'`,
    ];
    db.query(queries.join(';'), (err, response) => {
      if (err) { callback(err); }
      callback(null, response);
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
// },