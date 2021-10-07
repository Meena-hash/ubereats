/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDishesOfOrder } from "../../../actions/orderhistory";
import { getCurrentUser } from "../../../actions/userprofile";
import { getAllRestaurants, getAllDishes } from "../../../actions/dashboard";
import { Button, Modal } from "react-bootstrap";
const PastOrders = ({
  getCurrentUser,
  order: { pastorders, loading, dishesOfOrder },
  auth: { user, urole, isAuthenticated },
  dashboard: { restaurants, dishes },
  getAllRestaurants,
  getDishesOfOrder,
  getAllDishes,
}) => {
  const [uniqueOrders, setUniqueOrders] = useState(pastorders);
  const [show, setShow] = useState(false);
  const [orderDish, setOrderDish] = useState("");
  const handleClose = () => {
    setOrderDish("");
    setShow(false);
  };

  const fetchOrderDishes = (orderid) => {
    getDishesOfOrder(orderid);
    setShow(true);
  };
  useEffect(() => {
    if (loading && !isAuthenticated) getCurrentUser();
  }, []);
  useEffect(() => {
    if (restaurants === []) {
      getAllRestaurants();
      getAllDishes();
    }
  }, [restaurants]);
  useEffect(() => {
    setOrderDish(dishesOfOrder);
  }, [dishesOfOrder]);
  useEffect(() => {
    setUniqueOrders([
      ...new Map(
        pastorders.map((item) => [item["order_dishes.orderId"], item])
      ).values(),
    ]);
  }, [pastorders]);

  return (
    uniqueOrders &&
    pastorders &&
    !loading && (
      <div>
        <hr />
        <h4>
          <i className="fas fa-utensils fa-lg"></i> <b>Past Orders</b>
        </h4>

        <div className="list-group">
          {uniqueOrders &&
            pastorders &&
            uniqueOrders.map((item) => {
              return (
                <>
                  <div
                    className="list-group-item list-group-item-action flex-column align-items-start border"
                    style={{ width: "80%" }}
                  >
                    {" "}
                    <h5>
                      <i className="fas fa-signature"></i>{" "}
                      {item["restaurant_profile.name"]}
                      <b></b>{" "}
                    </h5>
                    <img
                      src={item["restaurant_profile.images"]}
                      alt=""
                      style={{ width: "30%" }}
                    />
                    <br />
                    <i className="fas fa-info-circle">&nbsp;Order Info</i>
                    <small>
                      <ul
                        style={{
                          listStyle: "circle",
                        }}
                      >
                        <li>
                          <i className="fas fa-id-card-alt"></i>&nbsp;
                          {item["order_dishes.orderId"]}
                        </li>

                        <li>
                          <i className="fas fa-money-bill-alt"></i>&nbsp;$
                          {item.total}
                        </li>
                        <li>
                          {" "}
                          <i className="fas fa-calendar-day"></i>&nbsp;
                          {item.date}
                        </li>
                        <li>
                          {" "}
                          <i className="fas fa-cookie-bite"></i> &nbsp;
                          {item.delivery_status !== null &&
                            item.delivery_status}
                          {item.pickup_status !== null && item.pickup_status}
                        </li>

                        <li>
                          <button
                            style={{
                              background: "none",
                              border: "none",
                              margin: "0",
                              padding: "0",
                              color: "black",
                            }}
                            onClick={() => {
                              fetchOrderDishes(item["order_dishes.orderId"]);
                            }}
                          >
                            {" "}
                            <b>
                              <u>
                                {" "}
                                <i className="fab fa-wpexplorer"></i> View
                                receipt{" "}
                              </u>
                            </b>
                          </button>
                        </li>
                      </ul>
                    </small>
                    {show &&
                    orderDish &&
                    orderDish !== null &&
                    orderDish !== "" ? (
                      <Fragment>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header>
                            <Modal.Title>Receipt</Modal.Title>
                            <li>
                              <i className="fas fa-shopping-bag"></i>&nbsp;
                              {orderDish.length}&nbsp;
                            </li>
                          </Modal.Header>
                          <Modal.Body>
                            {orderDish.map((item) => {
                              return (
                                <>
                                  <table style={{ width: "100%", border: "0" }}>
                                    <tr>
                                      <td>
                                        <b>{item.name}</b>
                                        <p className="text-muted">
                                          {item.description}
                                        </p>
                                      </td>
                                      <td>${item.price}</td>
                                    </tr>
                                  </table>
                                </>
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
                    ) : (
                      <Fragment></Fragment>
                    )}
                  </div>
                </>
              );
            })}
        </div>
      </div>
    )
  );
};

PastOrders.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  getAllDishes: PropTypes.func.isRequired,
  getAllRestaurants: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
  getDishesOfOrder: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  order: state.order,
  dashboard: state.dashboard,
});

export default connect(mapStateToProps, {
  getCurrentUser,
  getAllRestaurants,
  getAllDishes,
  getDishesOfOrder,
})(PastOrders);
