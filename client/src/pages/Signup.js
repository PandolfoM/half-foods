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
          <Link to="/login" id="createAccount">Login</Link>
        </Form.Group>
      </Form>
    </>
    // <div>
    //   <Link to="/login">← Go to Login</Link>

    //   <h2>Signup</h2>
    //   <form onSubmit={handleFormSubmit}>
    //     <div>
    //       <label htmlFor="firstName">First Name:</label>
    //       <input
    //         placeholder="First"
    //         name="firstName"
    //         type="firstName"
    //         id="firstName"
    //         autoComplete='on'
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="lastName">Last Name:</label>
    //       <input
    //         placeholder="Last"
    //         name="lastName"
    //         type="lastName"
    //         id="lastName"
    //         autoComplete='on'
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="email">Email:</label>
    //       <input
    //         placeholder="youremail@test.com"
    //         name="email"
    //         type="email"
    //         id="email"
    //         autoComplete='on'
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="pwd">Password:</label>
    //       <input
    //         placeholder="******"
    //         name="password"
    //         type="password"
    //         id="pwd"
    //         autoComplete='on'
    //         onChange={handleChange}
    //       />
    //     </div>
    //     <div>
    //       <button type="submit">Submit</button>
    //     </div>
    //   </form>
    // </div>
  );
}

export default Signup;
