const router = require("express").Router();
const { authGuard } = require("../middlewares/tokenVerification");

const {
  createFormOne,
  getFormOneData,
  getAllFormData,
} = require("../controllers/formController");

// define routers
router.post("/createFormOne", createFormOne);
router.get("/getAllFormData", getAllFormData);
router.get("/getFormOne", getFormOneData); //(its already check authGurd From Frontend)

module.exports = router;
