// src/app/api/teachers/complete-profile/route.js
import { createTeacherProfile} from '../../../../lib/teacherService';
import { getUserById } from '../../../../lib/userService';
import { verifyToken } from '../../../../lib/auth';

export async function POST(req) {
    try {
        // Extract the token and payload (Assuming you are using JWT)
        const token = req.headers.get('Authorization').split(' ')[1];
        const { userId } = await verifyToken(token);  // Assuming JWT-based authentication

        // Fetch the logged-in user
        const user = await getUserById(userId);

        

        // Ensure the user is a teacher
        if (user.role !== 'teacher') {
            return new Response(JSON.stringify({ message: 'Unauthorized' }), {
                status: 403,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Extract the teacher-specific details from the request body
        const { teaching_mode, bio, experience_years, hourly_rate, education, languages, grade_level_id, language_id } = await req.json();

        // Create the teacher's profile
        const newTeacherProfile = await createTeacherProfile({
            user_id: userId,
            teaching_mode,
            bio,
            experience_years,
            hourly_rate,
            education,
            languages,
            grade_level_id,
            language_id,
        });

        return new Response(JSON.stringify({ message: 'Teacher profile created successfully', teacher: newTeacherProfile }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        return new Response(JSON.stringify({ message: 'Failed to create profile', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
