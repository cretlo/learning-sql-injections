const { Pool } = require('pg');

const config = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'iMan120',
  database: 'sql_injection',
};

let pool = new Pool(config);

function setNewPool(user) {
  if (user == 'admin') {
    (config.user = 'postgres'), (config.password = 'iMan120');
  }

  if (user == 'client') {
    (config.user = 'client'), (config.password = 'test123');
  }
  pool = new Pool(config);
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  config: config,
  setNewPool: setNewPool,
};
