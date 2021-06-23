DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS style;
DROP TABLE IF EXISTS sku;

CREATE TABLE product (
  id SERIAL,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price VARCHAR,
  PRIMARY KEY(id)
);

CREATE TABLE style (
  id SERIAL,
  product_id INTEGER,
  sale_price INTEGER,
  original_price INTEGER,
  default_style BOOLEAN,
  PRIMARY KEY(id),
  CONSTRAINT fk_product
    FOREIGN KEY(product_id)
      REFERENCES product(id)
);

CREATE TABLE sku(
  id SERIAL,
  style_id INTEGER,
  size VAR(5),
  quantity INTEGER,
  PRIMARY KEY(id),
  CONSTRAINT fk_style
    FOREIGN KEY(style_id)
      REFERENCES style(id)
);

CREATE TABLE related_products(
  id SERIAL,
  current_product_id INT,
  related_product_id INT,
  PRIMARY KEY(id)
  CONSTRAINT fk_product
    FOREIGN KEY(current_product_id),
    FOREIGN KEY(related_product_id),
      REFERENCES style(id)
);

-- /COPY product FROM './sdc_raw_files/product.csv' DELIMITER ',' CSV HEADER;
