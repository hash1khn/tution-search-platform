import lib from 'pg';
import { createUser, createTeacher, createStudent} from '../../../../lib/userService';
import { hashPassword } from '../../../../lib/auth';

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password, name, phone_number, role, otherDetails } = body;

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Insert into users table and get the new user's ID
        const newUser = await createUser({ email, hashedPassword, name, phone_number, role });

        // Check if the ID was returned correctly
        if (!newUser || !newUser.id) {
            throw new Error('User creation failed. No ID returned.');
        }

        // Use the newUser.id to insert into the teachers or students table
        if (role === 'teacher') {
            await createTeacher(newUser.id, otherDetails);  // Use the correct user ID
        } else if (role === 'student') {
            await createStudent(newUser.id, otherDetails);  // Use the correct user ID
        }

        return new Response(JSON.stringify({ message: 'User created successfully', user: newUser }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to create user', error: error.message }), { status: 500 });
    }
}
