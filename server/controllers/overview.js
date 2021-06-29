const overview = require('../models/overview');

module.exports = {
  getProducts: (req, res) => {
    const { query } = req;
    overview.getProducts((err, response) => {
      if (err) { res.status(400).send(err); }
      res.status(200).send(response.rows);
    }, query);
  },
  getProductById: (req, res) => {
    const { productId } = req.params;
    overview.getProductById((err, response) => {
      if (err) { res.status(400).send(err); }
      const dataShaped = response[0].rows[0];
      dataShaped.features = response[1].rows;
      res.status(200).send(dataShaped);
    }, productId);
  },
  getStyles: (req, res) => {
    const { productId } = req.params;
    overview.getStyles((err, styles) => {
      if (err) { res.status(400).send(err); }
      const stylesArray = styles;
      // console.log(stylesArray);
      stylesArray.map((style, index) => {
        overview.getStyleData((err2, response) => {
          if (err2) { res.status(400).send(err); }
          stylesArray[index].photos = response[0].rows;
          stylesArray[index].skus = response[1].rows;
        }, style);
        return 1;
      });
    }, productId);
  },
};
