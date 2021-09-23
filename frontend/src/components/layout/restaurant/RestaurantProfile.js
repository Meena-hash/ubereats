import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../actions/restaurantprofile";
import Spinner from "../Spinner";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Dishes from "./Dishes";
import "./RestaurantProfile.css";
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
    <>
      <Fragment>
        {profile !== null ? (
          <Fragment>
            <div class="profilec">
              <div class="bottom-left">{user && user.name}</div>
              <div class="top-right">
                <a href="/restaurant/edit-profile">
                  <i class="fas fa-edit"></i>
                </a>
              </div>
            </div>
            <i class="fas fa-map-marker-alt"> {profile.location}</i>
            <br />
            <i class="fas fa-tag"> {profile.description}</i>
            <br />
            <i class="fas fa-phone-volume"> {profile.ph_no}</i>
            <br />
            <i class="fas fa-envelope-open"> {profile.email}</i>
            <Dishes />
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
      </Fragment>
    </>
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
