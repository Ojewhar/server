const router = require("express").Router();
const {
  handleStripeWebhook,
  certnowPaymentStripe,
  handlePaymentSuccess,
} = require("../controllers/stripeControllers");
const { authGuard } = require("../middlewares/tokenVerification");

router.post("/certnowPaymentStripe/:id", authGuard, certnowPaymentStripe);
router.post("/handlePaymentSuccess", authGuard, handlePaymentSuccess);
router.post("/handleStripeWebhook", authGuard, handleStripeWebhook);

module.exports = router;
