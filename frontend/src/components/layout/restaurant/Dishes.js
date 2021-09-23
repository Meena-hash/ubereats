import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";
import {
  getDishByID,
  getCurrentProfile,
  editDish,
} from "../../../actions/restaurantprofile";
import { deleteDish } from "../../../actions/restaurantprofile";
import pasta1 from "../img/pasta1.jpeg";
const initialState = {
  name: null,
  ingredients: null,
  description: null,
  category: null,
  type: null,
  price: 0,
};
const Dishes = ({
  getCurrentProfile,
  restaurantprofile: { dishes, dish },
  deleteDish,
  getDishByID,
  editDish,
  history,
}) => {
  useEffect(() => {
    getCurrentProfile();
    if (dish) {
      const dishData = { ...initialState };
      for (const key in dish) {
        if (key in dishData) dishData[key] = dish[key];
      }
      setFormData(dishData);
    }
  }, []);
  const [formData, setFormData] = useState(initialState);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const edit = (id) => {
    setFormData(getDishByID(id));
    handleShow();
  };
  const handleShow = () => {
    setShow(true);
    if (dish) setFormData(dish[0]);
  };
  const onChange = async (e) =>
    setFormData({ ...dish[0], [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    editDish(formData, history);
  };
  return (
    <>
      <center>
        {/*  <div class="post bg-white p-1 my-1 cent"> */}
        <br />
        <hr />

        <div class="row" name="dishes">
          {dishes &&
            dishes.map((item) => {
              return (
                <>
                  <div class="column">
                    <div class="row rows">
                      <div class="column">
                        <img class="imagecol" src={pasta1} alt="" />
                      </div>
                      <div class="column">
                        <h4>{item.name}</h4>
                        <i
                          class="fas fa-trash-alt"
                          onClick={() => deleteDish(item.id)}
                        ></i>

                        <i
                          class="fas fa-edit"
                          style={{ color: "black" }}
                          onClick={() => {
                            edit(item.id);
                          }}
                        />
                        {dish ? (
                          <Fragment>
                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header>
                                <Modal.Title>{dish[0].name}</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <label for="description">
                                  <b> Description </b>
                                </label>
                                <input
                                  type="text"
                                  defaultValue={dish[0].description}
                                  name="description"
                                  size="6000px"
                                  onChange={(e) => onChange(e)}
                                />
                                <br />
                                <label for="ingredients">
                                  <b> Ingredients </b>
                                </label>
                                <input
                                  type="text"
                                  defaultValue={dish[0].ingredients}
                                  name="ingredients"
                                  onChange={(e) => onChange(e)}
                                />
                                <br />
                                <label for="category">
                                  <b> Category </b>
                                </label>
                                <select
                                  name="category"
                                  defaultValue={dish[0].category}
                                  onChange={(e) => onChange(e)}
                                >
                                  <option value="0">{dish[0].category}</option>
                                  <option value="Appetizer">Appetizer</option>
                                  <option value="Salads">Salads</option>
                                  <option
                                    value="Main
Course"
                                  >
                                    Main Course
                                  </option>
                                  <option value="Desserts">Desserts</option>
                                  <option value="Beverages">Beverages</option>
                                </select>
                                <br />
                                <label for="type">
                                  <b> Type </b>
                                </label>
                                <select
                                  name="type"
                                  value={dish[0].type}
                                  onChange={(e) => onChange(e)}
                                >
                                  <option value="0">{dish[0].type}</option>
                                  <option value="veg">veg</option>
                                  <option value="non-veg">non-veg</option>
                                  <option value="vegan">vegan</option>
                                  <option value="all">all</option>
                                </select>
                                <br />
                                <label for="price">
                                  <b> Price </b>
                                </label>
                                <input
                                  type="text"
                                  placeholder="Price"
                                  name="price"
                                  defaultValue={dish[0].price}
                                  onChange={(e) => onChange(e)}
                                />
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
                                  onClick={(e) => onSubmit(e)}
                                >
                                  Save Changes
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </Fragment>
                        ) : (
                          <Fragment />
                        )}

                        <p class="post-date">
                          <b>Description: </b>
                          {item.description}
                        </p>
                        <p class="post-date">
                          <b>Ingredients: </b>
                          {item.ingredients}
                        </p>
                        <p class="post-date">
                          <b>Category: </b>
                          {item.category}
                        </p>
                        <p class="post-date">
                          <b>Type: </b>
                          {item.type}
                        </p>
                        <p class="post-date">
                          <b>Price: </b>
                          {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
        {/* </div> */}
      </center>
    </>
  );
};
Dishes.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  restaurantprofile: PropTypes.object.isRequired,
  deleteDish: PropTypes.func.isRequired,
  getDishByID: PropTypes.func.isRequired,
  editDish: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  restaurantprofile: state.restaurantprofile,
});
const mapDispatchToProps = {
  getCurrentProfile,
  deleteDish,
  getDishByID,
  editDish,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dishes));
