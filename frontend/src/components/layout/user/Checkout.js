import React, { Fragment, useEffect, useState } from "react";
import { getCurrentUser } from "../../../actions/userprofile";
import PropTypes from "prop-types";
import "./Checkout.css";
import { connect } from "react-redux";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import { Button, Modal } from "react-bootstrap";
import { addDeliveryAddress } from "../../../actions/checkout";
import { placeOrder } from "../../../actions/checkout";

const Checkout = ({
  getCurrentUser,
  addDeliveryAddress,
  placeOrder,
  auth: { user },
  userprofile: { profile },
  history,
  cart: { restaurantname, restaurantid, loading, items, cost },
  deliveryAddresses: { addresses },
}) => {
  useEffect(() => {
    if (!user) getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [tip, setTip] = useState(0);
  const [total, setTotal] = useState(0);
  const [deliveryAddr, setDeliveryAddr] = useState(addresses);
  const [currDeliveryAddr, setCurrDeliveryAddr] = useState("");
  const [show, setShow] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);

  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");

  const selectCountry = (val) => {
    setCountry(val);
  };

  const selectRegion = (val) => {
    setRegion(val);
  };

  const onCityChange = (val) => {
    setCity(val.target.value);
  };

  const onStreetChange = (val) => {
    setStreet(val.target.value);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  const addAddrHandleClose = () => {
    setShowAddAddressModal(false);
  };
  const addAddrHandleShow = () => {
    setShowAddAddressModal(true);
  };
  const onAddressChange = (index) => {
    setCurrDeliveryAddr(addresses[index]);
    handleClose();
  };

  const addAddress = (street, city, state, country) => {
    addDeliveryAddress(street, city, state, country);
    addAddrHandleClose();
    selectCountry("");
    selectRegion("");
    setCity("");
    setStreet("");
  };

  const submitOrder = () => {
    let orderFields = {};
    orderFields.restaurant_id_order = restaurantid;
    orderFields.type = sessionStorage.getItem("deliveryMode")
      ? sessionStorage.getItem("deliveryMode")
      : "delivery";
    alert(orderFields.type);
    orderFields.tip = tip;
    orderFields.total = total;
    orderFields.delivery_address =
      currDeliveryAddr.street +
      "," +
      currDeliveryAddr.city +
      "," +
      currDeliveryAddr.state +
      "," +
      currDeliveryAddr.country;
    placeOrder(orderFields, items, history);
  };
  useEffect(() => {
    if (profile)
      setCurrDeliveryAddr({
        street: profile.street,
        city: profile.city,
        country: profile.country,
        state: profile.state,
      });
  }, [profile]);
  useEffect(() => {
    setDeliveryAddr(addresses);
  }, [addresses, show]);
  useEffect(() => {
    if (cost)
      setTotal(Number(cost) + Number(tip) + Number(0.1 * cost) + Number(15));
  }, [cost, tip]);

  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row checkout">
          <div className="column col-md-6" style={{ backgroundColor: "white" }}>
            <p className="checkoutp">
              <b>
                {" "}
                <i class="fas fa-money-bill-wave"></i>&nbsp;&nbsp;Uber Cash:
                $0.00
              </b>
            </p>
            <hr />
            <i
              class="fas fa-user-plus"
              style={{
                color: "black",
                textDecoration: "none",
              }}
              onClick={() => {
                addAddrHandleShow();
              }}
            ></i>
            <p className="checkoutp">
              <address>
                <i class="fas fa-map-pin"></i>{" "}
                {currDeliveryAddr && currDeliveryAddr.street}{" "}
                <i
                  class="fas fa-user-edit"
                  style={{
                    color: "black",
                    textDecoration: "none",
                  }}
                  onClick={() => {
                    handleShow();
                  }}
                ></i>
                &nbsp;&nbsp;
                <br />
                {currDeliveryAddr && currDeliveryAddr.city}
                <br />
                {currDeliveryAddr && currDeliveryAddr.state}
                <br />
                {currDeliveryAddr && currDeliveryAddr.country}
              </address>
            </p>

            {!loading &&
              deliveryAddr &&
              show &&
              addresses &&
              deliveryAddr.length > 0 && (
                <Fragment>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                      <Modal.Title>Your saved addresses</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      {!loading &&
                        deliveryAddr &&
                        deliveryAddr.map((item, index) => {
                          return (
                            <Button
                              style={{
                                color: "black",
                                backgroundColor: "white",
                                width: "100%",
                              }}
                              onClick={() => onAddressChange(index)}
                            >
                              <p>
                                {" "}
                                <>
                                  <address>
                                    <i>
                                      {item && item.street}
                                      <br />
                                      {item && item.city}
                                      <br />
                                      {item && item.state}
                                      <br />
                                      {item && item.country}
                                    </i>{" "}
                                  </address>
                                  <hr />
                                </>
                              </p>
                            </Button>
                          );
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Fragment>
              )}
            <hr />
            <p className="checkoutp">
              <b>
                <i class="fas fa-tag"></i> &nbsp;&nbsp;Add Promo Code
              </b>
            </p>
            <hr />
            <table style={{ width: "100%", border: "0" }}>
              <tr>
                <td>Your Items</td>
                <td>
                  {" "}
                  <button
                    style={{
                      width: "fit-content",
                      color: "black",
                      backgroundColor: "white",
                      border: "none",
                      borderRadius: "15px",
                    }}
                  >
                    {" "}
                    <i class="fas fa-plus">
                      &nbsp;&nbsp; Add Items&nbsp;&nbsp;
                    </i>
                  </button>
                </td>
              </tr>
              {items &&
                items.map((item) => {
                  return (
                    <tr>
                      <td>
                        <select id="cars">
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="1" selected>
                            1
                          </option>
                        </select>
                        &nbsp;&nbsp; {item.name}
                      </td>
                      <td>${item.price}</td>
                    </tr>
                  );
                })}

              <br />
              <br />
              <tr>
                <td>Request Utensils, straws, etc.</td>
                <td>
                  <input
                    type="checkbox"
                    id="utensils"
                    name="utensils"
                    value="utensils"
                  />
                </td>
              </tr>
            </table>
            <br />
            <input
              type="text"
              placeholder="Add a note for the restaurant"
              style={{ width: "100%", height: "40px" }}
            />
          </div>

          <div
            className="column col-md-4"
            style={{ backgroundColor: "whitesmoke" }}
          >
            <input
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", height: "50px" }}
              value="Place Order"
              disabled={items === null}
              onClick={() => submitOrder()}
            />
            <br />
            <p className="text-muted wrappara">
              If you’re not around when the delivery person arrives, they’ll
              leave your order at the door. By placing your order, you agree to
              take full responsibility for it once it’s delivered.
            </p>
            <hr />
            <table style={{ width: "100%", border: "0" }}>
              <tr>
                <td>Subtotal</td>
                <td>${cost}</td>
              </tr>
              <tr>
                <td>Taxes and Fees</td>
                <td>${0.1 * cost}</td>
              </tr>

              <tr>
                <td>Delivery Fee</td>
                <td>$15</td>
              </tr>

              {/* <tr>
                <td>CA Driver Benefits</td>
                <td>Free shipping</td>
              </tr> */}

              <tr>
                <td>Add a tip</td>
                <td> {tip}</td>
                <td>
                  <div class="row">
                    <div className="col-md-3">
                      <button
                        style={{
                          width: "fit-content",
                          color: "white",
                          backgroundColor: "black",
                          borderRadius: "10px",
                        }}
                        onClick={() => setTip(25)}
                      >
                        &nbsp;&nbsp; $25&nbsp;&nbsp;
                      </button>
                    </div>
                    <div className="col-md-3">
                      <button
                        style={{
                          width: "fit-content",
                          color: "white",
                          backgroundColor: "black",
                          borderRadius: "10px",
                        }}
                        onClick={() => setTip(10)}
                      >
                        &nbsp;&nbsp; $10&nbsp;&nbsp;
                      </button>
                    </div>
                    <div className="col-md-3">
                      <button
                        style={{
                          width: "fit-content",
                          color: "white",
                          backgroundColor: "black",
                          borderRadius: "10px",
                        }}
                        onClick={() => setTip(5)}
                      >
                        &nbsp;&nbsp; $5&nbsp;&nbsp;
                      </button>
                    </div>
                    <div className="col-md-3">
                      <button
                        style={{
                          width: "fit-content",
                          color: "white",
                          backgroundColor: "black",
                          borderRadius: "10px",
                        }}
                        onClick={() => setTip(3)}
                      >
                        &nbsp;&nbsp; $3 &nbsp;&nbsp;
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
            <p className="text-muted">
              Delivery people are critical to our communities at this time. Add
              a tip to say thanks.
            </p>
            <hr />
            <h4>Total: ${total}</h4>
          </div>
        </div>
      </div>
      {!loading && showAddAddressModal && (
        <Fragment>
          <Modal show={showAddAddressModal} onHide={addAddrHandleClose}>
            <Modal.Header>
              <Modal.Title>Delivery details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="text"
                placeholder="Street"
                style={{ width: "100%", height: "35px" }}
                name="street"
                defaultValue={street}
                onChange={(val) => onStreetChange(val)}
              ></input>
              <br />
              <br />
              <input
                type="text"
                placeholder="City"
                style={{ width: "100%", height: "35px" }}
                name="city"
                defaultValue={city}
                onChange={(val) => onCityChange(val)}
              ></input>
              <br />
              <br />
              <CountryDropdown
                style={{ width: "100%", height: "35px" }}
                class="dropdown"
                value={country}
                onChange={(val) => selectCountry(val)}
              />
              <br />
              <br />
              <RegionDropdown
                style={{ width: "100%", height: "35px" }}
                class="dropdown"
                country={country}
                value={region}
                onChange={(val) => selectRegion(val)}
              />
              <br />
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                style={{
                  color: "white",
                  backgroundColor: "black",
                  width: "80%",
                }}
                onClick={() => {
                  addAddress(street, city, region, country);
                }}
              >
                Save
              </Button>
              <Button variant="secondary" onClick={addAddrHandleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </Fragment>
      )}
    </Fragment>
  );
};

Checkout.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  userprofile: PropTypes.object.isRequired,
  deliveryAddress: PropTypes.object.isRequired,
  addDeliveryAddress: PropTypes.func.isRequired,
  placeOrder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart,
  userprofile: state.userprofile,
  deliveryAddresses: state.deliveryAddress,
});

export default connect(mapStateToProps, {
  getCurrentUser,
  addDeliveryAddress,
  placeOrder,
})(Checkout);
