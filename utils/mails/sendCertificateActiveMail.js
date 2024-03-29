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

    // Send immediate response to the client
    res.status(200).json({ message: "Form submitted successfully" });

    // Schedule the email to be sent after one hour
    scheduleEmail(transporter, mailOptions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to schedule email sending after one hour
const scheduleEmail = (transporter, mailOptions) => {
  const job = schedule.scheduleJob(new Date(Date.now() + 1 * 60 * 1000), () => {
    sendEmail(transporter, mailOptions);
  });
};

// Function to send email
const sendEmail = async (transporter, mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendCertificateActiveMail;
