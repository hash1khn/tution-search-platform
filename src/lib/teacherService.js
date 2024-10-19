// lib/teacherService.js
import { query } from './db';

//create teacher
export async function createTeacherProfile({ user_id, teaching_mode, bio, experience_years, hourly_rate, education, languages, grade_level_id, language_id }) {
    const text = `
        INSERT INTO teachers (user_id, teaching_mode, bio, experience_years, hourly_rate, education, languages, grade_level_id, language_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *`;
    const values = [user_id, teaching_mode, bio, experience_years, hourly_rate, education, languages, grade_level_id, language_id];
    const result = await query(text, values);
    return result.rows[0];
}
//get all
export async function getAllTeachers() {
    const text = `
      SELECT 
        t.teacher_id, 
        u.name, 
        u.email, 
        u.phone_number, 
        u.gender, 
        u.age, 
        u.profile_picture, 
        u.area, 
        c.city_name, 
        t.teaching_mode, 
        t.bio, 
        t.isverified, 
        t.experience_years, 
        t.education, 
        t.rating, 
        t.hourly_rate
      FROM teachers t
      JOIN users u ON t.user_id = u.user_id
      LEFT JOIN cities c ON u.city_id = c.city_id;
    `;
    const result = await query(text);
    return result.rows;
  }
//get by id
export async function getTeacherById(id) {
    const result = await query(`
        SELECT u.user_id, u.email, u.name, u.phone_number, u.gender, u.age, u.city_id, u.area, 
               t.teaching_mode, t.bio, t.isverified, t.experience_years, t.education, t.rating, t.hourly_rate,
               c.city_name, c.region
        FROM teachers t
        JOIN users u ON u.user_id = t.user_id
        LEFT JOIN cities c ON u.city_id = c.city_id
        WHERE t.user_id = $1
    `, [id]);
    return result.rows[0];
}
// Update teacher profile
export async function updateTeacherProfile(user_id, updates) {
    const { name, phone_number, gender, age, city_id, area, teaching_mode, bio, experience_years, education, hourly_rate } = updates;

    // Start a transaction
    await query('BEGIN');

    try {
        // Update the users table
        await query(`
            UPDATE users
            SET name = $1, phone_number = $2, gender = $3, age = $4, city_id = $5, area = $6, updated_at = NOW()
            WHERE user_id = $7
        `, [name, phone_number, gender, age, city_id, area, user_id]);

        // Update the teachers table
        await query(`
            UPDATE teachers
            SET teaching_mode = $1, bio = $2, experience_years = $3, education = $4, hourly_rate = $5, updated_at = NOW()
            WHERE user_id = $6
        `, [teaching_mode, bio, experience_years, education, hourly_rate, user_id]);

        // Commit the transaction
        await query('COMMIT');
        return { message: 'Teacher profile updated successfully' };
    } catch (err) {
        // Rollback if there's an error
        await query('ROLLBACK');
        throw new Error('Failed to update teacher profile');
    }
}

// Delete teacher profile
export async function deleteTeacherProfile(user_id) {
    const result = await query('DELETE FROM users WHERE user_id = $1 RETURNING *', [user_id]);
    return result.rowCount;
}