import { deleteTeacherProfile } from '../../../../lib/teacherService';

export async function DELETE(req, res) {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: 'Teacher ID is required' });
    }

    try {
        const deletedCount = await deleteTeacherProfile(id);
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        return res.status(200).json({ message: 'Teacher profile deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting teacher profile', error: error.message });
    }
}
