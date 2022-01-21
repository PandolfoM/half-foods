import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { QUERY_PRODUCTS } from "../../utils/queries";
import { UPDATE_PRODUCTS } from "../../utils/actions";

import { useDispatch, useSelector } from "react-redux";

import { Row } from "react-bootstrap";
import ProductItem from "../ProductItem";

function Products() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
    }
  }, [data, dispatch]);

  function filterItems() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      {state.products.length ? (
        <Row xs={1} md={6} className="m-5">
          {filterItems().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </Row>
      ) : (
        <h3>Sorry no products for you :(</h3>
      )}
      {/* {loading ? <img src={spinner} alt="loading" /> : null} */}
    </div>
  );
}

export default Products;
