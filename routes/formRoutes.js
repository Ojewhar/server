const router = require("express").Router();
const { authGuard } = require("../middlewares/tokenVerification");

const {
  createFormOne,
  getFormOneData,
} = require("../controllers/formController");

// define routers
router.post("/createFormOne", createFormOne);
router.get("/getFormOne", authGuard, getFormOneData); //(its already check authGurd From Frontend)

module.exports = router;
