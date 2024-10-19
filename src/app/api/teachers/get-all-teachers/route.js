import {getAllTeachers} from '../../../../lib/teacherService';
export async function GET(req, res) {
    try {
        const teachers = await getAllTeachers();
        return res.status(200).json(teachers);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching teachers', error: error.message });
    }
}