import React, { Fragment } from "react";

const Spinner = () => (
  <Fragment>
    <p>
      {" "}
      <i
        className="fa fa-circle-o-notch fa-spin"
        style={{ margin: "auto", width: "500px", display: "block" }}
      />
    </p>
  </Fragment>
);

export default Spinner;
