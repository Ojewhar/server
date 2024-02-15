const nodemailer = require("nodemailer");
const adminemail = process.env.USER_MAIL;
const pass = process.env.USER_PASS;
const jwt = require("jsonwebtoken");
const PassLessTemp = require("../email-templates/PassLessTemp");
const JwtTokenDb = require("../../models/JwtTokenDb");
const UserModel = require("../../models/UserModel");

async function sendLoginLink(req, res) {
  try {
    if (!req.body.email) {
      res.status(404).json("Email not define");
    } else {
      const isSubscribe = await UserModel.findOne({ email: req.body.email });

      if (!isSubscribe) {
        res.status(409).json("You are not registerd");
      } else {
        const JWT_TOKEN = jwt.sign(
          {
            id: isSubscribe._id,
            name: isSubscribe.name,
            email: isSubscribe.email,
            role: isSubscribe.role,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d", // Token expiration time
          }
        );

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: adminemail,
            pass: pass,
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
