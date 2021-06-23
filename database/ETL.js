const csv = require('csv');
const fs = require('fs');
const db = require('./index.js');


const creatProductTableQuery = 'CREATE TABLE IF NOT EXISTS product (id SERIAL, name varchar, slogan varchar, description varchar, category varchar, default_price varchar)';
const createStyleTableQuery = 'CREATE TABLE IF NOT EXISTS style (id SERIAL, product_id integer, sale_price integer, original_price integer, default boolean)';
const createSizeTableQuery = 'CREATE TABLE IF NOT EXISTS '
const productCopyQuery = '/COPY product FROM \'./sdc_raw_files/product.csv\' DELIMITER \',\' CSV HEADER;';
