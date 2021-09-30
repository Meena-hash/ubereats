import React, { Fragment, useEffect } from "react";
import "./UserProfile.css";
import { getUserByID } from "../../../actions/userprofile";
import { getCurrentUser } from "../../../actions/userprofile";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import { getCurrentProfile } from "../../../actions/restaurantprofile";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
const UserProfile = ({
  getCurrentUser,
  getUserByID,
  auth: { user, urole },
  userprofile: { loading, profile },
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentUser();
    if (!loading && urole && urole === "user") getCurrentUser();
    else if (urole === "restaurant") {
      getCurrentProfile();
      if (loading && profile === null) {
        <Link to="/restaurant/orders"></Link>;
      }
    }
    if (!loading && user && urole && urole === "user") getUserByID(user.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return loading && profile === null ? (
    <>
      <Spinner />
      <Redirect to={"/restaurant/orders"} delay={2000} />
    </>
  ) : (
    <>
      <div className="container emp-profile">
        <form>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                  alt=""
                />{" "}
                <hr />
                {urole && urole === "user" && (
                  <div>
                    <i class="fas fa-edit" style={{ color: "black" }}></i>
                    {/* <input type="file" name="file" /> */}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{profile.name}</h5>
                <h6>{profile.ph_no}</h6>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {urole && urole === "user" && (
              <div className="col-md-2">
                <div>
                  <a href="/user/edit/profile">
                    <i className="fas fa-edit" style={{ color: "black" }}>
                      Edit Profile
                    </i>
                  </a>
                  {/* <input type="file" name="file" /> */}
                </div>
              </div>
            )}
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="profile-work">
                {/* <p>WORK LINK</p> */}
                <i class="fas fa-heart"> Favourites</i>
                <br />
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>User Id</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profile.profileid}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profile.name}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>DOB</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profile.dob}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>City</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profile.city}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Street</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profile.street}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>State</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profile.state}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Country</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profile.country}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>NickName</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profile.nickname}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profile.email}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profile.ph_no}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>Student</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>About</label>
                    </div>
                    <div className="col-md-6">
                      <p>{profile.about}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
UserProfile.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  getUserByID: PropTypes.func.isRequired,
  userprofile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  userprofile: state.userprofile,
  restaurantprofile: state.restaurantprofile,
});

export default connect(mapStateToProps, {
  getUserByID,
  getCurrentUser,
  getCurrentProfile,
})(UserProfile);