const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");

const createUser = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const isUser = await AdminUser.findOne({ email });
    if (isUser) {
      res.status(409).json({ message: "Already Registered" });
    } else {
      // registered new user if not already registered
      const adminUser = new AdminUser({
        name,
        email,
        password: hashedPassword,
        mobile,
      });

      await adminUser.save();
      res.status(200).json({ message: "Registered Successfull" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      res.status(404).json("You are not registerd user");
    } else {
      res.status(200).json(users);
    }
  } catch (error) {
    throw new Error("Error fetching form one data");
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).send({ error: "Please register first" });
    } else {
      const isPassOk = await bcrypt.compare(req.body.password, user.password);

      if (isPassOk) {
        const jwtuser = await UserModel.findOne({
          email: req.body.email,
        }).select("-password");

        const jwt_token = jwt.sign({ user: jwtuser }, process.env.JWT_SECRET, {
          expiresIn: "10d", // Token expiration time
        });

        res.status(200).json({
          jwt: jwt_token,
          message: "Login successful",
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
const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = await User.findById(id);

    if (!updateUser) {
      res.status(404).send({ message: "User not found" });
    } else {
      if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const adminUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.send(adminUser);
    }
  } catch (error) {
    res.status(400).send({ message: "Update user server error" });
  }
};

// Delete Admin And Doctor Info

const deleteUserById = async (req, res) => {
  try {
    const adminUser = await User.findByIdAndDelete(req.params.id);
    if (!adminUser) {
      return res.status(404).send({ error: "Admin user not found" });
    }
    res.send(adminUser);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  deleteUserById,
  updateUserById,
};
