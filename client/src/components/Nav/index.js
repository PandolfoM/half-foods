import React from "react";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";

// import logo from "../../assets/halffoods.svg"

function Nav() {
  function Navigation() {
    if (Auth.loggedIn()) {
      return (
        <ul>
          <li>
            <Link to="/orderHistory">Order History</Link>
          </li>
          <li>
            <a href="/" onClick={() => Auth.logout()}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      );
    }
  }

  return (
    <header>
      <h1>
        <Link to={"/"}>
          {/* <img src={logo} className="halfFoodsLogo" alt="Half Foods Logo"/> */}
          Half Foods
        </Link>
      </h1>

      <nav>{Navigation()}</nav>
    </header>
  );
}

export default Nav;
