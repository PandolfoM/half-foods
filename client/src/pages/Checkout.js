import React, { useEffect } from "react";
import dropin from "braintree-web-drop-in";
import { Button } from "react-bootstrap";

function Checkout() {
  
  useEffect(() => {
    const pay = document.getElementById("pay");
    dropin
      .create({
        authorization: "sandbox_5rzw5pbd_hs5cvgjmt4hpfrxp",
        container: "#checkout",
      })
      .then((instance) => {
        pay.addEventListener("click", function () {
          instance.requestPaymentMethod(function (
            requestPaymentMethod,
            payload
          ) {
            console.log(payload);
          });
        });
      });
  }, []);

  return (
    <>
      <div id="checkout"></div>
      <Button id="pay">Pay</Button>
    </>
  );
}

export default Checkout;
