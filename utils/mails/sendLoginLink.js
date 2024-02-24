const adminemail = process.env.USER_MAIL;
const jwt = require("jsonwebtoken");
const PassLessTemp = require("../email-templates/PassLessTemp");
const UserModel = require("../../models/UserModel");
const JwtTokenDb = require("../../models/JwtTokenDb");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const nodemailer = require("nodemailer");

async function sendLoginLink(req, res) {
  try {
    if (!req.body.email) {
      res.status(404).json("Email not define");
    } else {
      const isSubscribe = await UserModel.findOne({
        email: req.body.email,
      }).select("-password");

      if (!isSubscribe) {
        res.status(409).json("You are not registerd");
      } else {
        const JWT_TOKEN = jwt.sign(
          { user: isSubscribe },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d", // Token expiration time
          }
        );
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.USER_MAIL,
            pass: process.env.USER_PASS,
          },
        });
        const currentDate = new Date();
        const options = {
          day: "numeric",
          month: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: false,
        };

        const formattedDate = currentDate.toLocaleString("en-US", options);

        const mailOptions = {
          from: "Certnow " + "<" + adminemail + ">",
          to: req.body.email,
          subject: "Login to your certnow patient portal - " + formattedDate,
          html: PassLessTemp(JWT_TOKEN),
        };
        // const msg = {
        //   to: req.body.email,
        //   from: complaintsmail,
        //   bcc: complaintsmail,
        //   subject: req.body.subject,
        //   html: req.body.message,
        // };
        //await sgMail.send(mailOptions);
        await transporter.sendMail(mailOptions);

        // Save the token in the database
        const saveuser = new JwtTokenDb({
          token: JWT_TOKEN,
        });
        await saveuser.save();

        res.status(200).json({ message: "Please check your email" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to send email");
  }
}
module.exports = sendLoginLink;
