// const express = require("express");
// const { default: mongoose } = require("mongoose");
// const User = require("../models/User");
// const Company = require("../models/Company");
// const Machine = require("../models/Machine");
// const router = express.Router();

// router.post(
//   "/webhook",
//   express.raw({ type: "application/json" }),
//   async (req, res) => {
//     // Verify the event using your Stripe webhook signing secret
//     const stripeSignature = req.headers["stripe-signature"];
//     const session = await mongoose.startSession();
//     try {
//       session.startTransaction();
//       const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
//       const webhookEvent = stripe.webhooks.constructEvent(
//         req.body,
//         stripeSignature,
//         process.env.STRIPE_WEBSOCKET_SIGNING_KEY
//       );

//       const handleSubscription = async () => {
//         const paymentLink = webhookEvent.data.object?.payment_link;

//         const company = await Machine.findOne({
//           "subscriptionAwaiting.stripe_payment_link": paymentLink,
//         });
//         if (!company)
//           return console.error(
//             "User subscription created but not found in own DB"
//           );
//         company.subscription = { ...company.subscriptionAwaiting };
//         company.subscription.paid = true;
//         company.subscription.id = webhookEvent.data.object?.subscription;
//         company.subscription.product = webhookEvent.data.object?.subscription;
//         company.markModified("subscription");

//         await company.save();

//         // Update your application's database or perform other actions
//         await stripe.paymentLinks.update(paymentLink, { active: false });
//         await stripe.prices.update(company.subscription.stripe_price_id, {
//           active: false,
//         });
//       };

//       const handleDeleteSubscription = async () => {
//         console.log(webhookEvent);
//         const subscriptionId = webhookEvent.data.object?.id;

//         console.log(subscriptionId);

//         const company = await Machine.findOne({
//           "subscription.id": subscriptionId,
//         });
//         if (!company)
//           return console.error(
//             "User subscription cancelled but not found in own DB"
//           );
//         company.subscription = undefined;
//         company.markModified("subscription");

//         await company.save();
//       };

//       // Handle the payment event
//       console.log(webhookEvent.type);
//       if (webhookEvent.type === "checkout.session.completed") {
//         if (webhookEvent.data.object?.mode === "subscription")
//           await handleSubscription();
//         // else await handlePayment();
//       } else if (webhookEvent.type === "customer.subscription.deleted") {
//         handleDeleteSubscription();
//       }
//       await session.commitTransaction();
//     } catch (err) {
//       await session.abortTransaction();
//       console.error("Error handling webhook event:", err);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     return res.sendStatus(200);
//   }
// );

// module.exports = router;
