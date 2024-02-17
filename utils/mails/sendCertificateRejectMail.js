const adminemail = process.env.ADMIN_EMAIL;
const adminSendEmail = process.env.USER_MAIL;
const nodemailer = require("nodemailer");
const { RejectCertificate } = require("../email-templates/RejectCertificate");

const sendCertificateRejectMail = async (req, res) => {
  try {
    const { toemail, fullname } = req.body;
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
      subject: "Medical Certificate Request Rejection",
      html: RejectCertificate(fullname),
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Please check your email" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendCertificateRejectMail;
