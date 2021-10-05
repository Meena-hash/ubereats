/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./UserNavbar.css";
import {
  filterOnSearchString,
  filterOnDeliveryMode,
} from "../../actions/dashboard";
import { connect } from "react-redux";
const UserNavbar = ({ filterOnSearchString, filterOnDeliveryMode }) => {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("Both");
  const onChange = async (e) => {
    setSearch(e.target.value);
  };
  const onChangeCheck = async (e) => {
    if (e.target.checked) setMode("pickup");
    else if (!e.target.checked) setMode("delivery");
  };
  useEffect(() => {
    setSearch(search);
    filterOnSearchString(search);
  }, [search]);
  useEffect(() => {
    setMode(mode);
    filterOnDeliveryMode(mode);
  }, [mode]);
  return (
    <Fragment>
      <div className="unavbar">
        <div>
          <img
            src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
            alt=""
          ></img>
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <div class="switch-button">
          <input
            className="switch-button-checkbox"
            type="checkbox"
            // checked={mode}
            // name="mode"
            onChange={(e) => onChangeCheck(e)}
          ></input>
          <label className="switch-button-label" for="mode">
            <span className="switch-button-label-span">Delivery</span>
          </label>
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <button className="ButtonLink" style={{ color: "black" }}>
          &nbsp;&nbsp;
          <i className="fas fa-map-marker-alt" style={{ color: "black" }}></i>
          &nbsp; 201 W California Avenue &nbsp;&nbsp;&nbsp;
        </button>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <div class="form-group has-search">
          <span
            class="fa fa-search form-control-feedback"
            style={{ color: "black" }}
          >
            &nbsp; &nbsp; &nbsp;
          </span>
          <input
            type="text"
            class="form-control"
            placeholder="Search"
            name="search"
            onChange={(e) => onChange(e)}
            style={{ width: "400px" }}
          />
        </div>
        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
        <button
          className="ButtonLink"
          style={{
            backgroundColor: "black",
            borderRadius: "7px",
            float: "right",
            display: "flex",
            justifyContent: "flex-end",
            width: "fit-content",
            height: "35px",
          }}
        >
          &nbsp;&nbsp;
          <i
            className="fas fa-shopping-cart pull-right"
            style={{
              color: "white",
            }}
          >
            &nbsp;&nbsp; cart&nbsp;&nbsp;
          </i>
        </button>
      </div>
    </Fragment>
  );
};
UserNavbar.propTypes = {
  filterOnSearchString: PropTypes.func.isRequired,
  filterOnDeliveryMode: PropTypes.func.isRequired,
};

export default connect(null, {
  filterOnSearchString,
  filterOnDeliveryMode,
})(UserNavbar);
