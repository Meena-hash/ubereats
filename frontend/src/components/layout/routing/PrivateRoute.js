import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading, urole },
  role,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/restaurant/login/"></Redirect>
      ) : role === "both" || urole === role ? (
        <Component {...props} />
      ) : (
        <Fragment>Not allowed to access</Fragment>
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);
