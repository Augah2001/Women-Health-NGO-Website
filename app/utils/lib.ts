import nodemailer from 'nodemailer';
import sharp from 'sharp';

export async function sendResetEmail(to: string | undefined, resetLink: string) {

    if (!to) {
        throw new Error('Email address is required');
    
    }
    console.log(process.env.RESET_EMAIL, process.env.RESET_EMAIL_PASSWORD)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: true,
    logger: true,
   tls: {
      rejectUnauthorized: false,
   },
    debug: true, // include SMTP traffic in the logs
    
    auth: {
      user: process.env.RESET_EMAIL,
      pass: process.env.RESET_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.RESET_EMAIL,
    to,
    subject: 'Password Reset Request',
    text: `Please use the following link to reset your password: ${resetLink}`,
  };

  return transporter.sendMail(mailOptions);
}






