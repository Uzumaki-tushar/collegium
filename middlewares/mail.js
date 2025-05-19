const { transporter } = require('../config/emailConfig');
const { Verification_Email_Template, Welcome_Email_Template, Forget_Password } = require('../libs/EmailTemplate');
const userModel = require('../models/user-model');

// Send Verification Code
module.exports.SendVerificationCode = async function (email, verificationCode) {
  try {
    const mailOptions = {
      from: "Collegium <tushar2471.be22@chitkara.edu.in>", // Proper 'from'
      to: email,
      subject: "Verify your email",
      text: "Verify your email",
      html: Verification_Email_Template.replace("{verificationCode}", verificationCode),
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", response.messageId);
  } catch (error) {
    console.log("Error sending verification email:", error);
  }
};

// Send Welcome Email
module.exports.WelcomeEmail = async function (email, name) {
  try {
    const mailOptions = {
      from: "Collegium <tushar2471.be22@chitkara.edu.in>",
      to: email,
      subject: "Welcome to our website",
      text: "Welcome to our website",
      html: Welcome_Email_Template
        .replace("{name}", name)
        .replace("{link}", "http://localhost:3000/users/profile"),
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent successfully:", response.messageId);
  } catch (error) {
    console.log("Error sending welcome email:", error);
  }
};

// Send Forget Password Email
module.exports.ForgetPassword = async function (email, name) {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("User not found for forget password.");
      return;
    }

    const mailOptions = {
      from: "Collegium <tushar2471.be22@chitkara.edu.in>",
      to: email,
      subject: "Reset your Password",
      text: "Reset your Password",
      html: Forget_Password
        .replace("{name}", name)
        .replace("{link}", `http://localhost:3000/resetPassword/${user._id}`),
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("Forget password email sent successfully:", response.messageId);
  } catch (error) {
    console.log("Error sending forget password email:", error);
  }
};
