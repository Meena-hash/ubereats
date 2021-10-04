/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { getAllRestaurants, getAllDishes } from "../../../actions/dashboard";
import { getCurrentUser } from "../../../actions/userprofile";
import Spinner from "../Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Dashboard = ({
  getAllRestaurants,
  getCurrentUser,
  getAllDishes,
  dashboard: { restaurants, loading, searchstring, dishes, mode },
  auth: { user, urole },
}) => {
  const [restaurantsData, setRestaurantsData] = useState(restaurants);

  const typeOnClick = (foodType) => {
    setRestaurantsData(
      restaurants.filter((item) => {
        // veg shud include vegan
        let typeSearch = dishes.filter((dish) => dish.type.includes(foodType));
        const restaurant_ids_type = typeSearch.map((id) => id.restaurant_idx);
        return restaurant_ids_type.includes(item.restaurantid);
      })
    );
  };

  useEffect(() => {
    if (!user && urole && urole === "user") {
      getCurrentUser();
    }
    getAllRestaurants();
    getAllDishes();
  }, []);
  useEffect(() => {
    setRestaurantsData(restaurants);
  }, [restaurants]);
  useEffect(() => {
    if (mode !== null)
      setRestaurantsData(restaurants.filter((item) => item.mode === mode));
  }, [mode]);
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
        <h5>Dietary</h5>
        {/* fa-drumstick-bite */}
        <div className="row">
          <div className="columndietary">
            <button
              className="btn"
              style={{ borderRadius: "30px" }}
              onClick={() => {
                typeOnClick("non-veg");
              }}
            >
              <i class="fas fa-drumstick-bite" style={{ color: "black" }}>
                {" "}
                Non-Vegetarian
              </i>
            </button>
          </div>
          <div className="columndietary">
            <button
              className="btn"
              style={{ borderRadius: "30px" }}
              onClick={() => {
                typeOnClick("vegan");
              }}
            >
              <i class="fas fa-carrot" style={{ color: "black" }}>
                {" "}
                Vegan
              </i>
            </button>
          </div>
          <div className="columndietary">
            <button
              className="btn"
              style={{ borderRadius: "30px" }}
              onClick={() => {
                typeOnClick("veg");
              }}
            >
              <i class="fas fa-leaf" style={{ color: "black" }}>
                {" "}
                Vegetarian
              </i>
            </button>
          </div>
        </div>
        <hr />
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
  getCurrentUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  auth: state.auth,
});
export default connect(mapStateToProps, {
  getAllRestaurants,
  getAllDishes,
  getCurrentUser,
})(Dashboard);
