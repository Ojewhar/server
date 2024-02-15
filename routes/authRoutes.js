const router = require("express").Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  deleteUserById,
  updateUserById,
} = require("../controllers/authControllers");
const { authGuard } = require("../middlewares/tokenVerification");

// define routers
router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.get("/getAllUsers", getAllUsers);
router.delete("/deleteUserById/:id", authGuard, deleteUserById);
router.put("/updateUserById/:id", authGuard, updateUserById);

module.exports = router;
