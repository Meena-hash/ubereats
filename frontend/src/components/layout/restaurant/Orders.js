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
import Pagination from "../Pagination";

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
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders === []]);
  useEffect(() => {
    setOrderData(orders);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const changeOrdersPerPage = (number) => {
    setCurrentPage(1);
    setOrdersPerPage(number);
  };
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
              totalOrders={orderData.length}
              paginate={paginate}
            ></Pagination>
            {orderData &&
              currentOrders &&
              currentOrders.map((item) => {
                return (
                  <>
                    <hr />
                    <div className="list-group">
                      <div
                        className="list-group-item list-group-item-action flex-column align-items-start"
                        style={{ border: "0" }}
                      >
                        <h4>
                          {item.userprofileid[0].name}
                          <small className="text-muted">
                            {" "}
                            <i
                              class="fas fa-eye"
                              style={{ color: "black" }}
                              onClick={() => {
                                getUserByID(
                                  item.userprofileid[0].profileid,
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
                              onClick={() => viewOrder(item._id, history)}
                            >
                              Edit Order
                            </i>
                          </small>
                        </div>
                        <p className="mb-1">
                          Date: {new Date(item.date).toString().slice(0, 16)}
                        </p>
                        <small>Total: {item.total}$</small>
                        <br />
                        <small>Tip: {item.tip}$</small>
                      </div>
                      <hr />
                    </div>
                  </>
                );
              })}
          </div>
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
