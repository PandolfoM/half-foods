import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import NavEL from "./components/Nav";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Stores from "./pages/Stores";

import { Provider } from "react-redux";
import store from "./utils/store";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Provider store={store}>
          <div>
            <NavEL />
            <Switch>
              <Route exact path="/products" component={Home} />
              <Route exact path="/stores" component={Stores} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/checkout" component={Checkout} />
              <Route exact path="/success" component={Success} />
            </Switch>
          </div>
        </Provider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
