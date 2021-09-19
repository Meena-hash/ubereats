import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { setAlert } from "../../../actions/alert";
import { register } from "../../../actions/restaurantauth";
import PropTypes from "prop-types";

const RRegister = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    password: "",
    password2: "",
  });
  const { name, email, location, password, password2 } = formData;
  const onChange = async (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register(name, email, password, location);
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/restaurant/profile"> </Redirect>;
  }
  return (
    <Fragment>
      <div className="centered">
        <center>
          {" "}
          <img
            src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
            alt=""
          ></img>
        </center>
        <br />
        <h4>Welcome Back</h4>
        <p>Enter Your Details To Sign Up</p>

        <form className="form" onSubmit={(e) => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={location}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={(e) => onChange(e)}
              minLength="6"
            />
          </div>
          <input
            type="submit"
            className="btn btn-primary signup"
            value="Register"
          />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/restaurant/login">Sign In</Link>
        </p>
      </div>
    </Fragment>
  );
};
RRegister.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(RRegister);
