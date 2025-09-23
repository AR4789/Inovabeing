const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Correct path to init.sql
const initSqlPath = path.join(__dirname, '..', 'sql', 'init.sql'); // go up from src to api, then sql/init.sql

if (fs.existsSync(initSqlPath)) {
  const initSql = fs.readFileSync(initSqlPath, 'utf-8');
  pool.query(initSql)
    .then(() => console.log('Database initialized'))
    .catch(err => console.error('Error initializing database:', err));
} else {
  console.error('init.sql file not found at', initSqlPath);
}

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
