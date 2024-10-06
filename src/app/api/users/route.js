import { getAllUsers, getUserById,getTeacherById ,getStudentById} from '../../../../lib/userService';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');  // Get the `id` from the query string if provided

    try {
        if (userId) {
            // If an `id` is provided, return a single user
            const user = await getUserById(userId);

            if (!user) {
                return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
            }

            // Check the user's role and fetch additional details accordingly
            if (user.role === 'teacher') {
                const teacherDetails = await getTeacherById(user.id);  // Fetch teacher-specific data
                return new Response(JSON.stringify({ ...user, ...teacherDetails }), { status: 200 });
            } else if (user.role === 'student') {
                const studentDetails = await getStudentById(user.id);  // Fetch student-specific data
                return new Response(JSON.stringify({ ...user, ...studentDetails }), { status: 200 });
            } else {
                // If the role is 'admin' or any other role, return the user as-is
                return new Response(JSON.stringify(user), { status: 200 });
            }
        } else {
            // If no `id` is provided, return all users
            const users = await getAllUsers();
            return new Response(JSON.stringify(users), { status: 200 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to retrieve user(s)', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
export async function PATCH(req) {
    try {
        const body = await req.json();
        const { id, role, ...userData } = body;

        const user = await getUserById(id);
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        // Update the user in the 'users' table
        const updatedUser = await updateUser(id, userData);

        // Update the teacher or student details depending on the role
        if (role === 'teacher') {
            const teacherDetails = await updateTeacher(id, userData.otherDetails);
            return new Response(JSON.stringify({ ...updatedUser, ...teacherDetails }), { status: 200 });
        } else if (role === 'student') {
            const studentDetails = await updateStudent(id, userData.otherDetails);
            return new Response(JSON.stringify({ ...updatedUser, ...studentDetails }), { status: 200 });
        } else {
            return new Response(JSON.stringify(updatedUser), { status: 200 });
        }
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to update user', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('id');

    try {
        const user = await getUserById(userId);
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
        }

        // Delete the user from both the 'users' table and their specific table
        if (user.role === 'teacher') {
            await deleteTeacher(userId);  // Delete teacher data
        } else if (user.role === 'student') {
            await deleteStudent(userId);  // Delete student data
        }

        await deleteUser(userId);  // Finally, delete the user from the 'users' table
        return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to delete user', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
