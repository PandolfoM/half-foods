import React from "react";
import { Link } from "react-router-dom";
import { Col, Card, Button } from "react-bootstrap";

function ProductItem(item) {
  const { image, name, _id, price, quantity } = item;

  return (
    <Col className="mb-2">
      <Card>
        <Card.Img variant="top" src={`/img/${image}`} height={"180px"} />
        <Card.Body>
          <Link to={`/products/${_id}`}>
            <Card.Title>{name}</Card.Title>
          </Link>
          <Card.Text>{quantity} in stock</Card.Text>
          <Card.Text>${price}</Card.Text>
          <Button variant="success" style={{width: '100%'}}>Add to Cart</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductItem;
