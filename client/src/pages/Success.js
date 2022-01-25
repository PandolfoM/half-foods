import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ADD_ORDER } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        productData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
      }
    }
    saveOrder();
  }, [addOrder]);

  function getTime(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <>
      <h1>Success!</h1>
      <p>
        Thank you for your purchase! Your items should be ready in{" "}
        {getTime(15, 30)} - {getTime(31, 45)} minutes.
      </p>
      <p>
        When you arrive at the store please make your way to the courtesy desk
        and tell them the name of your order.
      </p>
    </>
  );
}

export default Success;
