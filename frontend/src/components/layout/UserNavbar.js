import React, { Fragment } from "react";

import "./UserNavbar.css";
const UserNavbar = () => {
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
          <input class="switch-button-checkbox" type="checkbox"></input>
          <label class="switch-button-label" for="">
            <span class="switch-button-label-span">Delivery</span>
          </label>
        </div>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <button className="ButtonLink">
          &nbsp;&nbsp;
          <i class="fas fa-map-marker-alt" style={{ color: "black" }}>
            &nbsp; 201 W California Avenue &nbsp;&nbsp;&nbsp;
          </i>
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
            style={{ width: "400px" }}
          />
        </div>
        &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
        <button
          className="ButtonLink"
          style={{
            backgroundColor: "black",
            borderRadius: "5px",
            float: "right",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          &nbsp;&nbsp;
          <i
            className="fas fa-shopping-cart pull-right"
            style={{ color: "white" }}
          >
            &nbsp;&nbsp; cart&nbsp;&nbsp;
          </i>
        </button>
      </div>
    </Fragment>
  );
};

export default UserNavbar;
