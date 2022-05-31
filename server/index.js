const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router.js');
const db = require('../q_and_a_database/index.js');
const port = 3001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use('/api', router);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
