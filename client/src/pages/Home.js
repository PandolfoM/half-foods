import React from "react";
import { Carousel, Container } from "react-bootstrap";

function Home() {
  return (
    <>
      <h1>Welcome to Half Foods!</h1>
      <Container>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img/carousel/meat.jpg"
              height="500px"
              alt="First slide"
            />
            <Carousel.Caption>
              <h5>Farm raised animals</h5>
              <p>All of our meats are from grass fed animals.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img/carousel/freshProduce.jpg"
              height="500px"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h5>Freshly picked produce</h5>
              <p>Our produce is locally grown and picked when good for eating.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/img/carousel/bakery.jpg"
              height="500px"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5>Fresh baked goods everyday</h5>
              <p>
                We bake all of out delicious goods right in store everyday.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
}

export default Home;
