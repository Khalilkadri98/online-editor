// emailService.js
require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT, 10),
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

const sendVerificationEmail = async (email, token) => {
  const verificationLink = `http://localhost:5000/api/users/verify/${token}`;

  try {
    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: email,
      subject: 'Email Verification',
      text: `Please verify your email by clicking on the following link: ${verificationLink}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Email Verification</h2>
          <p>Please verify your email by clicking on the following link:</p>
          <p><a href="${verificationLink}" style="color: #007bff; text-decoration: none;">${verificationLink}</a></p>
          <p>Or click the button below:</p>
          <a href="${verificationLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Verify Email</a>
        </div>
      `,
    });
    console.log('Verification email sent');
  } catch (error) {
    console.error('Error sending verification email:', error);
  }
};


// Send reset password email
const sendForgotPasswordEmail = async (email, rawToken) => {
  const resetLink = `http://localhost:3000/reset-password?token=${encodeURIComponent(rawToken)}&email=${encodeURIComponent(email)}`;

  try {
    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the following link to reset your password: ${resetLink}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
          <h2>Password Reset Request</h2>
          <p>You requested a password reset. Click the following link to reset your password:</p>
          <p><a href="${resetLink}" style="color: #007bff; text-decoration: none;">${resetLink}</a></p>
          <p>Or click the button below:</p>
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: white; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });
    console.log('Forgot password email sent');
  } catch (error) {
    console.error('Error sending forgot password email:', error);
  }
};


// Send notification email
const sendNotificationEmail = (to, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Notification',
    html: `<p>${message}</p>`,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationEmail,
  sendForgotPasswordEmail,
  sendNotificationEmail,
};
