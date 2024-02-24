const adminemail = process.env.ADMIN_EMAIL;
const adminSendEmail = process.env.USER_MAIL;
const nodemailer = require("nodemailer");

const sendEmailOnlyUser = async (req, res) => {
  try {
    const { toemail, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: adminSendEmail,
        pass: process.env.USER_PASS,
      },
    });

    const mailOptions = {
      from: adminemail,
      to: toemail,
      subject: subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email send successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmailOnlyUser;
