import React, { Fragment, useEffect, useState } from "react";
import "./Orders.css";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import Spinner from "../Spinner";
import {
  getCurrentProfile,
  getAllOrdersByRestaurant,
  viewOrder,
} from "../../../actions/restaurantprofile";
import { getUserByID } from "../../../actions/userprofile";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Orders = ({
  getCurrentProfile,
  getAllOrdersByRestaurant,
  restaurantprofile: { orders, loading },
  auth: { urole },
  viewOrder,
  getUserByID,
  history,
}) => {
  const [orderData, setOrderData] = useState(orders);
  const [filter, setFilter] = useState("All Orders");
  useEffect(() => {
    if (!orders) {
      getAllOrdersByRestaurant();
      getCurrentProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setOrderData(orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);
  return loading && orders === null ? (
    <Spinner />
  ) : !loading && orders && urole === "restaurant" ? (
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
              onClick={(e) => {
                e.preventDefault();
                orders && setOrderData(orders);
                setFilter("All Orders");
              }}
            >
              {" "}
              All
            </i>
            <i
              className="fas fa-cart-plus navorder"
              onClick={(e) => {
                e.preventDefault();
                orders &&
                  setOrderData(
                    orders.filter((item) => item.order_type === "new")
                  );
                setFilter("New Orders");
              }}
            >
              New
            </i>

            <i
              className="fas fa-truck navorder"
              onClick={(e) => {
                e.preventDefault();
                orders &&
                  setOrderData(
                    orders.filter((item) => item.order_type === "delivered")
                  );
                setFilter("Delivered Orders");
              }}
            >
              Delivered
            </i>

            <i
              className="fas fa-ban navorder"
              onClick={(e) => {
                e.preventDefault();
                orders &&
                  setOrderData(
                    orders.filter((item) => item.order_type === "cancelled")
                  );
                setFilter("Cancelled Orders");
              }}
            >
              Cancelled
            </i>
          </div>
          <br />
          <h5>{filter}</h5>
          {orderData &&
            orderData.map((item) => {
              return (
                <>
                  <hr />
                  <div className="list-group">
                    <div className="list-group-item list-group-item-action flex-column align-items-start">
                      <h4>
                        {item["user_profile.name"]}
                        <small className="text-muted">
                          {" "}
                          <i
                            class="fas fa-eye"
                            style={{ color: "black" }}
                            onClick={() => {
                              getUserByID(
                                item["user_profile.profileid"],
                                "restaurant",
                                history
                              );
                            }}
                          >
                            {" "}
                            View Profile
                          </i>
                        </small>
                      </h4>

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
                      <p className="mb-1">Date: {item.date}</p>
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
  ) : (
    <Fragment></Fragment>
  );
};
Orders.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getAllOrdersByRestaurant: PropTypes.func.isRequired,
  restaurantprofile: PropTypes.object.isRequired,
  viewOrder: PropTypes.func.isRequired,
  getUserByID: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  restaurantprofile: state.restaurantprofile,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getCurrentProfile,
  getAllOrdersByRestaurant,
  viewOrder,
  getUserByID,
})(withRouter(Orders));
