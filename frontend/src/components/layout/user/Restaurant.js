import React, { Fragment } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../Spinner";
import Dishes from "../restaurant/Dishes";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
const Restaurant = ({
  restaurantlanding: { restaurantprofile, loading, dishes, foodType },
  dashboard: { restaurants, searchstring, mode },
}) => {
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
              {dishes &&
                dishes[0].map((item) => {
                  return (
                    <div className="column col-md-4 container-fluid">
                      <div className="row rowlanding container-fluid">
                        <div className="columnlanding container-fluid ">
                          <img className="imagecol" src={item.images} alt="" />
                        </div>
                        <div className="columnlanding container-fluid">
                          <p>
                            <i>{item.name}</i>
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
