import React from "react";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { useDispatch } from "react-redux";
import { Row, Col, InputGroup, FormControl, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { idbPromise } from "../../utils/helpers";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const onChange = (e) => {
    const value = e.target.value;

    if (value === "0") {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      idbPromise("cart", "delete", { ...item });
    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: item._id,
        purchaseQuantity: parseInt(value),
      });
      idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });
    }
  };

  const removeFromCart = (item) => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  return (
    <Row>
      <Col xs={5} sm={4} md={4} lg={7}>
        <img
          src={`/img/${item.image}`}
          alt=""
          style={{ width: "75px", height: "75px" }}
        />
      </Col>
      <Col>
        <div>
          {item.name}, ${item.price}
        </div>
        <div>
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Qty</InputGroup.Text>
            <FormControl
              type="number"
              placeholder="1"
              value={item.purchaseQuantity}
              onChange={onChange}
            />
            <span id="trashcan">
              <FontAwesomeIcon
                onClick={() => removeFromCart(item)}
                icon={faTrash}
              />
            </span>
          </InputGroup>
        </div>
      </Col>
    </Row>
  );
};

export default CartItem;
