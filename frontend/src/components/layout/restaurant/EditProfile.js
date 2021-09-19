import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  createProfile,
  getCurrentProfile,
} from "../../../actions/restaurantprofile";
const initialState = {
  name: "",
  location: "",
  description: "",
  images: "",
  email: "",
  ph_no: "",
};
const EditProfile = ({
  restaurantprofile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState);
  const { name, email, location, description, ph_no } = formData;
  const [displayContactInformation, toggleContactInformation] = useState(false);
  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }

      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);
  const onChange = async (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <Fragment>
      <form className="form profile" onSubmit={(e) => onSubmit(e)}>
        <center>
          {" "}
          <h1 className="large text-primary">Edit Your Profile</h1>
        </center>
        <div className="form-group">
          <input
            type="text"
            placeholder="Restaurant Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        {/* <div className="form-group">
          <input type="text" placeholder="Timing" name="Timing" />
        </div> */}

        <div className="form-group">
          <textarea
            placeholder="A short description"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleContactInformation(!displayContactInformation)}
            type="button"
            className="btn btn-light"
          >
            Edit contact information
          </button>
        </div>
        {displayContactInformation && (
          <Fragment>
            <div className="form-group">
              <input
                type="text"
                placeholder="Phone Number"
                name="ph_no"
                value={ph_no}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <center>
          {" "}
          <input type="submit" className="btn btn-primary my-1" />
        </center>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  restaurantprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  restaurantprofile: state.restaurantprofile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
