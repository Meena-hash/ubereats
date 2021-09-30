import React, { Fragment, useEffect, useState } from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { connect } from "react-redux";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import {
  getDishByID,
  getCurrentProfile,
  editDish,
} from "../../../actions/restaurantprofile";
import { deleteDish } from "../../../actions/restaurantprofile";
import pasta1 from "../img/pasta1.jpeg";

const Dishes = ({
  getCurrentProfile,
  restaurantprofile: { loading, dishes, dish },
  auth: { urole },
  deleteDish,
  getDishByID,
  editDish,
  history,
}) => {
  useEffect(() => {
    getCurrentProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const edit = (id) => {
    getDishByID(id);
  };
  const handleShow = () => {
    setShow(true);
  };
  const onChange = async (e) => {
    dish[0][e.target.name] = e.target.value;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const picFormData = new FormData();
    picFormData.append("image", values.picFile);
    editDish(dish[0], picFormData, history);
    handleClose();
  };

  // image
  const [values, setValues] = useState({
    imagePreviewUrl: "",
    picFile: null,
  });
  let fileInput = React.createRef();

  const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let inFile = e.target.files[0];
    reader.onloadend = () => {
      setValues({ ...values, picFile: inFile, imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(inFile);
    // fileInput.current.click();
  };

  return (
    <>
      <center>
        <br />
        <hr />
        {urole === "restaurant" && (
          <div className="col-md-2">
            <button className="btn btn-primary">
              <i class="fas fa-plus" style={{ color: "black" }}>
                {" "}
                <Link to="/restaurant/add/dishes" style={{ color: "black" }}>
                  Add Dish
                </Link>
              </i>
            </button>
          </div>
        )}
        <div className="row" name="dishes">
          {dishes &&
            dishes.map((item) => {
              return (
                <>
                  <div className="column">
                    <div className="row rows">
                      <div className="column">
                        <img className="imagecol" src={item.images} alt="" />
                      </div>
                      <div className="column">
                        <h4>{item.name}</h4>
                        <i
                          className="fas fa-trash-alt"
                          onClick={() => deleteDish(item.id)}
                        ></i>

                        <i
                          className="fas fa-edit"
                          style={{ color: "black" }}
                          onClick={() => {
                            edit(item.id);

                            handleShow();
                          }}
                        />
                        {!loading && dish && dish[0].id === item.id ? (
                          <Fragment>
                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header>
                                <Modal.Title>{dish[0].name}</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <div>
                                  <p>Change image</p>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    ref={fileInput}
                                  />
                                  <img
                                    src={values.imagePreviewUrl}
                                    alt=""
                                    style={{
                                      objectFit: "cover",
                                      width: "20%",
                                    }}
                                  />
                                </div>
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
                                  defaultValue={
                                    dish[0].category.charAt(0).toUpperCase() +
                                    dish[0].category.slice(1)
                                  }
                                  onChange={(e) => onChange(e)}
                                >
                                  <option value="0">
                                    {dish[0].category.charAt(0).toUpperCase() +
                                      dish[0].category.slice(1)}
                                  </option>
                                  {/* 'appetizer','salad','main course', 'dessert','beverage') ; */}
                                  <option value="appetizer">Appetizer</option>
                                  <option value="salad">Salad</option>
                                  <option value="main course">
                                    Main course
                                  </option>
                                  <option value="dessert">Dessert</option>
                                  <option value="beverage">Beverage</option>
                                </select>
                                <br />
                                <label for="type">
                                  <b> Type </b>
                                </label>
                                <select
                                  name="type"
                                  defaultValue={
                                    dish[0].type.charAt(0).toUpperCase() +
                                    dish[0].type.slice(1)
                                  }
                                  onChange={(e) => onChange(e)}
                                >
                                  <option value="0">
                                    {dish[0].type.charAt(0).toUpperCase() +
                                      dish[0].type.slice(1)}
                                  </option>
                                  <option value="veg">Veg</option>
                                  <option value="non-veg">Non-veg</option>
                                  <option value="vegan">Vegan</option>
                                  <option value="all">All</option>
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

                        <p className="post-date">
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
                </>
              );
            })}
        </div>
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
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  restaurantprofile: state.restaurantprofile,
  auth: state.auth,
});
const mapDispatchToProps = {
  getCurrentProfile,
  deleteDish,
  getDishByID,
  editDish,
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dishes));
