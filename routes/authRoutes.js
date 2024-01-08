const router = require("express").Router();
const {
  addPersonInfo,
  getAllPersonsInfo,
} = require("../controllers/authControllers");
const { authGuard } = require("../middlewares/tokenVerification");
const sendLoginLink = require("../utils/mails/sendLoginLink");
const verifyLogin = require("../utils/mails/verifyLogin");

// define routers
router.post("/addPersonInfo", addPersonInfo);
router.get("/getAllPersonsInfo", authGuard, getAllPersonsInfo);
router.post("/verifyLogin", verifyLogin);
router.post("/sendLoginLink", sendLoginLink);

module.exports = router;
