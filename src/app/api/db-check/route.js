import { createClient } from '../../../lib/db.js';

export async function GET(req) {
  const client = createClient();

  try {
    await client.connect();
    await client.query('SELECT NOW()'); // A simple query to check the connection
    await client.end();

    return new Response(JSON.stringify({ message: 'Connected to the database!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: 'Failed to connect to the database', error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
