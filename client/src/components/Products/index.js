import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";

import { QUERY_PRODUCTS } from "../../utils/queries";
import { UPDATE_PRODUCTS } from "../../utils/actions";

import { useDispatch, useSelector } from "react-redux";

import { idbPromise } from "../../utils/helpers";
import { Row, Spinner } from "react-bootstrap";
import ProductItem from "../ProductItem";

function Products() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const { currentCategory, currentDiet } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise("products", "put", product);
      });
    }
  }, [data, dispatch]);

  function filterCategory() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) =>
        product.category._id === currentCategory
    );
  }

  function filterDiet() {
    if (!currentDiet) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.diet._id === currentDiet
    );
  }

  return (
    <div>
      {state.products.length ? (
        <Row xs={1} md={6} className="m-5">
          {currentCategory ? (
            <>
              {filterCategory().map((product) => (
                <ProductItem
                  key={product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  aisle={product.aisle}
                />
              ))}
            </>
          ) : (
            <>
              {filterDiet().map((product) => (
                <ProductItem
                  key={product._id}
                  _id={product._id}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  quantity={product.quantity}
                  aisle={product.aisle}
                />
              ))}
            </>
          )}
        </Row>
      ) : (
        <h3>Sorry no products for you :(</h3>
      )}
      {loading ? <Spinner animation="border" variant="success" /> : null}
    </div>
  );
}

export default Products;
