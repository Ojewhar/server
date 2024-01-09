const express = require("express");
const router = express.Router();
const {
  deleteAdminUserById,
  updateAdminUserById,
  logintAdminUser,
  getAllAdminUsers,
  createAdminUser,
  getAllDataOfPatients,
} = require("../controllers/adminControllers");
const { restrict, authGuard } = require("../middlewares/tokenVerification");

// Create a new admin user
router.post("/createAdminUser", createAdminUser);
router.get(
  "/getAllAdminUsers",
  authGuard,
  restrict(["admin"]),
  getAllAdminUsers
);
router.post("/logintAdminUser", logintAdminUser);
router.patch("/updateAdminUserById/:id", updateAdminUserById);
router.delete("/deleteAdminUserById/:id", deleteAdminUserById);
router.get("/getAllDataOfPatients", getAllDataOfPatients);

module.exports = router;
