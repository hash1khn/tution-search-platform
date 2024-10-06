import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Function to hash a password
export async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// Function to verify a password during login
export async function verifyPassword(plainPassword, hashedPassword) {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}

// Function to generate a JWT token
export function generateToken(user) {
    // Create a token payload containing user id and role
    const payload = { userId: user.id, role: user.role };
    
    // Sign the token with a secret and set the expiration (e.g., 1h)
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}

// Function to verify a JWT token
export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null; // Return null if the token is invalid
    }
}
