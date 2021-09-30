import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../../actions/restaurantprofile";
import Spinner from "../Spinner";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Dishes from "./Dishes";
import "./RestaurantProfile.css";
import { uploadImageRestaurant } from "../../../actions/restaurantprofile";

const RestaurantProfile = ({
  getCurrentProfile,
  auth: { user, urole },
  restaurantprofile: { profile, loading },
  uploadImageRestaurant,
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
            {!loading && urole === "restaurant" && (
              <div
                className="profilec"
                style={{ backgroundImage: `url(${profile.images})` }}
              >
                <div className="bottom-left">{user && user.name}</div>
                <div className="top-right">
                  <a href="/restaurant/edit-profile">
                    <i className="fas fa-edit"></i>
                  </a>
                </div>
              </div>
            )}
            <i className="fas fa-clock">
              {" "}
              Open everyday from {profile.from_time} to {profile.to_time}
            </i>
            <br />
            <i className="fas fa-map-marker-alt"> {profile.location}</i>
            <br />
            <i className="fas fa-tag"> {profile.description}</i>
            <br />
            <i className="fas fa-phone-volume"> {profile.ph_no}</i>
            <br />
            <i className="fas fa-envelope-open"> {profile.email}</i>
            <Dishes />
          </Fragment>
        ) : (
          <Fragment>
            <br />
            <p>Profile is not set up yet.</p>
            <br />
            {!loading && urole === "restaurant" && (
              <Link to="/restaurant/create-profile">
                <i className="fas fa-user-circle text-primary"></i> Create
                Profile
              </Link>
            )}
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
  uploadImageRestaurant: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  restaurantprofile: state.restaurantprofile,
});

export default connect(mapStateToProps, {
  uploadImageRestaurant,
  getCurrentProfile,
})(RestaurantProfile);
