import { query } from '../../../../lib/db';
import { verifyPassword, generateToken } from '../../../../lib/auth';

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // Step 1: Check if the user exists in the database
        const text = 'SELECT * FROM users WHERE email = $1';
        const result = await query(text, [email]);
        const user = result.rows[0];

        if (!user) {
            return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Step 2: Verify the password
        const isValid = await verifyPassword(password, user.password_hash);

        if (!isValid) {
            return new Response(JSON.stringify({ message: 'Invalid email or password' }), {
                status: 401,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Step 3: Generate JWT token
        const token = generateToken(user);

        return new Response(JSON.stringify({
            message: 'Login successful',
            token,
            user: {
                id: user.user_id,
                email: user.email,
                name: user.name,
                role: user.role,  // Role of the user (teacher, student, admin)
            }
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Login error:', error.message);
        return new Response(JSON.stringify({ message: 'Internal server error', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
