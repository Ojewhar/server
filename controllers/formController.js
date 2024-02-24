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
    }).select("-password");

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
    console.log(error);
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

const calcuAllForm = async (req, res) => {
  try {
    const res = await UpDocFormOne.find().select("forms");
  } catch (error) {
    res.status(500).json("Calculation Server Error");
  }
};
// Function to get form one data based on user email
const getFormOneData = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await UpDocFormOne.findById(id);
    if (!form) {
      res.status(404).json("This patient form in not avaiable now");
    } else {
      res.status(200).json(form);
    }
  } catch (error) {
    throw new Error("Error fetching form one data");
  }
};

// update status by admin
const updateSinglePatientForm = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await UpDocFormOne.findById(id);
    if (!form) {
      return res
        .status(404)
        .json({ message: "This patient form is not available now" });
    }

    const status = req.body.status;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    form.status = status;

    if (status === "canceled") {
      form.password = ""; // Remove password only if status is canceled
    }

    await form.save();

    return res.status(200).json({ message: `Your application is ${status}` });
  } catch (error) {
    console.error("Error updating form:", error);
    return res.status(500).json({ message: "Error updating form" });
  }
};
// update status by admin
const deleteSinglePatientForm = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await UpDocFormOne.findByIdAndDelete(id);
    if (!form) {
      return res
        .status(404)
        .json({ message: "This patient form is not available now" });
    }

    return res
      .status(200)
      .json({ form: form, message: `Medicale Certificate Form Is Deleted` });
  } catch (error) {
    console.error("Error updating form:", error);
    return res.status(500).json({ message: "Error updating form" });
  }
};

module.exports = {
  createFormOne,
  getFormOneData,
  getAllFormData,
  updateSinglePatientForm,
  calcuAllForm,
  deleteSinglePatientForm,
};
