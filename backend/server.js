const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com", // Corrected host
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
});

app.post('/send-email', async (req, res) => {
    const { firstName, lastName, email, phone, message } = req.body;
    console.log('Received request:', { firstName, lastName, email, phone, message}); // Log received data

    const mailOptions = {
      from: {
        name: 'Naveen Gaur',
        address: process.env.USER
      },
      to: "vertigo1112@gmail.com, navcg05@yahoo.co.in",
      subject: `New message from ${firstName} ${lastName}`,
      text: `From: ${firstName} ${lastName}\nEmail: ${email} \nPhone Number: ${phone}\n\n Message: ${message}`,
      html: `<p><strong>From:</strong> ${firstName} ${lastName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Phone Number:</strong> ${phone}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    };

    try {
        console.log('Attempting to send email...');
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Error sending email', error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));