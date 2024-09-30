// lib/db.js
const { Pool } = require('pg');
require('dotenv').config();  // Load environment variables

// Initialize a connection pool with PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Export the query method to interact with the database
module.exports = {
  query: (text, params) => pool.query(text, params),
};
