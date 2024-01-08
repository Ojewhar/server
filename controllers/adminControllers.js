const bcrypt = require("bcrypt");
const AdminUser = require("../models/AdminUser");
const jwt = require("jsonwebtoken");
const UpDocFormConsultation = require("../models/UpDocFormConsultation");
const UpDocFormOne = require("../models/UpDocFormOne");
const createJwt = require("../security/createJWT");

// Register Doctor And Admin
const createAdminUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const isUser = await AdminUser.findOne({ email });
    if (isUser) {
      res.status(409).json({ message: "Already Registered" });
    } else {
      // registered new user if not already registered
      const adminUser = new AdminUser({
        username,
        email,
        password: hashedPassword,
        role,
      });

      await adminUser.save();
      res.status(200).json({ message: "Registered Successfull" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllAdminUsers = async (req, res) => {
  try {
    const adminUsers = await AdminUser.find();
    res.send(adminUsers);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Login User
const logintAdminUser = async (req, res) => {
  try {
    const adminUser = await AdminUser.findOne({ email: req.body.email });

    // Create JWT
    const jwt_data = {
      id: adminUser._id,
      email: adminUser.email,
      username: adminUser.username,
      role: adminUser.role,
      status: adminUser.status,
    };
    const jwt_token = createJwt(jwt_data);

    // check already register or not
    if (!adminUser) {
      res.status(404).send({ error: "Please registration first" });
    } else {
      const isPassOk = await bcrypt.compare(
        req.body.password,
        adminUser.password
      );

      if (isPassOk) {
        res.status(200).json({
          jwt: jwt_token,
          message: "Login successfull",
        });
      } else {
        res.status(404).json({ error: "Authentication Error" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Authentication Error" });
  }
};

// Update Admin And Doctor Info
const updateAdminUserById = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["email", "password", "role", "status"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const adminUser = await AdminUser.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!adminUser) {
      return res.status(404).send({ error: "Admin user not found" });
    }

    res.send(adminUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete Admin And Doctor Info

const deleteAdminUserById = async (req, res) => {
  try {
    const adminUser = await AdminUser.findByIdAndDelete(req.params.id);
    if (!adminUser) {
      return res.status(404).send({ error: "Admin user not found" });
    }
    res.send(adminUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all data from 3 patient models
const getAllDataOfPatients = async (req, res) => {
  try {
    const data1 = await UpDocFormOne.find();
    const data2 = await UpDocFormConsultation.find();

    // Combine data from all models into a single array of objects
    const allPatient = [
      ...data1.map((item) => ({ model: "UpDocFormOne", data: item })),
      ...data2.map((item) => ({ model: "UpDocFormConsultation", data: item })),
    ];

    res.status(200).json(allPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAdminUser,
  getAllAdminUsers,
  logintAdminUser,
  updateAdminUserById,
  deleteAdminUserById,
  getAllDataOfPatients,
};
