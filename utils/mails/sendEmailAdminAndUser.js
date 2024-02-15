const adminemail = process.env.ADMIN_EMAIL;
const adminSendEmail = process.env.USER_MAIL;
const nodemailer = require("nodemailer");

const sendEmailAdminAndUser = async (req, res) => {
  try {
    const { toemail, fromemail, subject, message } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: adminSendEmail,
        pass: process.env.USER_PASS,
      },
    });

    const mailOptions = {
      from: adminemail,
      to: [toemail, fromemail],
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Please check your email" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmailAdminAndUser;
