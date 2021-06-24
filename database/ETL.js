const csv = require('csv-parser');
const config = require('../config.js');
const { Client } = require('pg');

const client = new Client(config);
client.connect();
