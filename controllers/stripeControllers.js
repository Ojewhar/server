const { BASE_URL_CLIENT } = require("../config/base-url");
const UpDocFormOne = require("../models/UpDocFormOne");

const stripe = require("stripe")(process.env.STRIPE_API_KEY);
// const certnowPaymentStripe = async (req, res) => {
//   const storeItems = new Map([
//     [1, { priceInCent: 2900, name: "Medical Certificate" }], // this is in cents
//     // [2, { priceInCent: 4000, name: "Online Prescription" }],
//   ]);
//   try {
//     const { id } = req.params;
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       line_items: req.body.items.map((item) => {
//         const storeItem = storeItems.get(item.id);
//         return {
//           price_data: {
//             currency: "aud",
//             product_data: {
//               name: storeItem.name,
//             },
//             unit_amount: storeItem.priceInCent,
//           },
//           quantity: item.quantity,
//         };
//       }),
//       success_url: `${BASE_URL_CLIENT}/dashboard/patient/${id}`,
//       cancel_url: `${BASE_URL_CLIENT}/dashboard/patient`,
//     });

//     console.log(session);
//     const formOne = await UpDocFormOne.findById(id);
//     formOne.payment = {
//       id: session.id,
//       price: session.amount_total,
//       method: session.payment_method_types,
//       status: session.payment_status,
//     };
//     await formOne.save();

//     res.status(200).json(session);
//   } catch (error) {
//     res.status(500).send("Internal Server Error");
//     console.log(error);
//   }
// };
// Endpoint to handle successful payment redirect
const certnowPaymentStripe = async (req, res) => {
  const storeItems = new Map([
    [1, { priceInCent: 2900, name: "Medical Certificate" }],
  ]);
  try {
    const { id } = req.params;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "aud",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCent,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${BASE_URL_CLIENT}/dashboard/patient/${id}?payment_status=success`,
      cancel_url: `${BASE_URL_CLIENT}/dashboard/patient/${id}?payment_status=failed`,
    });

    const formOne = await UpDocFormOne.findById(id);
    formOne.payment = {
      id: session.id,
      price: session.amount_total,
      method: session.payment_method_types,
      status: session.payment_status,
    };
    await formOne.save();
    res.status(200).json({ session: session });
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
  }
};

const handlePaymentSuccess = async (req, res) => {
  try {
    const { sessionId, paymentStatus } = req.body;

    if (paymentStatus === "success") {
      const formOne = await UpDocFormOne.findByIdAndUpdate(
        sessionId,
        {
          $set: {
            ...req.body,
            "payment.status": "paid",
          },
        },
        { new: true }
      );

      await formOne.save();
      res
        .status(200)
        .json({ form: formOne, message: "Payment completed successfully." });
    } else {
      res.status(500).send({ message: "Payment was not successful." });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

// Webhook endpoint to listen for Stripe events
const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    // Find the corresponding document in your database based on session id or any other identifier
    const formOne = await UpDocFormOne.findOne({ "payment.id": session.id });
    if (formOne) {
      // Update payment status in your database
      formOne.payment_status = "completed"; // Update payment status according to your schema
      await formOne.save();
    }
  }

  res.status(200).json({ received: true });
};

module.exports = {
  handleStripeWebhook,
  certnowPaymentStripe,
  handlePaymentSuccess,
};
