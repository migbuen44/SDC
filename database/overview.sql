DROP TABLE IF EXISTS related_products CASCADE;
DROP TABLE IF EXISTS skus CASCADE;
DROP TABLE IF EXISTS styles CASCADE;
DROP TABLE IF EXISTS product;

CREATE TABLE product (
  id SERIAL,
  name VARCHAR,
  slogan VARCHAR,
  description VARCHAR,
  category VARCHAR,
  default_price VARCHAR,
  PRIMARY KEY(id)
);

CREATE TABLE styles (
  id SERIAL,
  product_id INTEGER,
  name VARCHAR(250),
  sale_price VARCHAR,
  original_price INTEGER,
  default_style BOOLEAN,
  PRIMARY KEY(id),
  CONSTRAINT fk_product
    FOREIGN KEY(product_id)
      REFERENCES product(id)
      ON UPDATE CASCADE

);

CREATE TABLE skus (
  id SERIAL,
  style_id INTEGER,
  size VARCHAR(5),
  quantity INTEGER,
  PRIMARY KEY(id),
  CONSTRAINT fk_style
    FOREIGN KEY(style_id)
      REFERENCES styles(id)
      ON UPDATE CASCADE
);

CREATE TABLE related_products (
  id SERIAL,
  current_product_id INT,
  related_product_id INT,
  PRIMARY KEY(id),
  CONSTRAINT fk_product
    FOREIGN KEY(current_product_id)
      REFERENCES styles(id)
      ON UPDATE CASCADE,
  CONSTRAINT fk_relatedProduct
    FOREIGN KEY(related_product_id)
      REFERENCES styles(id)
      ON UPDATE CASCADE
);
