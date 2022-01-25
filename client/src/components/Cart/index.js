import React, { useEffect } from "react";
import Auth from "../../utils/auth";
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from "../../utils/actions";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../CartItem";
import { idbPromise } from "../../utils/helpers";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Container } from "react-bootstrap";

const Cart = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise("cart", "get");
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  const toggleCart = () => {
    dispatch({ type: TOGGLE_CART });
  };

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart} style={{color: 'white'}}>
        <FontAwesomeIcon icon={faShoppingCart} size="lg"/>
        <span>Cart</span>
      </div>
    );
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });

    return sum.toFixed(2);
  }

  return (
    <Modal show={toggleCart} onHide={toggleCart} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {state.cart.length ? (
          <Container>
            {state.cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </Container>
        ) : (
          <h3>No items in cart</h3>
        )}
      </Modal.Body>
      {state.cart.length ? (
        <Modal.Footer>
          {!Auth.loggedIn() ? (
            <>
              <Link
                onClick={toggleCart}
                to={"/login"}
                style={{ color: "#0007", cursor: "pointer" }}>
                (Login to checkout)
              </Link>
              <strong>Total: ${calculateTotal()}</strong>
            </>
          ) : (
            <>
              <strong>Total: ${calculateTotal()}</strong>
              <Button variant="success" onClick={toggleCart}><Link to={'/checkout'}>Checkout</Link></Button>
              <Button variant="danger" onClick={toggleCart}>
                Close
              </Button>
            </>
          )}
        </Modal.Footer>
      ) : null}
    </Modal>
  );
};

export default Cart;
