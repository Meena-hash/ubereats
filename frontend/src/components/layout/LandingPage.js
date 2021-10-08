import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import { Button } from "react-bootstrap";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <center>
        <b>
          {" "}
          <h1 style={{ color: "black", fontSize: "50px" }}>
            Order breakfast, lunch, and dinner.
          </h1>
        </b>

        <br />
        <br />

        <Button
          className="user-button"
          style={{
            backgroundColor: "black",
            borderRadius: "40px",
            width: "25%",
          }}
        >
          {" "}
          <Link to="user/login">
            {" "}
            <h5 style={{ color: "white" }}>I am a user</h5>
          </Link>
        </Button>
        <br />
        <Button
          className="user-button"
          style={{
            backgroundColor: "black",
            borderRadius: "40px",
            width: "25%",
          }}
        >
          {" "}
          <Link to="restaurant/login">
            {" "}
            <h5 style={{ color: "white" }}>I own a business</h5>
          </Link>
        </Button>
      </center>
    </div>
  );
};

export default LandingPage;
