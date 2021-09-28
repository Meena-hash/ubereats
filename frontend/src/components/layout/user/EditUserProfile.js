import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { getCurrentUser, editUserProfile } from "../../../actions/userprofile";
const initialState = {
  id: "",
  name: "",
  dob: "",
  street: "",
  city: "",
  state: "",
  country: "",
  nickname: "",
  about: "",
  email: "",
  ph_no: "",
};
const EditUserProfile = ({
  userprofile: { profile, loading },
  getCurrentUser,
  editUserProfile,
  auth: { urole },
  history,
}) => {
  const [formData, setFormData] = useState(initialState);
  const {
    name,
    dob,
    street,
    city,
    country,
    state,
    nickname,
    about,
    email,
    ph_no,
  } = formData;

  useEffect(() => {
    if (!profile) getCurrentUser();
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      setFormData(profileData);
    }
  }, [loading, getCurrentUser, profile]);
  const selectCountry = async (val) => {
    setFormData({ ...formData, country: val });
  };
  const selectRegion = async (val) => {
    setFormData({ ...formData, state: val });
  };
  const onChange = async (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    editUserProfile(formData, history);
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
            placeholder="User Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="date"
            id="birthday"
            name="dob"
            value={dob}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Street"
            name="street"
            value={street}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="City"
            name="city"
            value={city}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <CountryDropdown
            class="dropdown"
            value={country}
            onChange={(val) => selectCountry(val)}
          />
        </div>
        <div className="form-group">
          <RegionDropdown
            class="dropdown"
            country={country}
            value={state}
            onChange={(e) => selectRegion(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="NickName"
            name="nickname"
            value={nickname}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="textarea"
            placeholder="About"
            name="about"
            value={about}
            onChange={(e) => onChange(e)}
          />
        </div>
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

        <center>
          {" "}
          <input type="submit" className="btn btn-primary my-1" />
        </center>
      </form>
    </Fragment>
  );
};

EditUserProfile.propTypes = {
  editUserProfile: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  userprofile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  userprofile: state.userprofile,
});

export default connect(mapStateToProps, { getCurrentUser, editUserProfile })(
  withRouter(EditUserProfile)
);
