const router = require("express").Router();
const { authGuard } = require("../middlewares/tokenVerification");

const {
  createFormOne,
  getFormOneData,
  createConsultation,
  getConsultation,
} = require("../controllers/formController");

// define routers
router.post("/createFormOne", createFormOne);
router.get("/getFormOne", authGuard, getFormOneData); //(its already check authGurd From Frontend)

// UpDocFormConsultation Form Route
// router.post("/createConsultation", createConsultation);
// router.get("/getConsultation", tokenVerification, getConsultation);

module.exports = router;
