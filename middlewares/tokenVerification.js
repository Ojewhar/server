const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const secretKey = process.env.JWT_SECRET;
const admin_email = process.env.ADMIN_EMAIL;

const authGuard = (req, res, next) => {
  const token = req.headers?.access_token;

  try {
    if (admin_email === req.headers?.admin_email) {
      next();
    } else {
      if (!token || token === "undefined" || token === "null") {
        return res.status(401).json("You don't have a JWT");
      }

      const decoded = jwt.verify(token, secretKey);

      req.user = decoded.user;

      next();
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(405).json("Your JWT expired");
    } else {
      return res.status(401).json({ error: "Invalid token" });
    }
  }
};

const restrict = (roles) => async (req, res, next) => {
  const userId = req.user._id;

  const user = await UserModel.findById(userId);

  if (roles.includes(user.role)) {
    next();
  } else {
    return res.status(409).json({ message: "You dont have permission" });
  }
};

module.exports = { authGuard, restrict };
