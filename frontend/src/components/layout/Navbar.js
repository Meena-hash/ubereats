import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import avatar from "./avatar.png";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { SidebarUserData } from "./SidebarUserData";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Navbar.css";
import { Row, Col } from "react-bootstrap";
import { logout } from "../../actions/restaurantauth";
import { logoutUser } from "../../actions/userauth";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import UserNavbar from "./UserNavbar";

const Navbar = ({
  auth: { isAuthenticated, loading, user, urole },
  logout,
  logoutUser,
  history,
}) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const [imageurl, setImageUrl] = useState(
    "https://res.cloudinary.com/meena273/image/upload/v1632983730/images/u0kagcear0u1pziltwwr.jpg"
  );
  const guestLinks = <ul></ul>;
  const authData = (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars"></Link>
        <FaIcons.FaBars className="icons" onClick={showSidebar} />
        <div className="header">
          <img
            src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
            alt=""
          ></img>
        </div>
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose
                style={{ color: "black" }}
                onClick={showSidebar}
              ></AiIcons.AiOutlineClose>
            </Link>
          </li>
          <div style={{ marginLeft: "2rem" }}>
            <Col xs="2">
              <img
                src={user && user.picture ? user.picture : imageurl}
                alt="Avatar"
                className="avatar"
              />
            </Col>
            <Row>
              <Col xs="2">{user && user.name}</Col>
            </Row>
            <Row>
              <Col cs="2">
                <Link to="/restaurant/profile">
                  <button
                    style={{
                      background: "white",
                      border: "none",
                      color: "green",
                      padding: "0px",
                    }}
                  >
                    View Account
                  </button>
                </Link>
              </Col>
            </Row>
          </div>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
          <li className="nav-text">
            {/* later replace with dashboard */}

            <i
              style={{ color: "black" }}
              className="fas fa-sign-out-alt"
              onClick={() => logout(history)}
            ></i>
            {""}
            <span style={{ color: "black" }} className="hide-sm">
              Logout
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
  const authUserData = (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars"></Link>
        <FaIcons.FaBars className="icons" onClick={showSidebar} />
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <UserNavbar />
      </div>

      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items">
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <AiIcons.AiOutlineClose
                style={{ color: "black" }}
                onClick={showSidebar}
              ></AiIcons.AiOutlineClose>
            </Link>
          </li>
          <br />
          <br />
          <div style={{ marginLeft: "2rem" }}>
            <Col xs="2">
              <img
                src={user && user.picture ? user.picture : imageurl}
                alt="Avatar"
                className="avatar"
              />
            </Col>
            <Row>
              <Col xs="2">{user && user.name}</Col>
            </Row>
            <Row>
              <Col cs="2">
                <Link to="/user/profile">
                  <button
                    style={{
                      background: "white",
                      border: "none",
                      color: "green",
                      padding: "0px",
                    }}
                  >
                    View Account
                  </button>
                </Link>
              </Col>
            </Row>
          </div>
          {SidebarUserData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
          <li className="nav-text">
            {/* later replace with dashboard */}

            <i
              style={{ color: "black" }}
              className="fas fa-sign-out-alt"
              onClick={() => logoutUser(history)}
            ></i>
            {""}
            <span style={{ color: "black" }} className="hide-sm">
              Logout
            </span>
          </li>
        </ul>
      </nav>
    </>
  );
  return (
    <Fragment>
      {!loading && (
        <Fragment>
          {isAuthenticated
            ? urole === "restaurant"
              ? authData
              : authUserData
            : guestLinks}
        </Fragment>
      )}
    </Fragment>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout, logoutUser })(
  withRouter(Navbar)
);
