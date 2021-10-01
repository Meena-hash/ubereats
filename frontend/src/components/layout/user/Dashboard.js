import React, { Fragment, useEffect, useState } from "react";
import { getAllRestaurants } from "../../../actions/dashboard";
import Spinner from "../Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Dashboard = ({
  getAllRestaurants,
  dashboard: { restaurants, loading, searchstring },
}) => {
  const [restaurantsData, setRestaurantsData] = useState(restaurants);
  useEffect(() => {
    getAllRestaurants();
  }, []);
  useEffect(() => {
    setRestaurantsData(restaurants);
  }, [restaurants]);
  useEffect(() => {
    if (searchstring !== null) {
      setRestaurantsData(
        restaurants.filter((item) => item.location.includes(searchstring))
      );
      console.log(
        "setting rest data",
        searchstring,
        restaurants.filter((item) => console.log(item.location))
      );
    }
  }, [searchstring]);

  return loading && restaurants === null && restaurantsData === null ? (
    <Spinner />
  ) : !loading && restaurants ? (
    <>
      <br />
      <hr />

      <div className="container Fluid">
        <div className="row" name="restaurantsD">
          {restaurantsData.map((item) => {
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
