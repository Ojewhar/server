const adminemail = process.env.ADMIN_EMAIL;
const adminSendEmail = process.env.USER_MAIL;
const nodemailer = require("nodemailer");
const { AcceptCertificate } = require("../email-templates/AcceptCertificate");
const schedule = require("node-schedule");

const sendCertificateActiveMail = async (req, res) => {
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
      subject: "Medical Certificate Request Approved",
      html: AcceptCertificate(fullname),
    };

    // Schedule the email to be sent after one hour
    scheduleEmail(transporter, mailOptions, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to schedule email sending after one hour
const scheduleEmail = (transporter, mailOptions, res) => {
  const job = schedule.scheduleJob(
    new Date(Date.now() + 60 * 60 * 1000),
    () => {
      sendEmail(transporter, mailOptions, res);
    }
  );
};

// Function to send email
const sendEmail = async (transporter, mailOptions, res) => {
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Please check your email" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
};

module.exports = sendCertificateActiveMail;
