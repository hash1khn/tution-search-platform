import { hashPassword } from '../../../../lib/auth';
import { createUser } from '../../../../lib/userService';

export async function POST(req) {
    try {
        // Parse the incoming JSON request body
        const { email, password, name, phone_number, gender, age, city_id, area, profile_picture, role } = await req.json();

        // Ensure role is valid (it must be 'teacher', 'student', or 'admin')
        if (!['teacher', 'student', 'admin'].includes(role)) {
            return new Response(
                JSON.stringify({ message: 'Invalid role. Must be either teacher, student, or admin.' }),
                { status: 400, headers: { 'Content-Type': 'application/json' } }
            );
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Insert the user into the users table with the given role
        const newUser = await createUser({
            email,
            hashedPassword,
            name,
            phone_number,
            gender,
            age,
            role,  // Role will now be set from the request body (teacher, student, or admin)
            city_id,
            area,
            profile_picture
        });

        // Respond with success and the newly created user data
        return new Response(
            JSON.stringify({ message: 'User created successfully', user: newUser }),
            { status: 201, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        // Catch any errors during user creation and respond with an error message
        return new Response(
            JSON.stringify({ message: 'Failed to create user', error: error.message }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}