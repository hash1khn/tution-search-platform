import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Function to send an email
export async function sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env.BASE_URL}/api/auth/verify-email?token=${token}`;

    const mailOptions = {
        from: '"Your Platform Name" <no-reply@yourdomain.com>', // Sender address
        to: email, // Receiver's email
        subject: 'Verify your email address', // Subject line
        text: `Please verify your email address by clicking the link: ${verificationUrl}`, // Plain text body
        html: `<p>Please verify your email address by clicking the link below:</p><a href="${verificationUrl}">Verify Email</a>`, // HTML body
    };

    await transporter.sendMail(mailOptions);
}
