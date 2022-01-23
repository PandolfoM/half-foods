const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Category {
    _id: ID
    name: String
  }

  type Diet {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    aisle: Int
    image: String
    quantity: Int
    price: Float
    category: Category
    diet: Diet
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    categories: [Category]
    diets: [Diet]
    products(category: ID, diet: ID, name: String): [Product]
    product(_id: ID!): Product
    user: User
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    addOrder(products: [ID]!): Order
    updateUser(
      firstName: String
      lastName: String
      email: String
      password: String
    ): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }

  type Checkout {
    session: ID
  }
`;

module.exports = typeDefs;
