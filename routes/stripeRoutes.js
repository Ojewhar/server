const router = require("express").Router();
const {
  cancelSubscribeStipe,
  certnowPaymentStripe,
} = require("../controllers/stripeControllers");
const { authGuard } = require("../middlewares/tokenVerification");

router.post("/certnowPaymentStripe", authGuard, certnowPaymentStripe);
router.post("/cancel-subscription", cancelSubscribeStipe);

module.exports = router;
