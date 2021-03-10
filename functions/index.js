const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51ISkP9AyPAdg9bprRNLauMvVFFmW73t9FXLFYCbrkdPI6BLBcJoGeCqmyImY18vzoaVPRgzXDd1M2Xy1ZtJfhgJH00ROFe1C3Z"
);

// API

// app config
const app = express();

//middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// DB config

// api routes
app.get("/", (req, res) => res.status(200).send("hello world"));
app.post("/payments/create", async (req, res) => {
  const total = request.query.total;

  console.log("Payment request receive", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, //subunits of the currency 
    currency: "usd",
  });
  //OK created
  res.status(201).send({
      clientSecret: paymentIntent.client_secret, 
  })
});

// listen
exports.api = functions.https.onRequest(app);
