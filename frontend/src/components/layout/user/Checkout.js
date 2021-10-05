import React, { Fragment } from "react";
import "./Checkout.css";
export const Checkout = () => {
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
                  &nbsp;&nbsp; Chicken Biriyani
                </td>
                <td>$88.00</td>
              </tr>
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
                  &nbsp;&nbsp; Veg Biriyani
                </td>
                <td>$88.00</td>
              </tr>
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
            <p className="text-muted">
              If you’re not around when the delivery person arrives, they’ll
              leave your order at the door. By placing your order, you agree to
              take full responsibility for it once it’s delivered.
            </p>
            <hr />
            <table style={{ width: "100%", border: "0" }}>
              <tr>
                <td>Subtotal</td>
                <td>$88.00</td>
              </tr>
              <tr>
                <td>Taxes and Fees</td>
                <td>$88.00</td>
              </tr>
              <tr>
                <td>Delivery Fee</td>
                <td>$88.00</td>
              </tr>
              <tr>
                <td>CA Driver Benefits</td>
                <td>Free shipping</td>
              </tr>

              <tr>
                <td>Add a tip</td>
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
                      >
                        &nbsp;&nbsp; $25&nbsp;&nbsp;
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
            <h4>Total: $88</h4>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
