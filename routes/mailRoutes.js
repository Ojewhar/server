const router = require("express").Router();
const verifyLogin = require("../utils/mails/verifyLogin");
const sendLoginLink = require("../utils/mails/sendLoginLink");
const sendEmailOnlyUser = require("../utils/mails/sendEmailOnlyUser");
const sendEmailAdminAndUser = require("../utils/mails/sendEmailAdminAndUser");
const sendCertificateActiveMail = require("../utils/mails/sendCertificateActiveMail");
const sendCertificateRejectMail = require("../utils/mails/sendCertificateRejectMail");
const sendMedicaleCertificateMail = require("../utils/mails/sendMedicaleCertificateMail");
const { authGuard } = require("../middlewares/tokenVerification");

// all mail routes
router.post("/verifyLogin", verifyLogin);
router.post("/sendCertificateActiveMail", sendCertificateActiveMail);
router.post("/sendCertificateRejectMail", authGuard, sendCertificateRejectMail);
router.post("/sendMedicaleCertificateMail", sendMedicaleCertificateMail);
router.post("/sendEmailOnlyUser", sendEmailOnlyUser);
router.post("/sendEmailAdminAndUser", sendEmailAdminAndUser);
router.post("/sendLoginLink", sendLoginLink);

module.exports = router;
