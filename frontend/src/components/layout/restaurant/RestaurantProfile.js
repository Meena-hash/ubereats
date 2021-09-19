import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../actions/restaurantprofile";
import RestaurantActions from "./RestaurantActions";
import Spinner from "../Spinner";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const RestaurantProfile = ({
  getCurrentProfile,
  auth: { user },
  restaurantprofile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <center>
        <h1 class="large text-primary">Profile</h1>
        <br />
        <p class="lead">
          <i class="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
          <Fragment>
            <br />
            <table>
              <tr>
                <td>Name</td>
                <td>{profile.name}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{profile.location}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>{profile.description}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{profile.ph_no}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{profile.email}</td>
              </tr>
            </table>
            <br />
            <Link to="/restaurant/edit-profile">
              <i class="fas fa-user-circle text-primary"></i> Edit Profile
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <br />
            <p>You have not yet setup profile, please add some info</p>
            <br />
            <Link to="/restaurant/create-profile">
              <i class="fas fa-user-circle text-primary"></i> Create Profile
            </Link>
          </Fragment>
        )}
      </center>
    </Fragment>
  );
};

RestaurantProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  restaurantprofile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  restaurantprofile: state.restaurantprofile,
});

export default connect(mapStateToProps, { getCurrentProfile })(
  RestaurantProfile
);
