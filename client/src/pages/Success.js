import React from "react";

function Success() {

  function getTime(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  return (
    <>
      <h1>Success!</h1>
      <p>Thank you for your purchase! Your items should be ready in {getTime(15, 30)} - {getTime(31, 45)} minutes.</p>
      <p>When you arrive at the store please make your way to the courtesy desk and tell them the name of your order.</p>
    </>
  );
}

export default Success;
