CREATE DATABASE qanda;

CREATE TABLE users (
  id serial PRIMARY KEY,
  name VARCHAR,
  email VARCHAR
);

CREATE TABLE questions (
  id serial PRIMARY KEY,
  product_id INT,
  body VARCHAR,
  date_written TIMESTAMP,
  userId INT REFERENCES users (id)
  reported INT,
  helpful INT
);

CREATE TABLE answers (
  id serial PRIMARY KEY,
  question_id INT REFERENCES questions (id),
  body VARCHAR,
  date_written TIMESTAMP,
  userId INT REFERENCES users (id),
  reported INT,
  helpful INT
);

CREATE TABLE answers_photos (
  id serial PRIMARY KEY,
  answer_id INT REFERENCES answers (id),
  url VARCHAR
);


