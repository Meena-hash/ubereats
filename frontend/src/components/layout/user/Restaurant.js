/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import Spinner from "../Spinner";
import { fetchCurrentRestaurantDataOnReload } from "../../../actions/restaurant";
import { getCurrentUser } from "../../../actions/userprofile";
import { addItemToCart, clearCart } from "../../../actions/cart";
import { addFavourite } from "../../../actions/favourites";
const Restaurant = ({
  restaurantlanding: { restaurantprofile, loading, dishes },
  dashboard: { searchstring, foodType },
  fetchCurrentRestaurantDataOnReload,
  cart: { restaurantname },
  getCurrentUser,
  addItemToCart,
  clearCart,
  addFavourite,
  favourites: { favlist },
  auth: { user, isAuthenticated },
}) => {
  const [dishesData, setDishesData] = useState(dishes);

  const [show, setShow] = useState(false);
  const [orderWarning, setOrderWarning] = useState(false);
  const [itemToAdd, setItemToAdd] = useState("");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = (item) => {
    setItemToAdd(item);
    setShow(true);
  };
  const handleOrderWarningClose = () => {
    setOrderWarning(false);
  };
  const handleOrderWarningShow = (item) => {
    setOrderWarning(true);
  };
  const addToCart = (item) => {
    addItemToCart(item, restaurantprofile.name, restaurantprofile.restaurantid);
    setShow(false);
  };

  const resetCart = () => {
    clearCart();
    handleOrderWarningClose();
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
    if (loading) {
      fetchCurrentRestaurantDataOnReload();
    }
    if (!user) {
      getCurrentUser();
    }
  }, []);
  useEffect(() => {
    setDishesData(dishes);
  }, [dishes]);

  useEffect(() => {
    var searchStringResult = "";
    if (searchstring !== null)
      searchStringResult = dishes.filter((item) =>
        item.name.includes(searchstring)
      );

    if (foodType !== null && dishesData && dishesData !== null) {
      setDishesData(
        searchStringResult.filter((item) => item.type.includes(foodType))
      );
    } else setDishesData(searchStringResult);
  }, [searchstring, foodType]);

  // if (loading) {
  //   return <Redirect to="/user/dashboard"> </Redirect>;
  // }
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
                <div className="top-right">
                  <i
                    class="fas fa-heart fa-lg"
                    style={{ color: "white" }}
                    onClick={(e) => {
                      addFavouriteForUser(e, restaurantprofile.restaurantid);
                    }}
                  ></i>
                </div>
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
              {!loading &&
                dishes &&
                dishesData &&
                dishesData.map((item) => {
                  return (
                    <div className="column restaurant col-md-5 container-fluid">
                      <div className="columnlanding container-fluid border">
                        <img className="imagecol" src={item.images} alt="" />
                      </div>
                      <div className="columnlanding container-fluid border">
                        <i
                          className="fas fa-cart-plus fa-2x"
                          style={{ color: "black" }}
                          onClick={() => {
                            handleShow(item);
                          }}
                        />

                        {!loading &&
                          show &&
                          itemToAdd &&
                          itemToAdd.id === item.id && (
                            <Fragment>
                              <Modal show={show} onHide={handleClose}>
                                <Modal.Header>
                                  <Modal.Title>
                                    {item.name}
                                    <div>
                                      <img
                                        src={item.images}
                                        alt=""
                                        style={{
                                          objectFit: "cover",
                                          width: "100%",
                                        }}
                                      />
                                    </div>
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <p className="text-muted">
                                    {item.description}
                                  </p>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button
                                    variant="secondary"
                                    onClick={handleClose}
                                  >
                                    Close
                                  </Button>
                                  <Button
                                    variant="primary"
                                    style={{
                                      color: "white",
                                      backgroundColor: "black",
                                      width: "80%",
                                    }}
                                    onClick={() => {
                                      restaurantname &&
                                      restaurantname !== restaurantprofile.name
                                        ? handleOrderWarningShow()
                                        : addToCart(item);
                                    }}
                                  >
                                    Add to cart ${item.price}
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </Fragment>
                          )}
                        <Fragment>
                          <Modal
                            show={orderWarning}
                            onHide={handleOrderWarningClose}
                          >
                            <Modal.Header>
                              <Modal.Title>Create new order?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <p className="text-muted">
                                Your order contains items from {restaurantname}.
                                Create a new order to add items from{" "}
                                {restaurantprofile.name}
                              </p>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="primary"
                                style={{
                                  color: "white",
                                  backgroundColor: "black",
                                  width: "80%",
                                }}
                                onClick={() => {
                                  resetCart();
                                }}
                              >
                                New Order
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={handleOrderWarningClose}
                              >
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </Fragment>
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
Restaurant.propTypes = {
  dashboard: PropTypes.object.isRequired,
  restaurantlanding: PropTypes.object.isRequired,
  fetchCurrentRestaurantDataOnReload: PropTypes.func.isRequired,
  getCurrentUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  addItemToCart: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
  clearCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  dashboard: state.dashboard,
  restaurantlanding: state.restaurantlanding,
  auth: state.auth,
  cart: state.cart,
  favourites: state.favourites,
});
export default connect(mapStateToProps, {
  getCurrentUser,
  fetchCurrentRestaurantDataOnReload,
  addItemToCart,
  clearCart,
  addFavourite,
})(Restaurant);
