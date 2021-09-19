import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import avatar from "./avatar.png";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./Navbar.css";
import { Row, Col } from "react-bootstrap";
const Navbar = ({ auth: { isAuthenticated, loading } }) => {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const guestLinks = <ul></ul>;
  const authData = (
    <>
      <div className="navbar">
        <Link to="#" className="menu-bars"></Link>
        <FaIcons.FaBars onClick={showSidebar} />
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
              <img src={avatar} alt="Avatar" class="avatar" />
            </Col>
            <Row>
              <Col xs="2">Meena</Col>
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
        </ul>
      </nav>
    </>
  );
  return (
    <Fragment>
      {!loading && (
        <Fragment>{isAuthenticated ? authData : guestLinks}</Fragment>
      )}
    </Fragment>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(Navbar);
