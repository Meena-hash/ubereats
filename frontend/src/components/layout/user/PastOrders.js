/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getDishesOfOrder } from "../../../actions/orderhistory";
import { getCurrentUser } from "../../../actions/userprofile";
import { getAllRestaurants, getAllDishes } from "../../../actions/dashboard";
import { Button, Modal } from "react-bootstrap";
import Pagination from "../Pagination";
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
  const [notes, setNotes] = useState("");
  const [tip, setTip] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = uniqueOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const changeOrdersPerPage = (number) => {
    setCurrentPage(1);
    setOrdersPerPage(number);
  };

  const handleClose = () => {
    setOrderDish("");
    setDeliveryAddress("");
    setNotes("");
    setTip(0);
    setTotalAmount(0);
    setShow(false);
  };

  const fetchOrderDishes = (orderid, address, total, tip, notes) => {
    if (address) setDeliveryAddress(address);
    if (notes) setNotes(notes);
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
      <>
        <div>
          <hr />
          <h4>
            <i className="fas fa-utensils fa-lg"></i> <b>Past Orders</b>
          </h4>
          <br />
          <div
            className="userorder"
            style={{ backgroundColor: "grey", fontSize: "14px" }}
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
                    pastorders.map((item) => [
                      item["order_dishes.orderId"],
                      item,
                    ])
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
              &nbsp;Received
            </i>

            <i
              className="fas fa-ellipsis-h navuserorder"
              onClick={(e) => {
                e.preventDefault();
                const prep = [
                  ...new Map(
                    pastorders.map((item) => [
                      item["order_dishes.orderId"],
                      item,
                    ])
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
              &nbsp;Preparing
            </i>

            <i
              className="fas fa-route navuserorder"
              onClick={(e) => {
                e.preventDefault();
                const ontw = [
                  ...new Map(
                    pastorders.map((item) => [
                      item["order_dishes.orderId"],
                      item,
                    ])
                  ).values(),
                ];
                ontw &&
                  setUniqueOrders(
                    ontw.filter((item) => item.delivery_status === "on the way")
                  );
              }}
            >
              &nbsp;On the way
            </i>
            <i
              className="fas fa-people-carry navuserorder"
              onClick={(e) => {
                e.preventDefault();
                const del = [
                  ...new Map(
                    pastorders.map((item) => [
                      item["order_dishes.orderId"],
                      item,
                    ])
                  ).values(),
                ];
                del &&
                  setUniqueOrders(
                    del.filter((item) => item.delivery_status === "delivered")
                  );
              }}
            >
              {" "}
              &nbsp;Delivered
            </i>
            <i
              className="fas fa-bell navuserorder"
              onClick={(e) => {
                e.preventDefault();
                const pic = [
                  ...new Map(
                    pastorders.map((item) => [
                      item["order_dishes.orderId"],
                      item,
                    ])
                  ).values(),
                ];
                pic &&
                  setUniqueOrders(
                    pic.filter((item) => item.pickup_status === "pick up ready")
                  );
              }}
            >
              {" "}
              &nbsp;Pickup
            </i>
            <i
              className="fas fa-user-check navuserorder"
              onClick={(e) => {
                e.preventDefault();
                const picdone = [
                  ...new Map(
                    pastorders.map((item) => [
                      item["order_dishes.orderId"],
                      item,
                    ])
                  ).values(),
                ];
                picdone &&
                  setUniqueOrders(
                    picdone.filter((item) => item.pickup_status === "pickedup")
                  );
              }}
            >
              {" "}
              &nbsp;Picked up
            </i>
            <i
              className="fas fa-window-close navuserorder"
              onClick={(e) => {
                e.preventDefault();
                const cancelledpicdel = [
                  ...new Map(
                    pastorders.map((item) => [
                      item["order_dishes.orderId"],
                      item,
                    ])
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
              &nbsp;Cancelled
            </i>
          </div>
          <br />
          <hr />
          <h5>Orders per page</h5>
          <div className="list-group">
            <select
              className="form-select form-select-lg sm"
              id="pages"
              onChange={(val) => {
                changeOrdersPerPage(val.target.value);
              }}
              style={{ width: "10%" }}
            >
              {" "}
              <option value="2">2</option>
              <option value="5" selected>
                5
              </option>
              <option value="10">10</option>
            </select>
            <hr />
            <Pagination
              ordersPerPage={ordersPerPage}
              totalOrders={uniqueOrders.length}
              paginate={paginate}
            ></Pagination>
            {uniqueOrders &&
              pastorders &&
              currentOrders &&
              currentOrders.map((item) => {
                return (
                  <>
                    <div
                      className="list-group-item list-group-item-action flex-column align-items-start "
                      style={{ width: "100%", border: "none" }}
                    >
                      {" "}
                      <table style={{ width: "50%", border: "none" }}>
                        <tr style={{ border: "none" }}>
                          {" "}
                          <td style={{ border: "none" }}>
                            <h5>
                              <i className="fas fa-signature"></i>{" "}
                              {item["restaurant_profile.name"]}
                              <b></b>{" "}
                            </h5>
                            <img
                              src={item["restaurant_profile.images"]}
                              alt=""
                              style={{ width: "90%" }}
                            />
                          </td>
                          <td style={{ border: "none" }}>
                            <i className="fas fa-info-circle">
                              &nbsp;Order Info
                            </i>
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
                                  <i className="fas fa-money-bill-alt"></i>
                                  &nbsp;$
                                  {item.total}
                                </li>
                                <li>
                                  {" "}
                                  <i className="fas fa-calendar-day"></i>&nbsp;
                                  {new Date(item.date).toString().slice(0, 10)}
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
                                  {item.pickup_status !== null &&
                                    item.pickup_status}
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
                                        item["tip"],
                                        item["notes"]
                                      );
                                    }}
                                  >
                                    {" "}
                                    <b>
                                      <u>
                                        {" "}
                                        <i className="fab fa-wpexplorer"></i>{" "}
                                        View receipt{" "}
                                      </u>
                                    </b>
                                  </button>
                                </li>
                              </ul>
                            </small>
                          </td>
                        </tr>
                      </table>
                      <hr />
                      <br />
                      {show &&
                      orderDish &&
                      orderDish !== null &&
                      orderDish !== "" ? (
                        <Fragment>
                          <Modal
                            show={show}
                            onHide={handleClose}
                            scrollable={true}
                          >
                            {/* <Modal.Title>Receipt</Modal.Title> */}
                            <Modal.Header>
                              <div
                                style={{
                                  backgroundColor: "#96D37F",
                                  width: "100%",
                                  height: "100%",
                                }}
                              >
                                {" "}
                                <img
                                  alt=""
                                  src="https://d1a3f4spazzrp4.cloudfront.net/receipt_v3/receipt_18_eats_tip_v2.png"
                                  style={{
                                    width: "30%",
                                    height: "30%",
                                  }}
                                />
                              </div>
                              <hr />
                            </Modal.Header>

                            <Modal.Body>
                              <Fragment>
                                <table
                                  style={{ width: "100%", border: "none" }}
                                >
                                  <tr style={{ border: "none" }}>
                                    <td style={{ border: "none" }}>
                                      <h3>
                                        {" "}
                                        Total &nbsp; $
                                        {Number(totalAmount).toFixed(2)}
                                      </h3>
                                    </td>
                                    <td style={{ border: "none" }}>
                                      {" "}
                                      <i className="fas fa-shopping-bag"></i>
                                      &nbsp;
                                      {orderDish.reduce(
                                        (n, { count }) =>
                                          Number(n) + Number(count),
                                        0
                                      )}
                                    </td>
                                  </tr>
                                  <hr />
                                  {orderDish.map((item) => {
                                    return (
                                      <>
                                        <tr style={{ border: "none" }}>
                                          <td
                                            style={{
                                              border: "none",
                                            }}
                                          >
                                            <span className="boxed">
                                              &nbsp;{item.count}&nbsp;
                                            </span>{" "}
                                            <b>{item.name}</b>
                                            <p className="text-muted">
                                              {item.description}
                                            </p>
                                          </td>
                                          <td
                                            style={{
                                              border: "none",
                                            }}
                                          >
                                            ${item.price * item.count}
                                          </td>
                                        </tr>
                                      </>
                                    );
                                  })}
                                </table>

                                <hr />
                                <table
                                  style={{ width: "100%", border: "none" }}
                                >
                                  <tr style={{ border: "none" }}>
                                    <td style={{ border: "none" }}>
                                      Subtotal + Tax(0.1%)
                                    </td>
                                    <td style={{ border: "none" }}>
                                      ${(totalAmount - tip - 15).toFixed(2)}
                                    </td>
                                  </tr>

                                  <tr style={{ border: "none" }}>
                                    <td style={{ border: "none" }}>Tip</td>
                                    <td style={{ border: "none" }}>
                                      ${Number(tip).toFixed(2)}
                                    </td>
                                  </tr>
                                  <tr style={{ border: "none" }}>
                                    <td style={{ border: "none" }}>
                                      Delivery Fee
                                    </td>
                                    <td style={{ border: "none" }}>$15.00</td>
                                  </tr>
                                </table>
                                <hr />
                                <p>
                                  {" "}
                                  <i className="fas fa-map-marked-alt"></i>
                                  &nbsp;
                                  {deliveryAddress}
                                </p>
                                <p>
                                  {" "}
                                  <i className="fa fa-commenting"></i>
                                  &nbsp;
                                  {notes}
                                </p>
                              </Fragment>
                            </Modal.Body>
                            <Modal.Footer>
                              <Fragment>
                                <Button
                                  variant="secondary"
                                  onClick={handleClose}
                                >
                                  Close
                                </Button>
                              </Fragment>
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
      </>
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
