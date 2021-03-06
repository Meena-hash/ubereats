/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { getAllRestaurants, getAllDishes } from "../../../actions/dashboard";
import { getCurrentUser } from "../../../actions/userprofile";
import Spinner from "../Spinner";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchSelectedRestaurantData } from "../../../actions/restaurant";
import { filterRestaurantFoodType } from "../../../actions/dashboard";
import { addFavourite } from "../../../actions/favourites";
const Dashboard = ({
  getAllRestaurants,
  getCurrentUser,
  getAllDishes,
  fetchSelectedRestaurantData,
  filterRestaurantFoodType,
  dashboard: { restaurants, loading, searchstring, dishes, mode },
  userprofile: { profile },
  favourites: { favlist },
  history,
  addFavourite,
  auth: { user, urole, isAuthenticated },
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

  const viewRestaurantOnClick = async (restaurant) => {
    const filterRestaurantDish = await dishes.filter(
      (dish) => dish.restaurant_idx === restaurant.restaurantid
    );
    fetchSelectedRestaurantData(restaurant, filterRestaurantDish, history);
  };

  const addFavouriteForUser = (e, restaurantid) => {
    const checkIfAlreadyFav = favlist.filter((item) => {
      return (
        item.customer_id_fav === user.id &&
        item.restaurant_id_fav === restaurantid
      );
    });
    if (checkIfAlreadyFav.length === 0 && isAuthenticated) {
      addFavourite(restaurantid);
    }
    e.target.style.color = "red";
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
    if (mode !== null) {
      if (mode === "delivery") {
        setRestaurantsData(
          restaurants.filter((item) => item.mode !== "pickup")
        );
      } else {
        setRestaurantsData(
          restaurants.filter((item) => item.mode !== "delivery")
        );
      }
    }
  }, [mode]);

  useEffect(() => {
    setRestaurantsData(
      restaurants.filter((item) => {
        let shouldReturnSearch = false;
        let shouldReturnByMode = false;

        if (searchstring === null) {
          shouldReturnSearch = true;
        }
        if (mode === null || mode === "Both") {
          shouldReturnByMode = true;
        }

        if (searchstring !== null) {
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
          shouldReturnSearch =
            locationSearch ||
            restaurant_ids_dishes.includes(item.restaurantid) ||
            restaurant_ids_type.includes(item.restaurantid);
        }
        if (shouldReturnSearch) {
          // check mode
          if (mode !== null && mode !== "Both") {
            if (mode === "delivery") {
              shouldReturnByMode = item.mode !== "pickup";
            } else {
              shouldReturnByMode = item.mode !== "delivery";
            }
          }
        }

        return shouldReturnSearch && shouldReturnByMode;
      })
    );
  }, [searchstring, mode]);

  return loading && restaurants === null && restaurantsData === null ? (
    <Spinner />
  ) : !loading && restaurants ? (
    <>
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
        <div className="row" name="restaurants">
          {restaurantsData.map((item) => {
            return (
              <div className="columnrestaurants">
                <div className="card" style={{ width: "100%" }}>
                  <img className="card-img-top" src={item.images} alt="..." />
                  <div className="top-right">
                    <i
                      class="fas fa-heart fa-lg"
                      style={{ color: "white" }}
                      onClick={(e) => {
                        addFavouriteForUser(e, item.restaurantid);
                      }}
                    ></i>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title ellipses">{item.name}</h5>
                    <p className="card-text ellipses">{item.description}</p>

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
  addFavourite: PropTypes.func.isRequired,
  favourites: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  auth: state.auth,
  userprofile: state.userprofile,
  favourites: state.favourites,
});
export default connect(mapStateToProps, {
  getAllRestaurants,
  getAllDishes,
  fetchSelectedRestaurantData,
  getCurrentUser,
  filterRestaurantFoodType,
  addFavourite,
})(Dashboard);
