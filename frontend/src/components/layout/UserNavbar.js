/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import "./UserNavbar.css";
import {
  filterOnSearchString,
  filterOnDeliveryMode,
} from "../../actions/dashboard";
import { getItemsInCart } from "../../actions/cart";
import { connect } from "react-redux";
const UserNavbar = ({
  filterOnSearchString,
  filterOnDeliveryMode,
  cart: { restaurantname, loading, items, itemcount, cost },
}) => {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("Both");
  const onChange = async (e) => {
    setSearch(e.target.value);
  };
  const onChangeCheck = async (e) => {
    if (e.target.checked) setMode("pickup");
    else if (!e.target.checked) setMode("delivery");
  };
  // cart
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    setSearch(search);
    filterOnSearchString(search);
  }, [search]);

  useEffect(() => {
    setMode(mode);
    filterOnDeliveryMode(mode);
  }, [mode]);

  useEffect(() => {
    if (loading) {
      getItemsInCart();
    }
  }, [items]);
  return (
    <Fragment>
      <div className="unavbar">
        <img
          src="https://d1a3f4spazzrp4.cloudfront.net/arch-frontend/1.1.1/d1a3f4spazzrp4.cloudfront.net/eats/eats-logo-1a01872c77.svg"
          alt=""
        ></img>
        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
        <div class="switch-button">
          <input
            className="switch-button-checkbox"
            type="checkbox"
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
            textDecoration: "none",
          }}
        >
          &nbsp;&nbsp;
          <i
            className="fas fa-shopping-cart pull-right"
            style={{
              color: "white",
              textDecoration: "none",
            }}
            onClick={() => {
              handleShow();
            }}
          >
            &nbsp;&nbsp; cart - {itemcount}&nbsp;&nbsp;
          </i>
          {!loading && (
            <Fragment>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                  <Modal.Title>{restaurantname}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {items &&
                    items.map((item) => {
                      return (
                        <table
                          style={{
                            width: "100%",
                            border: "0",
                            tableLayout: "fixed",
                          }}
                        >
                          <tr>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                          </tr>
                        </table>
                      );
                    })}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button
                    variant="primary"
                    style={{
                      color: "white",
                      backgroundColor: "black",
                      width: "80%",
                    }}
                    onClick={{ handleClose }}
                  >
                    <Link
                      to="/user/checkout"
                      className="btn"
                      style={{
                        color: "white",
                        backgroundColor: "black",
                        width: "100%",
                      }}
                    >
                      Proceed to Checkout ${cost}
                    </Link>
                  </Button>
                </Modal.Footer>
              </Modal>
            </Fragment>
          )}
        </button>
      </div>
    </Fragment>
  );
};
UserNavbar.propTypes = {
  filterOnSearchString: PropTypes.func.isRequired,
  filterOnDeliveryMode: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  cart: state.cart,
});
export default connect(mapStateToProps, {
  filterOnSearchString,
  filterOnDeliveryMode,
})(UserNavbar);
