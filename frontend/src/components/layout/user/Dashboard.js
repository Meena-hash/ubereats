/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { getAllRestaurants, getAllDishes } from "../../../actions/dashboard";
import Spinner from "../Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Dashboard = ({
  getAllRestaurants,
  getAllDishes,
  dashboard: { restaurants, loading, searchstring, dishes },
}) => {
  const [restaurantsData, setRestaurantsData] = useState(restaurants);
  useEffect(() => {
    getAllRestaurants();
    getAllDishes();
  }, []);
  useEffect(() => {
    setRestaurantsData(restaurants);
  }, [restaurants]);
  useEffect(() => {
    if (searchstring !== null) {
      setRestaurantsData(
        restaurants.filter((item) => {
          // location
          const locationSearch = item.location.includes(searchstring);
          // dishname
          let dishSearch = dishes.filter((dish) =>
            dish.name.includes(searchstring)
          );
          const restaurant_ids_dishes = dishSearch.map(
            (id) => id.restaurant_idx
          );
          //  type
          let typeSearch = dishes.filter((dish) =>
            dish.type.includes(searchstring)
          );
          const restaurant_ids_type = typeSearch.map((id) => id.restaurant_idx);
          return (
            locationSearch ||
            restaurant_ids_dishes.includes(item.restaurantid) ||
            restaurant_ids_type.includes(item.restaurantid)
          );
        })
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
  getAllDishes: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
});
export default connect(mapStateToProps, {
  getAllRestaurants,
  getAllDishes,
})(Dashboard);
