

CREATE TABLE IF NOT EXISTS product (id SERIAL, name varchar, slogan varchar, description varchar, category varchar, default_price varchar);
CREATE TABLE IF NOT EXISTS style (id SERIAL, product_id integer, sale_price integer, original_price integer, default boolean);
CREATE TABLE IF NOT EXISTS size( )

/COPY product FROM './sdc_raw_files/product.csv' DELIMITER ',' CSV HEADER;
