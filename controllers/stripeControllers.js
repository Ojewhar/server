const stripe = require("stripe")(process.env.STRIPE_API_KEY);
const subscribeStipre = async (req, res) => {
  const { priceId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
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

module.exports = { cancelSubscribeStipe, subscribeStipre };
