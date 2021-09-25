import React, { useEffect, useState } from "react";
import "./Orders.css";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Spinner from "../Spinner";
import {
  getCurrentProfile,
  getAllOrdersByRestaurant,
  viewOrder,
} from "../../../actions/restaurantprofile";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Orders = ({
  getCurrentProfile,
  getAllOrdersByRestaurant,
  restaurantprofile: { orders, loading },
  viewOrder,
  history,
}) => {
  const [orderData, setOrderData] = useState(orders);
  useEffect(() => {
    getAllOrdersByRestaurant();
    getCurrentProfile();
  }, [getCurrentProfile, getAllOrdersByRestaurant]);
  return loading && orders === null ? (
    <Spinner />
  ) : (
    <div>
      <nav>
        <h1>Orders</h1>
      </nav>
      <hr />
      <>
        <>
          <div className="navbar order">
            <i
              className="fas fa-check-circle navorder"
              onClick={() => {
                orders && setOrderData(orders);
              }}
            >
              All
            </i>{" "}
            <i
              className="fas fa-check-circle navorder"
              onClick={() => {
                orders &&
                  setOrderData(
                    orders.filter((item) => item.order_type === "new")
                  );
              }}
            >
              New
            </i>{" "}
            <i
              className="fas fa-truck navorder"
              onClick={() => {
                orders &&
                  setOrderData(
                    orders.filter((item) => item.order_type === "delivered")
                  );
              }}
            >
              Delivered
            </i>
            <i
              className="fas fa-ban navorder"
              onClick={() => {
                orders &&
                  setOrderData(
                    orders.filter((item) => item.order_type === "cancelled")
                  );
              }}
            >
              Cancelled
            </i>
          </div>
          {orderData &&
            orderData.map((item) => {
              return (
                <>
                  <br />
                  <hr />
                  <div className="list-group">
                    <div className="list-group-item list-group-item-action flex-column align-items-start">
                      <h4>{item["user_profile.name"]}</h4>
                      <div className="d-flex w-100 justify-content-between">
                        <h5>OrderId:{item.id}</h5>
                        <small className="text-muted">
                          {" "}
                          <i
                            className="fas fa-edit"
                            style={{ color: "black" }}
                            onClick={() => viewOrder(item.id, history)}
                          ></i>
                        </small>
                      </div>
                      <p class="mb-1">Date: {item.date}</p>
                      <small className="text-muted">Total: {item.total}$</small>
                      <br />
                      <small className="text-muted">Tip: {item.tip}$</small>
                    </div>
                  </div>
                </>
              );
            })}
        </>
      </>
    </div>
  );
};
Orders.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getAllOrdersByRestaurant: PropTypes.func.isRequired,
  restaurantprofile: PropTypes.object.isRequired,
  viewOrder: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  restaurantprofile: state.restaurantprofile,
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  getAllOrdersByRestaurant,
  viewOrder,
})(withRouter(Orders));
