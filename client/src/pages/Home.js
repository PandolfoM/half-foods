import React, { useState } from "react";
import { Form, Row, Col, Card, Button } from "react-bootstrap";

function Home() {
  const [searchedFood, setSearchedFood] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <Form onSubmit={handleFormSubmit} className="m-3">
        <Form.Group>
          <Form.Control
            placeholder="Search"
            aria-label="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </Form.Group>
      </Form>
      <h2 className="mx-5">{searchedFood.length ? `${searchedFood.length} results:` : null}</h2>
      <Row xs={1} md={6} className="m-5">
        {searchedFood.map((food) => {
         return (<Col key={food.foodId}>
            <Card>
              {food.foodImage ? (
                <Card.Img
                  variant="top"
                  className="p-3"
                  src={`https://spoonacular.com/cdn/ingredients_250x250/${food.foodImage}`}
                  alt={food.foodName}
                  width={'75px'}
                  height={'160px'}
                />
              ) : null}
              <Card.Body>
                <Card.Title>{food.foodName[0].toUpperCase()+ food.foodName.substring(1)}</Card.Title>
                <Button className="w-100 mb-1" variant="outline-success">View Item</Button>
                <Button className="w-100" variant="outline-success">Add to Cart</Button>
              </Card.Body>
            </Card>
          </Col>)
        })}
      </Row>
    </div>
  );
}

export default Home;
