import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.email",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

// async..await is not allowed in global scope, must use a wrapper
const main = async () => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: {
      name: 'Naveen Gaur',
      address: process.env.USER
    }, // sender address
    to: "vertigo1112@gmail.com, navcg05@yahoo.co.in", // list of receivers
    subject: "Send Email using Node.js and NodeMailer", // Subject line
    text: "Send Email using Node.js and NodeMailer", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};

main().catch(console.error);
