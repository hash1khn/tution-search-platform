import { updateTeacherProfile } from '../../../../lib/teacherService';

export async function PATCH(req, res) {
    const { id } = req.query;
    const updates = await req.json();

    if (!id) {
        return res.status(400).json({ message: 'Teacher ID is required' });
    }

    try {
        const updated = await updateTeacherProfile(id, updates);
        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ message: 'Error updating teacher profile', error: error.message });
    }
}
