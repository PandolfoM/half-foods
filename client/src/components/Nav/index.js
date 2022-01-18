import React, { useState } from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl
} from "react-bootstrap";

import logo from "../../assets/halffoods.svg";

function NavEL() {

  function Navigation() {
    if (Auth.loggedIn()) {
      return (
        <>
          <Nav.Item>
            <Link to="/orderHistory">Order History</Link>
          </Nav.Item>
          <Nav.Item>
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </Nav.Item>
        </>
      );
    } else {
      return (
        <>
          <Nav.Item>
            <Link to={"/login"}>Login</Link>
          </Nav.Item>
        </>
      );
    }
  }

  return (
    <>
      <Navbar bg="success" expand="lg">
        <Container fluid>
          <Navbar.Brand>
            <Link to={"/"}>
              <img
                src={logo}
                width="150"
                height="40"
                alt="Half Foods Logo"></img>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll>
              <Nav.Item>
                <Link to={"/"}>Browse Products</Link>
              </Nav.Item>
            </Nav>
            {Navigation()}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavEL;
