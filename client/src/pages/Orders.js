import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col, Table } from "react-bootstrap";

function Orders() {
  const { data } = useQuery(QUERY_USER);
  let user;
  let number = 1;

  if (data) {
    user = data.user;
  }

  return (
    <>
      {user ? (
        <>
          <h2>Past Orders</h2>
          <Table striped bordered hover responsive="md">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Price</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {user.orders.map((order) => (
                <tr key={order._id}>
                  <td>{number++}</td>
                  <td>
                    {new Date(
                      parseInt(order.purchaseDate)
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    {order.products.map(({price}, index) => (
                      <p key={index}>${price}</p>
                    ))}
                  </td>
                  <td>
                    {order.products.map(({name}, index) => (
                      <p key={index}>{name}</p>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <h2>No past orders</h2>
      )}
    </>
  );
}

export default Orders;
