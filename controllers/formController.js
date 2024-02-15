const UpDocFormOne = require("../models/UpDocFormOne");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");

// save form one
// const createFormOne = async (req, res) => {
//   try {
//     const alradyRegister = await UserModel.findOne({
//       email: req.body.firstFormEmail,
//     });

//     if (alradyRegister) {
//       if (req.body.ifOther !== "") {
//         const formone = new UpDocFormOne(...req.body, (status = "pending"));
//         await formone.save();
//       } else {
//         const formone = new UpDocFormOne(...req.body);
//         await formone.save();
//       }
//     } else {
//       if (req.body.ifOther !== "") {
//         const formone = new UpDocFormOne(...req.body, (status = "pending"));
//         await formone.save();
//         // create a new user if not accoutnt
//         const {
//           firstFormFName,
//           firstFormLName,
//           firstFormMobile,
//           firstFormPassword,
//           firstFormEmail,
//         } = req.body;
//         const hashedPassword = await bcrypt.hash(firstFormPassword, 10);
//         const registerUser = new UserModel({
//           name: firstFormFName + firstFormLName,
//           email: firstFormEmail,
//           password: hashedPassword,
//           mobile: firstFormMobile,
//           forms: formone._id,
//         });
//         await registerUser.save();

//         res.status(200).json({
//           formOne: formone,
//           message: "Form Submitted successfully",
//         });
//       } else {
//         const formone = new UpDocFormOne(req.body);
//         await formone.save();
//         // create a new user if not accoutnt
//         const {
//           firstFormFName,
//           firstFormLName,
//           firstFormMobile,
//           firstFormPassword,
//           firstFormEmail,
//         } = req.body;
//         const hashedPassword = await bcrypt.hash(firstFormPassword, 10);
//         const registerUser = new UserModel({
//           name: firstFormFName + firstFormLName,
//           email: firstFormEmail,
//           password: hashedPassword,
//           mobile: firstFormMobile,
//           forms: formone._id,
//         });
//         await registerUser.save();
//         res.status(200).json({
//           formOne: formone,
//           message: "Form Submitted successfully",
//         });
//       }
//     }
//   } catch (error) {
//     res.status(500).json({
//       message: "Internal Server Error",
//     });
//   }
// };

const createFormOne = async (req, res) => {
  try {
    const firstFormEmail = req.body.firstFormEmail;
    const ifOther = req.body.ifOther;
    const userData = req.body;

    const alreadyRegistered = await UserModel.findOne({
      email: firstFormEmail,
    });

    const formoneData =
      ifOther !== "" ? { ...userData, status: "pending" } : userData;

    const formone = new UpDocFormOne(formoneData);
    await formone.save();

    if (alreadyRegistered) {
      alreadyRegistered.forms.push(formone._id);
      await alreadyRegistered.save();
    } else {
      const {
        firstFormFName,
        firstFormLName,
        firstFormMobile,
        firstFormPassword,
      } = req.body;
      const hashedPassword = await bcrypt.hash(firstFormPassword, 10);

      const registerUser = new UserModel({
        name: firstFormFName + " " + firstFormLName,
        email: firstFormEmail,
        password: hashedPassword,
        mobile: firstFormMobile,
        forms: [formone._id],
      });
      await registerUser.save();
    }

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

const getAllFormData = async (req, res) => {
  try {
    const forms = await UpDocFormOne.find();

    if (!forms) {
      res.status(404);
    } else {
      res.status(200).json(forms);
    }
  } catch (error) {
    throw new Error("Error fetching form one data");
  }
};
// Function to get form one data based on user email

const getFormOneData = async (req, res) => {
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

module.exports = {
  createFormOne,
  getFormOneData,
  getAllFormData,
};
