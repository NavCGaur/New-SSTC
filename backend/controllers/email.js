import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});
export const sendEmail = async (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body;
  
    try {
      const info = await transporter.sendMail({
        from: {
          name: `${firstName} ${lastName}`,
          address: process.env.USER,
        },
        to: "vertigo1112@gmail.com, navcg05@yahoo.co.in",
        subject: "New Contact Form Submission from MD ASSOCIATES",
        text: `Message from ${firstName} ${lastName} (${email}, ${phone}): ${message}`,
        html: `<b>Message from ${firstName} ${lastName} (${email}, ${phone}):</b><br>${message}`,
      });
  
      return res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ message: "Failed to send email. Please try again later." });
    }
  };
  