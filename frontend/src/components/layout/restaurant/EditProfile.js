import React, { useState, Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import {
  createProfile,
  getCurrentProfile,
} from "../../../actions/restaurantprofile";
import { uploadImageRestaurant } from "../../../actions/restaurantprofile";

const initialState = {
  name: "",
  location: "",
  description: "",
  images: "",
  email: "",
  ph_no: "",
  from_time: "",
  to_time: "",
  mode: "both",
};
const EditProfile = ({
  auth: { urole },
  restaurantprofile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
  uploadImageRestaurant,
}) => {
  const [formData, setFormData] = useState(initialState);
  const {
    name,
    email,
    location,
    description,
    ph_no,
    from_time,
    to_time,
    mode,
  } = formData;
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

  const onChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

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
    // fileInput.current.click();
  };

  // const editProfilePic = () => {
  //   fileInput.current.click();
  // };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", values.picFile);
    uploadImageRestaurant(formData, history);
  };

  return loading && urole === null ? (
    <Spinner />
  ) : !loading && urole === "restaurant" ? (
    <Fragment>
      <form className="form profile" onSubmit={(e) => onSubmit(e)}>
        <center>
          {" "}
          <h1 className="large text-primary">Edit Your Profile</h1>
        </center>
        <div className="form-group">
          <div>
            {/* /onClick={() => editProfilePic()} */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              ref={fileInput}
            />
            <img
              src={values.imagePreviewUrl}
              alt=""
              style={{ objectFit: "cover", width: "20%" }}
            />
          </div>
        </div>
        <input
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary my-1"
          style={{ background: "green", color: "white" }}
          value="Upload Image"
        />
        {/* <button onClick={handleSubmit} value="Submit" /> */}
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
        <div className="form-group">
          <select name="mode" onChange={(e) => onChange(e)}>
            <option value="0">
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </option>
            <option value="delivery">Delivery</option>
            <option value="pickup">Pickup</option>
            <option value="both">Both</option>
          </select>
        </div>
        <div className="form-group">
          <i className="fas fa-clock"> From &nbsp;</i>
          <input
            type="time"
            name="from_time"
            value={from_time}
            onChange={(e) => onChange(e)}
            min="1"
            max="24"
          />
        </div>
        <div className="form-group">
          <i className="fas fa-clock"> To &nbsp;</i>
          <input
            type="time"
            name="to_time"
            value={to_time}
            onChange={(e) => onChange(e)}
            min="1"
            max="24"
          />
        </div>
        {/*  */}
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
  ) : (
    <Fragment></Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  restaurantprofile: PropTypes.object.isRequired,
  uploadImageRestaurant: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  restaurantprofile: state.restaurantprofile,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  uploadImageRestaurant,
  createProfile,
  getCurrentProfile,
})(withRouter(EditProfile));
