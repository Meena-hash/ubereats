import React, { Fragment } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/restaurantauth";
const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href="/">
          <i className="fas fa-sign-out-alt"></i>
          {""}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <i className="fas fa-user"></i>
        <Link to="/register">
          <span className="hide-sm">Signup</span>{" "}
        </Link>
      </li>
      <li>
        <i className="fas fa-user"></i>
        <Link to="/login">
          <span className="hide-sm">Login</span>{" "}
        </Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <a href="/">
          Uber <span className="uber">Eats</span>
        </a>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Navbar);
