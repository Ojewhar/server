const router = require("express").Router();
const {
  subscribeStipre,
  cancelSubscribeStipe,
} = require("../controllers/stripeControllers");

router.post("/subscribe-stripe", subscribeStipre);
router.post("/cancel-subscription", cancelSubscribeStipe);

module.exports = router;
