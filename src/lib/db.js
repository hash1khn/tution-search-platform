import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Initialize the connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false, // Optional: depending on your environment (e.g., Heroku)
    },
});

console.log("Database connection initialized.");

// Reusable function to run queries
export async function query(text, params) {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (err) {
        console.error('Query error', err.message, err.stack);
        throw err;
    }
}
