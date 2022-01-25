import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import { Form, Button, Row, Container } from "react-bootstrap";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    console.log(formState);
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    console.log(formState);
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <>
      <Form id="loginForm" onSubmit={handleFormSubmit}>
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
        {error ? (
          <Form.Text>
            <p>The provided credentials are incorrect</p>
          </Form.Text>
        ) : null}
        <Form.Group>
          <Container>
          <Row>
          <Button variant="outline-success" type="submit">
            Login
          </Button>
          </Row>
          </Container>
          <Link to="/signup" id="createAccount">Create Account</Link>
        </Form.Group>
      </Form>
    </>
  );
}

export default Login;
