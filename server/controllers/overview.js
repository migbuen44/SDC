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
      // if (response[2].rows.length === 0) {
      //   dataShaped.thumbnail_url = null;
      // } else {
      //   dataShaped.thumbnail_url = response[2].rows[0].thumbnail_url;
      // }
      res.status(200).send(dataShaped);
    }, productId);
  },
  getProductByIdRelated: (req, res) => {
    const { productId } = req.params;
    overview.getProductByIdRelated((err, response) => {
      if (err) { res.status(400).send(err); }
      res.status(200).send(response.rows);
    }, productId);
  },
  getStyles: (req, res) => {
    const { productId } = req.params;
    overview.getStyles((err, response) => {
      if (err) { res.status(400).send(err); }
      res.status(200).send(response);
    }, productId);
  },

  getRelated: (req, res) => {
    const { productId } = req.params;
    overview.getRelated((err, related) => {
      if (err) { res.status(400).send(err); }
      res.status(200).send(related);
    }, productId);
  },
};
