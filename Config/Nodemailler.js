// const nodemailer = require ("nodemailer")

// const dotenv = require("dotenv")
// const { model } = require("mongoose")
// dotenv.config()

// const transporter = nodemailer.createTransport({
 

//         service: "gmail",
//     auth: {
//         user: process.env.APP_EMAIL,
//         pass: process.env.APP_PASS
//     }
// });


// const nodemailer = require("nodemailer");
// const dotenv = require("dotenv");
// dotenv.config();

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587,        // must use 587 on Render
//   secure: false,    // STARTTLS
//   auth: {
//     user: process.env.APP_EMAIL,
//     pass: process.env.APP_PASS, // use an App Password if Gmail
//   },
// });

// transporter.verify((err, success) => {
//   if (err) console.error("SMTP connection failed:", err);
//   else console.log("✅ SMTP ready to send emails");
// });

// module.exports = transporter;

// transporter.verify((err, success) =>{
//     if(success){
//         console.log("Nodemaller is ready to send email......");

        
//     }else{
//         console.log(err);
        
//     }
// })
// module.exports = transporter



const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error("❌ Mailtrap connection failed:", err);
  } else {
    console.log("✅ Mailtrap is ready to send emails");
  }
});

module.exports = transporter;
