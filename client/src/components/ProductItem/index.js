import React from "react";
import { Col, Card, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";
import Details from "../Details";

function ProductItem(item) {
  const { image, name, _id, price, quantity, aisle } = item;
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { cart } = state;

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

  return (
    <Col className="mb-2">
      <Card>
        <Container>
          <Card.Img variant="top" src={`/img/${image}`} height={"160px"} />
        </Container>
        <Card.Body>
          <Details
            _id={_id}
            image={image}
            name={name}
            price={price}
            quantity={quantity}
            aisle={aisle}
          />
          <Card.Text>{quantity} in stock</Card.Text>
          <Card.Text>${price}</Card.Text>
          <Button
            variant="success"
            style={{ width: "100%" }}
            onClick={addToCart}>
            Add to Cart
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductItem;
