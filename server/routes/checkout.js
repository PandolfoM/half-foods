const express = require("express");
const router = express.Router();
const braintree = require("braintree");

router.post("/", (req, res, next) => {
  const gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: "hs5cvgjmt4hpfrxp",
    publicKey: "w2mfh93vd8dyz9fy",
    privateKey: "9df844e1119a31e0072656e677faf6c5",
  });

  const nonceFromTheClient = req.body.paymentMethodNonce;
  const total = req.body.totalPrice;

  const newTransaction = gateway.transaction.sale(
    {
      amount: total,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        submitForSettlement: true,
      },
    },
    (error, result) => {
      if (result.success) {
        res.send(result);
      } else {
        console.error(result.errors);
      }
    }
  );
});

module.exports = router;
