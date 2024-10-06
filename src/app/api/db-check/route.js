import { query } from '../../../lib/db.js';

export async function GET(req) {
  try {
    // Run a simple query to check the connection
    const result = await query('SELECT NOW()');

    // Return a successful response with the current time from the database
    return new Response(JSON.stringify({ message: 'Connected to the database!', time: result.rows[0].now }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    // If there's an error, return a 500 response with the error message
    return new Response(JSON.stringify({ message: 'Failed to connect to the database', error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
