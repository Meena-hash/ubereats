import React, { Fragment, useEffect, useState } from "react";
import { getCurrentUser } from "../../../actions/userprofile";
import PropTypes from "prop-types";
import "./Checkout.css";
import { connect } from "react-redux";
const Checkout = ({
  getCurrentUser,
  auth: { user },
  userprofile: { profile },
  cart: { restaurantname, loading, items, itemcount, cost },
}) => {
  useEffect(() => {
    if (!user) getCurrentUser();
  }, []);
  const [tip, setTip] = useState(0);
  const [total, setTotal] = useState(0);
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
            <p className="checkoutp">
              <address>
                <i class="fas fa-map-pin"></i> {profile && profile.street}{" "}
                <i class="fas fa-user-edit" style={{ color: "black" }}></i>
                <br />
                {profile && profile.city}
                <br />
                {profile && profile.state}
                <br />
                {profile && profile.country}
              </address>
            </p>
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
    </Fragment>
  );
};

Checkout.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  userprofile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  cart: state.cart,
  userprofile: state.userprofile,
});

export default connect(mapStateToProps, {
  getCurrentUser,
})(Checkout);
