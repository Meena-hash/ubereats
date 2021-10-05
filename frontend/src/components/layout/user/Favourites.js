import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "../../../actions/userprofile";
import Spinner from "../Spinner";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { fetchSelectedRestaurantData } from "../../../actions/restaurant";
const Favourites = ({
  getCurrentUser,
  auth: { user, urole, isAuthenticated },
  favourites: { favlist, loading },
  fetchSelectedRestaurantData,
  dashboard: { restaurants, dishes },
  history,
}) => {
  const [favRestaurants, setFavRestaurants] = useState(favlist);
  const viewRestaurantOnClick = (restaurant) => {
    const rest = {
      restaurantid: restaurant["restaurant_profile.restaurantid"],
      name: restaurant["restaurant_profile.name"],
      location: restaurant["restaurant_profile.location"],
      description: restaurant["restaurant_profile.description"],
      images: restaurant["restaurant_profile.images"],
      email: restaurant["restaurant_profile.email"],
      ph_no: restaurant["restaurant_profile.ph_no"],
      from_time: restaurant["restaurant_profile.from_time"],
      to_time: restaurant["restaurant_profile.to_time"],
      mode: restaurant["restaurant_profile.mode"],
    };
    const filterRestaurantDish = dishes.filter(
      (dish) => dish.restaurant_idx === rest.restaurantid
    );
    console.log(dishes[0]);
    console.log(rest);
    console.log(filterRestaurantDish);
    fetchSelectedRestaurantData(rest, filterRestaurantDish, history);
  };
  useEffect(() => {
    if (!user && urole && urole === "user") {
      getCurrentUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setFavRestaurants(favlist);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favlist]);

  return urole === "user" ? (
    <Fragment>
      <br />
      <br />
      <div className="container Fluid">
        <div className="row" name="restaurants">
          {favRestaurants &&
            favRestaurants.map((item) => {
              return (
                <div className="columnrestaurants">
                  <div className="card" style={{ width: "100%" }}>
                    <img
                      className="card-img-top"
                      src={item["restaurant_profile.images"]}
                      alt="..."
                    />
                    <div className="top-right">
                      <i className="fas fa-heart fa-lg"></i>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title ellipses">
                        {item["restaurant_profile.name"]}
                      </h5>

                      <p className="card-text ellipses">
                        {item[["restaurant_profile.description"]]}
                      </p>

                      <button
                        className="btn"
                        style={{ borderRadius: "30px", width: "100%" }}
                        onClick={() => {
                          viewRestaurantOnClick(item);
                        }}
                      >
                        View Restaurant
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Fragment>
  ) : (
    <Fragment></Fragment>
  );
};
Favourites.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  favourites: PropTypes.object.isRequired,
  dashboard: PropTypes.object.isRequired,
  fetchSelectedRestaurantData: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  favourites: state.favourites,
  dashboard: state.dashboard,
});
export default connect(mapStateToProps, {
  getCurrentUser,
  fetchSelectedRestaurantData,
})(Favourites);
