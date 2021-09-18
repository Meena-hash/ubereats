import React from "react";
const Footer = () => {
  return (
    <footer>
      <nav>
        <div className="container-fluid">
          <h1 className="copyright">
            <a className="footerref" href="/">
              &nbsp;&nbsp; © 2020 Uber Technologies, Inc.
            </a>
          </h1>
        </div>

        <div className="container-fluid">
          <h1 className="policy">
            <a
              href="https://www.uber.com/legal/privacy/users/en/"
              className="footerref"
            >
              Privacy Policy{" "}
            </a>
            &nbsp;| &nbsp;
            <a
              href="https://www.uber.com/legal/terms/us/"
              className="footerref"
            >
              Terms of Use
            </a>
          </h1>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
