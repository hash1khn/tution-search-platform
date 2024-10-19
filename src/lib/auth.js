import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Function to hash a password
// Hash the password before storing in the database
export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Compare plain password with hashed password
export async function verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
}

// Generate JWT token
export function generateToken(user) {
    const payload = {
        id: user.user_id,   // unique user id
        email: user.email,  // user's email
        role: user.role,    // user's role (teacher, student, admin)
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '72h' });
}

// Function to verify a JWT token
export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null; // Return null if the token is invalid
    }
}
