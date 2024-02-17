const router = require("express").Router();
const {
  createUser,
  loginUser,
  getAllUsers,
  deleteUserById,
  updateUserById,
  getASingleUser,
  verifyLogin,
} = require("../controllers/authControllers");
const { authGuard, restrict } = require("../middlewares/tokenVerification");

// define routers
router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.get("/getAllUsers", authGuard, restrict(["admin"]), getAllUsers);
router.get("/getASingleUser", authGuard, getASingleUser);
router.delete("/deleteUserById/:id", authGuard, deleteUserById);
router.put("/updateUserById/:id", authGuard, updateUserById);

module.exports = router;
