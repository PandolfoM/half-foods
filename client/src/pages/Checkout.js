import React, { useEffect } from "react";
import dropin from "braintree-web-drop-in";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import jQuery from "jquery";

function Checkout() {
  const state = useSelector((state) => state);

  useEffect(() => {
    const pay = document.getElementById("pay");
    dropin
      .create({
        authorization: "sandbox_5rzw5pbd_hs5cvgjmt4hpfrxp",
        container: "#checkout",
        paypal: {
          flow: "vault",
        },
      })
      .then((instance) => {
        console.log(calculateTotal());
        pay.addEventListener("click", (event) => {
          event.preventDefault();
          instance
            .requestPaymentMethod()
            .then((payload) => {
              jQuery.ajax({
                type: "POST",
                url: "/checkout",
                data: ({
                  paymentMethodNonce: payload.nonce, 
                  totalPrice: calculateTotal()
                }),
              });
            })
            .catch((err) => {
              throw err;
            });
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  function calculateTotal() {
    let sum = 0

    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });

    return sum.toFixed(2);
  }

  return (
    <div id="checkoutDiv">
      <h4>Total: ${calculateTotal()}</h4>
      <div id="checkout"></div>
      <Button variant="outline-success" id="pay">
        Pay
      </Button>
      <input type={"hidden"} id="payment_method_nonce"></input>
    </div>
  );
}

export default Checkout;
