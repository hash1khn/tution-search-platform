import { query } from '../lib/db';  // Import the query function

// Create a new user in the 'users' table
export async function createUser({ email, hashedPassword, name, phone_number, role }) {
    try {
        const text = `INSERT INTO users (email, password_hash, name, phone_number, role) 
                      VALUES ($1, $2, $3, $4, $5) 
                      RETURNING id, email, name, phone_number, role`;
        const values = [email, hashedPassword, name, phone_number, role];
        const result = await query(text, values);
        return result.rows[0];  // Return the created user (with the ID)
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;  // Rethrow the error to be handled by the calling function
    }
}

// Get all users from the 'users' table
export async function getAllUsers() {
    try {
        const text = `SELECT * FROM users`;
        const result = await query(text);
        return result.rows;  // Return all users
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

// Get a user by their ID from the 'users' table
export async function getUserById(id) {
    try {
        const text = `SELECT * FROM users WHERE id = $1`;
        const result = await query(text, [id]);
        return result.rows[0];  // Return the user found by ID
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw error;
    }
}

// Update an existing user in the 'users' table
export async function updateUser(id, data) {
    const { email, name, phone_number, role } = data;
    try {
        const text = `UPDATE users SET email = $1, name = $2, phone_number = $3, role = $4 
                      WHERE id = $5 RETURNING *`;
        const values = [email, name, phone_number, role, id];
        const result = await query(text, values);
        return result.rows[0];  // Return the updated user
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

// Delete a user by their ID from the 'users' table
export async function deleteUser(id) {
    try {
        const text = `DELETE FROM users WHERE id = $1`;
        await query(text, [id]);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

// Create a new teacher in the 'teachers' table
export async function createTeacher(id, { teaching_mode, bio, location_id, hourly_rate, experience_years, education, languages }) {
    try {
        const text = `INSERT INTO teachers (id, teaching_mode, bio, location_id, hourly_rate, experience_years, education, languages) 
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;
        const values = [id, teaching_mode, bio, location_id, hourly_rate, experience_years, education, languages];
        await query(text, values);
    } catch (error) {
        console.error('Error creating teacher:', error);
        throw error;
    }
}

// Create a new student in the 'students' table
export async function createStudent(id, { grade_level, location_id, preferred_subjects, guardian_contact }) {
    try {
        const text = `INSERT INTO students (id, grade_level, location_id, preferred_subjects, guardian_contact) 
                      VALUES ($1, $2, $3, $4, $5)`;
        const values = [id, grade_level, location_id, preferred_subjects, guardian_contact];
        await query(text, values);
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
}
// READ all teachers
export async function getAllTeachers() {
    try {
        const text = `SELECT * FROM teachers INNER JOIN users ON teachers.id = users.id`;
        const result = await query(text);
        return result.rows;
    } catch (error) {
        console.error('Error fetching teachers:', error);
        throw error;
    }
}

// READ all students
export async function getAllStudents() {
    try {
        const text = `SELECT * FROM students INNER JOIN users ON students.id = users.id`;
        const result = await query(text);
        return result.rows;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
}

// READ teacher by ID
export async function getTeacherById(id) {
    try {
        const text = `SELECT * FROM teachers INNER JOIN users ON teachers.id = users.id WHERE teachers.id = $1`;
        const result = await query(text, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching teacher by ID:', error);
        throw error;
    }
}

// READ student by ID
export async function getStudentById(id) {
    try {
        const text = `SELECT * FROM students INNER JOIN users ON students.id = users.id WHERE students.id = $1`;
        const result = await query(text, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching student by ID:', error);
        throw error;
    }
}

// UPDATE teacher by ID
export async function updateTeacher(id, data) {
    const { teaching_mode, bio, location_id, hourly_rate, experience_years, education, languages } = data;
    try {
        const text = `UPDATE teachers 
                      SET teaching_mode = $1, bio = $2, location_id = $3, hourly_rate = $4, experience_years = $5, education = $6, languages = $7 
                      WHERE id = $8 RETURNING *`;
        const values = [teaching_mode, bio, location_id, hourly_rate, experience_years, education, languages, id];
        const result = await query(text, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating teacher:', error);
        throw error;
    }
}

// UPDATE student by ID
export async function updateStudent(id, data) {
    const { grade_level, location_id, preferred_subjects, guardian_contact } = data;
    try {
        const text = `UPDATE students 
                      SET grade_level = $1, location_id = $2, preferred_subjects = $3, guardian_contact = $4 
                      WHERE id = $5 RETURNING *`;
        const values = [grade_level, location_id, preferred_subjects, guardian_contact, id];
        const result = await query(text, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating student:', error);
        throw error;
    }
}

// DELETE teacher by ID
export async function deleteTeacher(id) {
    try {
        const text = `DELETE FROM teachers WHERE id = $1`;
        await query(text, [id]);
    } catch (error) {
        console.error('Error deleting teacher:', error);
        throw error;
    }
}

// DELETE student by ID
export async function deleteStudent(id) {
    try {
        const text = `DELETE FROM students WHERE id = $1`;
        await query(text, [id]);
    } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
    }
}