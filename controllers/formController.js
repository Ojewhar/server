const UpDocFormConsultation = require("../models/UpDocFormConsultation");
const UpDocFormOne = require("../models/UpDocFormOne");
const jwt = require("jsonwebtoken");

// save form one
const createFormOne = async (req, res) => {
  try {
    const existingForm = await UpDocFormOne.findOne({
      firstFormEmail: req.body.firstFormEmail,
    });

    if (existingForm) {
      return res.status(400).json({
        message: "You already registerd with this email",
      });
    }
    const formone = new UpDocFormOne(req.body);
    await formone.save();

    res.status(200).json({
      formOne: formone,
      message: "Form Submitted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Function to get form one data based on user email

const getFormOneData = async (req, res) => {
  const { email } = req.user;

  try {
    // Now, fetch form one data based on user details
    const userInfos = await UpDocFormOne.findOne({
      firstFormEmail: email,
    });

    if (!userInfos) {
      res.status(404).json("You are not registerd user");
    } else {
      res.status(200).json(userInfos);
    }
  } catch (error) {
    throw new Error("Error fetching form one data");
  }
};
// Consultation Form (2nd Form)
const createConsultation = async (req, res) => {
  try {
    const email = req.body.firstFormEmail;
    const isRegisterd = await UpDocFormConsultation.findOne({
      firstFormEmail: email,
    });
    if (isRegisterd) {
      res.status(404).json("User already registerd");
    } else {
      const formone = new UpDocFormConsultation(req.body);
      formone.save();
      res.status(200).json("Form Submited successfully");
    }
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

const getConsultation = async (req, res) => {
  try {
    // Now, fetch form one data based on user details
    const userInfos = await UpDocFormConsultation.findOne({
      firstFormEmail: req.body.email,
    });

    if (!userInfos) {
      res.status(404).json("You are not registerd user");
    } else {
      res.status(200).json(userInfos);
    }
  } catch (error) {
    throw new Error("Error fetching form one data");
  }
};

module.exports = {
  createFormOne,
  getFormOneData,
  createConsultation,
  getConsultation,
};
