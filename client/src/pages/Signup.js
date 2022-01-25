import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Form, Button, Row, Container } from "react-bootstrap";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <Form id="signupForm" onSubmit={handleFormSubmit}>
        <Form.Group>
          <Form.Label htmlFor="firstName">First Name:</Form.Label>
          <Form.Control
            name="firstName"
            id="firstName"
            type="firstName"
            placeholder="John"
            autoComplete="on"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="lastName">Last Name:</Form.Label>
          <Form.Control
            name="lastName"
            id="lastName"
            type="lastName"
            placeholder="Wick"
            autoComplete="on"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="email">Email address:</Form.Label>
          <Form.Control
            name="email"
            id="email"
            type="email"
            placeholder="Email"
            autoComplete="on"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="password">Password:</Form.Label>
          <Form.Control
            name="password"
            id="password"
            type="password"
            placeholder="Password"
            autoComplete="on"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">Shhhhh</Form.Text>
        </Form.Group>
        <Form.Group>
          <Container>
          <Row>
          <Button variant="outline-success" type="submit">
            Signup
          </Button>
          </Row>
          </Container>
          <Link to="/login" id="loginAcc">Login</Link>
        </Form.Group>
      </Form>
    </>
  );
}

export default Signup;
