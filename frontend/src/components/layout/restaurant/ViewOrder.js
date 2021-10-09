import React, { Fragment, useEffect } from "react";
import deliveryboy from "../img/deliveryboy.jpg";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

import {
  getCurrentProfile,
  updateDeliveryStatus,
} from "../../../actions/restaurantprofile";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
const ViewOrder = ({
  getCurrentProfile,
  updateDeliveryStatus,
  auth: { urole },
  restaurantprofile: { order, loading, dishesOfOrder },
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onChange = async (id, e) => {
    updateDeliveryStatus(id, e.target.value);
  };

  return loading && order === null ? (
    <Spinner />
  ) : (
    <Fragment>
      {order !== null && urole === "restaurant" ? (
        <>
          <nav>
            <img
              src={deliveryboy}
              alt=""
              style={{ width: "100%", height: "300px" }}
            />
            <h2>Order #{order[0].id}</h2>
            {order[0].type === "deliver" ? (
              <>
                <small style={{ color: "green" }}>
                  <select
                    name="status"
                    style={{ color: "green" }}
                    onChange={(e) => onChange(order[0].id, e)}
                  >
                    <option value="0">
                      {order[0].delivery_status.charAt(0).toUpperCase() +
                        order[0].delivery_status.slice(1)}
                    </option>
                    {order[0].delivery_status !== "cancelled" && (
                      <>
                        <option value="order received">Order received</option>
                        <option value="preparing">Preparing</option>
                        <option value="on the way">On the way</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancel</option>
                      </>
                    )}
                  </select>

                  <small style={{ color: "black" }}>
                    &nbsp;{new Date(order[0].date).toString()}
                  </small>
                </small>
              </>
            ) : (
              <>
                <small style={{ color: "green" }}>
                  <select
                    name="status"
                    style={{ color: "green" }}
                    onChange={(e) => onChange(order[0].id, e)}
                  >
                    <option value="0">
                      {" "}
                      {order[0].pickup_status.charAt(0).toUpperCase() +
                        order[0].pickup_status.slice(1)}
                    </option>
                    {order[0].pickup_status !== "cancelled" && (
                      <>
                        <option value="order received">Order Received</option>
                        <option value="preparing">Preparing</option>
                        <option value="pick up ready">Pick up ready</option>
                        <option value="pickedup">Pickedup</option>
                        <option value="cancelled">Cancel</option>
                      </>
                    )}
                  </select>

                  <small style={{ color: "black" }}>
                    &nbsp;{new Date(order[0].date).toString()}
                  </small>
                </small>
              </>
            )}
          </nav>
          <hr />
          <h2>Order Details</h2>
          <center>
            {dishesOfOrder &&
              dishesOfOrder.map((item) => {
                return (
                  <table style={{ width: "100%", height: "100%" }}>
                    <tbody>
                      <tr>
                        <td>
                          <span className="boxed">
                            {" "}
                            &nbsp;{item.count}&nbsp;
                          </span>
                          &nbsp;&nbsp; {item.name}
                        </td>
                        <td>${item.price}</td>
                      </tr>
                    </tbody>
                  </table>
                );
              })}
          </center>
          <br />
          <i className="fas fa-money-bill-wave-alt">
            &nbsp; Tip: ${order[0].tip}{" "}
          </i>
          <br />
          <i className="fa fa-calculator">&nbsp; Total: ${order[0].total}</i>
        </>
      ) : (
        <Fragment>
          <h1>
            {" "}
            No order selected/Not authorized to view this page.{" "}
            <Redirect to="/restaurant/orders">Orders</Redirect>
          </h1>
        </Fragment>
      )}
    </Fragment>
  );
};
ViewOrder.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  restaurantprofile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  updateDeliveryStatus: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  restaurantprofile: state.restaurantprofile,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  updateDeliveryStatus,
})(ViewOrder);
