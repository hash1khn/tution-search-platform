import { getTeacherById } from '../../../../lib/teacherService';

export async function GET(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: 'Teacher ID is required' });
    }

    try {
        const teacher = await getTeacherById(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        return res.status(200).json(teacher);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching teacher profile', error: error.message });
    }
}