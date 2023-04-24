const nodemailer = require("nodemailer");
const user = require("./../models/userModel");
//const verificationLink = require("./../controllers/authController")

const sendVerificationEmail = async (user, verificationLink) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    //secure: true,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    
  });

  

  const mailOptions = {
    from: "<info@burcuh.dev>",
    to: user.email,
    subject: "Verify your email",
    html: `Hello ${user.name},<br><br>
    Thank you for signing up to Your Company! Please click the following link to verify your email address:<br><br>
    <a href="${verificationLink}">${verificationLink}</a><br><br>
    If you did not create an account with Your Company, please disregard this email.<br><br>
    Best regards,<br>
    Your Company`,
}

  //3) Actually send the email
  await transporter.sendMail(mailOptions)
};

module.exports = sendVerificationEmail

