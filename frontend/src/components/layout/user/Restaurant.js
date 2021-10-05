/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
const Restaurant = ({
  restaurantlanding: { restaurantprofile, loading, dishes },
  dashboard: { searchstring, foodType },
}) => {
  const [dishesData, setDishesData] = useState(dishes);
  useEffect(() => {
    var searchStringResult = "";
    if (searchstring !== null)
      searchStringResult = dishes[0].filter((item) =>
        item.name.includes(searchstring)
      );

    if (foodType !== null && dishesData && dishesData !== null) {
      setDishesData(
        searchStringResult.filter((item) => item.type.includes(foodType))
      );
    } else setDishesData(searchStringResult);
  }, [searchstring, foodType]);

  if (loading) {
    return <Redirect to="/user/dashboard"> </Redirect>;
  }
  return loading && restaurantprofile === null ? (
    <Spinner />
  ) : (
    <>
      <Fragment>
        {restaurantprofile !== null ? (
          <Fragment>
            {!loading && (
              <div
                className="profilec"
                style={{ backgroundImage: `url(${restaurantprofile.images})` }}
              >
                <div className="bottom-left">
                  {restaurantprofile && restaurantprofile.name}
                </div>
              </div>
            )}
            <i className="fas fa-clock">
              {" "}
              Open everyday from {restaurantprofile.from_time} to{" "}
              {restaurantprofile.to_time}
            </i>
            <br />
            {restaurantprofile.mode === "both" && (
              <i class="fas fa-truck">
                <i class="fas fa-male"></i> Delivery and Pickup
              </i>
            )}
            {restaurantprofile.mode === "delivery" && (
              <i class="fas fa-truck"> Delivery</i>
            )}

            {restaurantprofile.mode === "pickup" && (
              <i class="fas fa-male"> Pickup</i>
            )}
            <br />
            <i className="fas fa-map-marker-alt">
              {" "}
              {restaurantprofile.location}
            </i>
            <br />
            <i className="fas fa-tag"> {restaurantprofile.description}</i>
            <br />
            <i className="fas fa-phone-volume"> {restaurantprofile.ph_no}</i>
            <br />
            <i className="fas fa-envelope-open"> {restaurantprofile.email}</i>
            <div className="row container-fluid" name="dishes">
              {dishesData &&
                dishesData.map((item) => {
                  return (
                    <div className="column restaurant col-md-5 container-fluid">
                      <div className="row rowlanding container-fluid">
                        <div className="columnlanding container-fluid ">
                          <img className="imagecol" src={item.images} alt="" />
                        </div>
                        <div className="columnlanding container-fluid">
                          <p>
                            <b>
                              <i>{item.name}</i>
                            </b>
                          </p>

                          <p className="post-date desc">
                            <b>Description: </b>
                            {item.description}
                          </p>
                          <p className="post-date">
                            <b>Ingredients: </b>
                            {item.ingredients}
                          </p>
                          <p className="post-date">
                            <b>Category: </b>
                            {item.category}
                          </p>
                          <p className="post-date">
                            <b>Type: </b>
                            {item.type}
                          </p>
                          <p className="post-date">
                            <b>Price: </b>
                            {item.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
      </Fragment>
    </>
  );
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  restaurantlanding: state.restaurantlanding,
});
export default connect(mapStateToProps, null)(Restaurant);
