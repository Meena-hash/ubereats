import React, { Fragment, useEffect, useState } from "react";
import { getAllRestaurants } from "../../../actions/dashboard";
import Spinner from "../Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Dashboard = ({
  getAllRestaurants,
  dashboard: { restaurants, loading },
}) => {
  const [orderData, setOrderData] = useState(restaurants);
  useEffect(() => {
    console.log("hi");
    getAllRestaurants();
    setOrderData(restaurants);
  }, [restaurants, getAllRestaurants]);

  return loading && restaurants === null ? (
    <Spinner />
  ) : !loading && restaurants ? (
    <>
      <br />
      <hr />

      <div className="container Fluid">
        <div className="row" name="restaurants">
          {orderData.map((item) => {
            return (
              <div className="columnrestaurants">
                <div className="card" style={{ width: "100%" }}>
                  <img className="card-img-top" src={item.images} alt="..." />
                  <div className="card-body">
                    <h5 className="card-title ellipses">{item.name}</h5>
                    <p className="card-text ellipses">{item.description}</p>
                    <a href="/dashboard" className="btn btn-primary">
                      View Restaurant
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  ) : (
    <Fragment></Fragment>
  );
};
Dashboard.propTypes = {
  getAllRestaurants: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});
export default connect(mapStateToProps, {
  getAllRestaurants,
})(Dashboard);
