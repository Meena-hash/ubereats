import React, { Fragment } from "react";

const Spinner = () => (
  <Fragment>
    <i
      className="fa fa-circle-o-notch fa-spin"
      style={{ margin: "auto", width: "500px", display: "block" }}
    />
  </Fragment>
);

export default Spinner;
