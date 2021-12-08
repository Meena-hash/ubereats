import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import { useMutation } from "@apollo/client";
import { login } from "../../../actions/userauth";
import PropTypes from "prop-types";
import { USER_LOGIN_SUCCESS } from "../../../actions/types";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../mutation/mutation";
import { useQuery } from "@apollo/client";
import { getUser } from "../../../queries/queries";
import { USER_LOADED } from "../../../actions/types";
const ULogin = ({ login, isAuthenticated }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = async (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  let [mutationResponse] = useMutation(loginUser, {
    variables: {
      email: email,
      password: password,
    },
  });

  const { data } = useQuery(getUser, {
    variables: {
      userid: "617738bec5e438dafecc2242",
    },
  });
  // const userinfo = useLazyQuery(getUser);
  const onSubmit = async (e) => {
    e.preventDefault();
    const response = mutationResponse();
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: (await response).data.login,
    });
    dispatch({
      type: USER_LOADED,
      payload: data,
    });
    // login(email, password);
  };
  if (isAuthenticated) {
    return <Redirect to="/user/dashboard"> </Redirect>;
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
        <p>Sign in with your email address</p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
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
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              minLength="6"
            />
          </div>

          <input
            type="submit"
            className="btn btn-primary login"
            value="Login"
          />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/user/register">Sign Up</Link>
        </p>
      </div>
    </Fragment>
  );
};

ULogin.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(ULogin);
