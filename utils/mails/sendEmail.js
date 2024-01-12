const adminemail = process.env.ADMIN_EMAIL;
const adminSendEmail = process.env.USER_MAIL;
const nodemailer = require("nodemailer");

const sendEmail = async ({ toemail, fromemail, subject, message }) => {
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
};

module.exports = { sendEmail };
