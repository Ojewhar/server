const router = require("express").Router();
const verifyLogin = require("../utils/mails/verifyLogin");
const sendLoginLink = require("../utils/mails/sendLoginLink");
const sendEmailOnlyUser = require("../utils/mails/sendEmailOnlyUser");
const sendEmailAdminAndUser = require("../utils/mails/sendEmailAdminAndUser");

// all mail routes
router.post("/verifyLogin", verifyLogin);
router.post("/sendEmailOnlyUser", sendEmailOnlyUser);
router.post("/sendEmailAdminAndUser", sendEmailAdminAndUser);
router.post("/sendLoginLink", sendLoginLink);

module.exports = router;
