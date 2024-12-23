import nodemailer from 'nodemailer';

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

export const sendDueDateNotification = async (userEmail, serviceName, dueDate) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: userEmail,
      subject: `Upcoming Due Date for ${serviceName}`,
      html: `
        <h2>Due Date Reminder</h2>
        <p>This is a reminder that your service "${serviceName}" is due on ${new Date(dueDate).toLocaleDateString()}.</p>
        <p>Please ensure to complete the necessary requirements before the due date.</p>
      `
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Reminder email sent to ${userEmail}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };



