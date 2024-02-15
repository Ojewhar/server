const { BASE_URL_CLIENT } = require("../config/base-url");

const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const certnowPaymentStripe = async (req, res) => {
  const storeItems = new Map([
    [1, { priceInCent: 4990, name: "Medical Certificate" }], // this is in cents
    // [2, { priceInCent: 4000, name: "Online Prescription" }],
  ]);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCent,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${BASE_URL_CLIENT}`,
      cancel_url: `${BASE_URL_CLIENT}/form`,
    });

    res.status(200).json(session);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// Create a route for canceling a subscription
const cancelSubscribeStipe = async (req, res) => {
  const { subscriptionId } = req.body;

  try {
    const canceledSubscription = await stripe.subscriptions.del(subscriptionId);

    // You can handle the response or send a success message
    res.json(canceledSubscription);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { cancelSubscribeStipe, certnowPaymentStripe };
