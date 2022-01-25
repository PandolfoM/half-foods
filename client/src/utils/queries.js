import { gql } from "@apollo/client";

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID, $diet: ID) {
    products(category: $category, diet: $diet) {
      _id
      name
      aisle
      price
      quantity
      image
      category {
        _id
      }
      diet {
        _id
      }
    }
  }
`;
export const QUERY_PRODUCTS_NAME = gql`
  query getProductName($name: String) {
    products(name: $name) {
      _id
      name
      aisle
      price
      quantity
      image
      category {
        _id
        name
      }
      diet {
        _id
        name
      }
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
    products {
      _id
      name
      aisle
      price
      quantity
      category {
        name
      }
      diet {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_DIETS = gql`
  {
    diets {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          aisle
          price
          quantity
          image
        }
      }
    }
  }
`;
