/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import { getCurrentUser } from "../../actions/userprofile";
import { editCart } from "../../actions/cart";
import { deleteItemCart } from "../../actions/cart";
import "./UserNavbar.css";
import {
  filterOnSearchString,
  filterOnDeliveryMode,
} from "../../actions/dashboard";
import { getItemsInCart } from "../../actions/cart";
import { connect } from "react-redux";
const UserNavbar = ({
  getCurrentUser,
  filterOnSearchString,
  filterOnDeliveryMode,
  editCart,
  deleteItemCart,
  cart: { restaurantname, loading, items, itemcount, cost },
  userprofile: { profile },
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
  // Edit cart
  const onChangeItemCount = async (val, item) => {
    item[val.target.name] = val.target.value;
    editCart(item.id, item.count);
  };
  const deleteItem = (item) => {
    deleteItemCart(item.id);
  };

  useEffect(() => {
    if (!profile) getCurrentUser();
  }, []);

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
        <button
          className="ButtonLink"
          style={{
            color: "black",
            width: "fit-content",
          }}
        >
          &nbsp;&nbsp;
          <i className="fas fa-map-marker-alt" style={{ color: "black" }}></i>
          &nbsp; {profile && profile.city + "," + profile.state}{" "}
          &nbsp;&nbsp;&nbsp;
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
                            border: "none",
                            tableLayout: "fixed",
                          }}
                        >
                          <tr>
                            {/* show a button here. Add an action to get item by id and increment count, change price */}

                            <td
                              style={{
                                width: "70%",
                              }}
                            >
                              <input
                                type="number"
                                placeholder={item.count}
                                name="count"
                                min="1"
                                max="10"
                                defaultValue={item.count}
                                key={item.count}
                                onChange={(val) => onChangeItemCount(val, item)}
                                style={{
                                  borderRadius: "3px",
                                  textAlign: "center",
                                }}
                              />
                              &nbsp; X &nbsp;
                              {item.name}
                            </td>
                            <td
                              style={{
                                width: "20%",
                              }}
                            >
                              ${item.calprice}
                            </td>
                            <td
                              style={{
                                width: "10%",
                              }}
                            >
                              <i
                                className="fas fa-trash "
                                style={{ color: "black" }}
                                onClick={() => deleteItem(item)}
                              ></i>
                            </td>
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
                      Proceed to Checkout ${Number(cost).toFixed(2)}
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
  userprofile: PropTypes.object.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  editCart: PropTypes.func.isRequired,
  deleteItemCart: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  cart: state.cart,
  userprofile: state.userprofile,
});
export default connect(mapStateToProps, {
  filterOnSearchString,
  filterOnDeliveryMode,
  editCart,
  deleteItemCart,
  getCurrentUser,
})(UserNavbar);
