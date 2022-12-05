CREATE DATABASE sql_injection;

CREATE TABLE employees(
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(255),
  email VARCHAR(255),
  salary INTEGER,
  created_on TIMESTAMP
);

CREATE ROLE client
LOGIN
PASSWORD 'test123';

GRANT SELECT ON employees TO client;