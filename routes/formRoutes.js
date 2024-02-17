const router = require("express").Router();
const { authGuard, restrict } = require("../middlewares/tokenVerification");

const {
  createFormOne,
  getAllFormData,
  getFormOneData,
  updateSinglePatientForm,
} = require("../controllers/formController");

// define routers
router.post("/createFormOne", createFormOne);
router.get("/getAllFormData", getAllFormData);
router.put(
  "/updateSinglePatient/:id",
  authGuard,
  restrict(["admin"]),
  updateSinglePatientForm
);
router.get("/getFormOne/:id", authGuard, getFormOneData); //(its already check authGurd From Frontend)

module.exports = router;
