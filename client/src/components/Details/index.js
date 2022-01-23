import React, { useState } from "react";
import { Button, Offcanvas, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
} from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

function Details(item) {
  const { image, name, _id, price, quantity, aisle, diet } = item;
  const [show, setShow] = useState(false);

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { cart } = state;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise("cart", "put", {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 },
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: _id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  return (
    <>
      <strong className="productName" onClick={handleShow}>
        {name}
      </strong>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Container>
            <Row className="justify-content-md-center">
              <img
                className="justify-content-md-center"
                src={`/img/${image}`}
                alt={name}
                style={{ height: "12rem", width: "15rem" }}></img>
            </Row>
            <Row className="m-2">
              <span className="p-0">
                <strong>Price: </strong>
                {price}
              </span>
            </Row>
            <Row className="m-2">
              <span className="p-0">
                <strong>Stock: </strong>
                {quantity}
              </span>
            </Row>
            {aisle ? (
              <Row className="m-2">
                <span className="p-0">
                  <strong>Aisle: </strong>
                  {aisle}
                </span>
              </Row>
            ) : null}
            <Row className="m-2">
              <Button variant="success" onClick={addToCart}>
                Add to Cart
              </Button>
            </Row>
            <Row className="m-2">
              <Button
                variant="outline-danger"
                disabled={!cart.find((p) => p._id === _id)}
                onClick={removeFromCart}>
                Remove from Cart
              </Button>
            </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Details;
