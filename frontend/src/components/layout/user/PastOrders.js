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
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [tip, setTip] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleClose = () => {
    setOrderDish("");
    setDeliveryAddress("");
    setTip(0);
    setTotalAmount(0);
    setShow(false);
  };

  const fetchOrderDishes = (orderid, address, total, tip) => {
    if (address) setDeliveryAddress(address);
    if (total) setTotalAmount(total);
    if (tip) setTip(tip);
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
        <br />
        <div
          className="userorder"
          style={{ backgroundColor: "black", fontSize: "14px" }}
        >
          <i
            className="fas fa-check-circle navuserorder"
            onClick={(e) => {
              e.preventDefault();
              uniqueOrders &&
                setUniqueOrders([
                  ...new Map(
                    pastorders.map((item) => [
                      item["order_dishes.orderId"],
                      item,
                    ])
                  ).values(),
                ]);
            }}
          >
            {" "}
            All
          </i>
          <i
            className="fas fa-cart-plus navuserorder"
            onClick={(e) => {
              e.preventDefault();
              const rec = [
                ...new Map(
                  pastorders.map((item) => [item["order_dishes.orderId"], item])
                ).values(),
              ];
              rec &&
                setUniqueOrders(
                  rec.filter(
                    (item) =>
                      item.delivery_status === "order received" ||
                      item.pickup_status === "order received"
                  )
                );
            }}
          >
            Received
          </i>

          <i
            className="fas fa-truck navuserorder"
            onClick={(e) => {
              e.preventDefault();
              const prep = [
                ...new Map(
                  pastorders.map((item) => [item["order_dishes.orderId"], item])
                ).values(),
              ];
              prep &&
                setUniqueOrders(
                  prep.filter(
                    (item) =>
                      item.delivery_status === "preparing" ||
                      item.pickup_status === "preparing"
                  )
                );
            }}
          >
            Preparing
          </i>

          <i
            className="fas fa-ban navuserorder"
            onClick={(e) => {
              e.preventDefault();
              const ontw = [
                ...new Map(
                  pastorders.map((item) => [item["order_dishes.orderId"], item])
                ).values(),
              ];
              ontw &&
                setUniqueOrders(
                  ontw.filter((item) => item.delivery_status === "on the way")
                );
            }}
          >
            On the way
          </i>
          <i
            className="fas fa-check-circle navuserorder"
            onClick={(e) => {
              e.preventDefault();
              const del = [
                ...new Map(
                  pastorders.map((item) => [item["order_dishes.orderId"], item])
                ).values(),
              ];
              del &&
                setUniqueOrders(
                  del.filter((item) => item.delivery_status === "delivered")
                );
            }}
          >
            {" "}
            Delivered
          </i>
          <i
            className="fas fa-check-circle navuserorder"
            onClick={(e) => {
              e.preventDefault();
              const pic = [
                ...new Map(
                  pastorders.map((item) => [item["order_dishes.orderId"], item])
                ).values(),
              ];
              pic &&
                setUniqueOrders(
                  pic.filter((item) => item.pickup_status === "pick up ready")
                );
            }}
          >
            {" "}
            Pickup Ready
          </i>
          <i
            className="fas fa-check-circle navuserorder"
            onClick={(e) => {
              e.preventDefault();
              const picdone = [
                ...new Map(
                  pastorders.map((item) => [item["order_dishes.orderId"], item])
                ).values(),
              ];
              picdone &&
                setUniqueOrders(
                  picdone.filter((item) => item.pickup_status === "pickedup")
                );
            }}
          >
            {" "}
            Picked up
          </i>
          <i
            className="fas fa-check-circle navuserorder"
            onClick={(e) => {
              e.preventDefault();
              const cancelledpicdel = [
                ...new Map(
                  pastorders.map((item) => [item["order_dishes.orderId"], item])
                ).values(),
              ];
              cancelledpicdel &&
                setUniqueOrders(
                  cancelledpicdel.filter(
                    (item) =>
                      item.delivery_status === "cancelled" ||
                      item.pickup_status === "cancelled"
                  )
                );
            }}
          >
            {" "}
            Cancelled
          </i>
        </div>
        <br />
        <br />
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
                          <i className="fas fa-truck-pickup"></i>&nbsp;
                          {item.type}
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
                              fetchOrderDishes(
                                item["order_dishes.orderId"],
                                item["delivery_address"],
                                item["total"],
                                item["tip"]
                              );
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
                            <li style={{ listStyle: "none" }}>
                              <i className="fas fa-shopping-bag"></i>&nbsp;
                              {orderDish.length}&nbsp;
                            </li>
                            <li style={{ listStyle: "none" }}>
                              <i className="fas fa-hand-holding"> tip</i>&nbsp;
                              {tip}&nbsp;
                            </li>
                            <li style={{ listStyle: "none" }}>
                              <i className="fas fa-file-invoice-dollar">
                                total
                              </i>
                              &nbsp;
                              {totalAmount}&nbsp;
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
                            <i className="fas fa-map-marked-alt"></i>
                            &nbsp;&nbsp;&nbsp;
                            <p className="text-muted">
                              Ordered to<address> {deliveryAddress}</address>
                            </p>
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
