const router = require("express").Router();
const { authGuard, restrict } = require("../middlewares/tokenVerification");

const {
  createFormOne,
  getAllFormData,
  getFormOneData,
  updateSinglePatientForm,
  calcuAllForm,
  deleteSinglePatientForm,
} = require("../controllers/formController");

// define routers
router.post("/createFormOne", createFormOne);
router.get("/getAllFormData", getAllFormData);
router.get("/calcuAllForm", calcuAllForm);
router.put(
  "/updateSinglePatient/:id",
  authGuard,
  restrict(["admin"]),
  updateSinglePatientForm
);
router.get("/getFormOne/:id", authGuard, getFormOneData); //(its already check authGurd From Frontend)
router.delete("/deletePatientForm/:id", authGuard, deleteSinglePatientForm); //(its already check authGurd From Frontend)

module.exports = router;
