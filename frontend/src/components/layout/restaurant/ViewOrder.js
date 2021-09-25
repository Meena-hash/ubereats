import React, { Fragment, useEffect } from "react";
import orderimg from "../img/orderimg.jpeg";
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
      {order !== null ? (
        <>
          <nav>
            <img
              src={orderimg}
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
                    <option value="0">{order[0].delivery_status}</option>
                    <option value="received">Order Received</option>
                    <option value="preparing">Preparing</option>
                    <option value="otw">On the way</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancel</option>
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
                    <option value="0">{order[0].pickup_status}</option>
                    <option value="received">Order Received</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Pick Up Ready</option>
                    <option value="pickedup">PickedUp</option>
                    <option value="cancelled">Cancel</option>
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
            No order selected.{" "}
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
  updateDeliveryStatus: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  restaurantprofile: state.restaurantprofile,
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  updateDeliveryStatus,
})(ViewOrder);
