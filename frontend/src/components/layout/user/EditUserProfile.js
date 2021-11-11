import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { getCurrentUser, editUserProfile } from "../../../actions/userprofile";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
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
  // image
  const [values, setValues] = useState({
    imagePreviewUrl: formData.images,
    picFile: null,
  });

  let fileInput = React.createRef();

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let inFile = e.target.files[0];
    reader.onloadend = () => {
      setValues({ ...values, picFile: inFile, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(inFile);
  };

  const selectCountry = async (val) => {
    setFormData({ ...formData, country: val });
  };
  const selectRegion = async (val) => {
    setFormData({ ...formData, state: val });
  };
  const selectPh = async (val) => {
    setFormData({ ...formData, ph_no: val });
  };
  const onChange = async (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("image", values.picFile);
    editUserProfile(formData, imageData, history);
  };
  return urole === "user" ? (
    <Fragment>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <center> </center>
        <div className="form-group">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInput}
            />
            <img
              src={values.imagePreviewUrl}
              alt=""
              style={{ objectFit: "cover", width: "10%" }}
            />
          </div>
        </div>
        <div className="form-group">
          <label>
            <h4>
              <b>Name:</b>
            </h4>
          </label>
          <input
            type="text"
            placeholder="User Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label>
            <h4>
              <b>DOB:</b>
            </h4>
          </label>
          <input
            type="date"
            id="birthday"
            name="dob"
            value={dob}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label>
            <h4>
              <b>Street:</b>
            </h4>
          </label>
          <input
            type="text"
            placeholder="Street"
            name="street"
            value={street}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label>
            <h4>
              <b>City:</b>
            </h4>
          </label>
          <input
            type="text"
            placeholder="City"
            name="city"
            value={city}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label>
            <h4>
              <b>Country:</b>
            </h4>
          </label>
          <CountryDropdown
            class="dropdown"
            value={country}
            onChange={(val) => selectCountry(val)}
          />
        </div>
        <div className="form-group">
          <label>
            <h4>
              <b>Region:</b>
            </h4>
          </label>
          <RegionDropdown
            class="dropdown"
            country={country}
            value={state}
            onChange={(e) => selectRegion(e)}
          />
        </div>
        <div className="form-group">
          <label>
            <h4>
              <b>Contact Number:</b>
            </h4>
          </label>
          <PhoneInput
            countrySelectProps={{ unicodeFlags: true }}
            placeholder="Enter phone number"
            value={ph_no}
            onChange={(val) => selectPh(val)}
          />
        </div>
        <div className="form-group">
          <label>
            <h4>
              <b>Nickname:</b>
            </h4>
          </label>
          <input
            type="text"
            placeholder="NickName"
            name="nickname"
            value={nickname}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <label>
            <h4>
              <b>Tell us about yourself:</b>
            </h4>
          </label>
          <input
            type="text"
            placeholder="About"
            name="about"
            value={about}
            onChange={(e) => onChange(e)}
          />
        </div>

        <div className="form-group">
          <label>
            <h4>
              <b>Email:</b>
            </h4>
          </label>
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
        <br></br>
        <br></br>
      </form>
    </Fragment>
  ) : (
    <Fragment>Not allowed to access</Fragment>
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
