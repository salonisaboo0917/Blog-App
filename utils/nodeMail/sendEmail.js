const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendResetEmail = async (to, token) => {
  const resetLink = `http://localhost:3000/reset-password?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Password Reset Request',
    html: `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`,
  };

  await transporter.sendMail(mailOptions);
};
