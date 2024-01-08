const adminemail = process.env.USER_MAIL;

const sendMail = async ({ to, email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: adminemail,
      pass: process.env.USER_PASS,
    },
  });

  const mailOptions = {
    from: adminemail,
    to: email,
    subject: subject,
    html: message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendMail };
