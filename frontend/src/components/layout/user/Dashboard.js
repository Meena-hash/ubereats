/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { getAllRestaurants, getAllDishes } from "../../../actions/dashboard";
import { getCurrentUser } from "../../../actions/userprofile";
import Spinner from "../Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchSelectedRestaurantData } from "../../../actions/restaurant";
import { filterRestaurantFoodType } from "../../../actions/dashboard";
const Dashboard = ({
  getAllRestaurants,
  getCurrentUser,
  getAllDishes,
  fetchSelectedRestaurantData,
  filterRestaurantFoodType,
  dashboard: { restaurants, loading, searchstring, dishes, mode, foodType },
  userprofile: { profile },
  history,
  auth: { user, urole },
}) => {
  const [restaurantsData, setRestaurantsData] = useState(restaurants);
  const [dietaryType, setDietaryType] = useState("clear filters");
  const typeOnClick = (e, foodType) => {
    e.preventDefault();
    filterRestaurantFoodType(foodType);
    setRestaurantsData(
      restaurants.filter((item) => {
        // veg shud include vegan
        let typeSearch = dishes.filter((dish) => dish.type.includes(foodType));
        const restaurant_ids_type = typeSearch.map((id) => id.restaurant_idx);
        return restaurant_ids_type.includes(item.restaurantid);
      })
    );
    if (foodType !== null && foodType !== "") setDietaryType(foodType);
    else setDietaryType("clear filters");
  };

  const viewRestaurantOnClick = (restaurant) => {
    const filterRestaurantDish = dishes.filter(
      (dish) => dish.restaurant_idx === restaurant.restaurantid
    );
    fetchSelectedRestaurantData(restaurant, filterRestaurantDish, history);
  };
  useEffect(() => {
    if (!user && urole && urole === "user") {
      getCurrentUser();
    }
    if (restaurants !== []) getAllRestaurants();
    if (dishes !== []) getAllDishes();
  }, []);
  useEffect(() => {
    setRestaurantsData(restaurants);
    if (profile && profile.city !== null) {
      let filterByUserLoc = restaurants.filter((item) =>
        item.location.includes(profile.city)
      );
      const filterArray = (restaurants, filterByUserLoc) => {
        const filtered = restaurants.filter((el) => {
          return filterByUserLoc.indexOf(el) === -1;
        });
        return filtered;
      };

      setRestaurantsData(
        filterByUserLoc.concat(filterArray(restaurants, filterByUserLoc))
      );
    }
  }, [restaurants]);
  useEffect(() => {
    if (profile && profile.city !== null) {
      let filterByUserLoc = restaurants.filter((item) =>
        item.location.includes(profile.city)
      );
      const filterArray = (restaurants, filterByUserLoc) => {
        const filtered = restaurants.filter((el) => {
          return filterByUserLoc.indexOf(el) === -1;
        });
        return filtered;
      };

      setRestaurantsData(
        filterByUserLoc.concat(filterArray(restaurants, filterByUserLoc))
      );
    }
  }, [profile]);
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
              onClick={(e) => {
                typeOnClick(e, "non-veg");
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
              onClick={(e) => {
                typeOnClick(e, "vegan");
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
              onClick={(e) => {
                typeOnClick(e, "veg");
              }}
            >
              <i class="fas fa-leaf" style={{ color: "black" }}>
                {" "}
                Vegetarian
              </i>
            </button>
          </div>
          <div className="columndietary">
            <button
              className="btn"
              style={{ borderRadius: "30px" }}
              onClick={(e) => {
                typeOnClick(e, "");
              }}
            >
              <i class="fas fa-times" style={{ color: "black" }}>
                {" "}
                {dietaryType}
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
                    {/* <a href="/view/restaurant" className="btn btn-primary">
                      View Restaurant
                    </a> */}
                    <button
                      className="btn"
                      style={{ borderRadius: "30px", width: "100%" }}
                      onClick={() => {
                        viewRestaurantOnClick(item);
                      }}
                    >
                      <i class="fas fa-glasses" style={{ color: "black" }}>
                        {" "}
                        View Restaurant
                      </i>
                    </button>
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
  fetchSelectedRestaurantData: PropTypes.func.isRequired,
  filterRestaurantFoodType: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  auth: state.auth,
  userprofile: state.userprofile,
});
export default connect(mapStateToProps, {
  getAllRestaurants,
  getAllDishes,
  fetchSelectedRestaurantData,
  getCurrentUser,
  filterRestaurantFoodType,
})(Dashboard);
