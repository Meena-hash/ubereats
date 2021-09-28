import React, { Fragment, useState, useEffect } from "react";
import { addDish, getCurrentProfile } from "../../../actions/restaurantprofile";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../Spinner";
const initialState = {
  name: "",
  ingredients: "",
  price: "",
  description: "",
  category: "",
  type: "",
};
const AddDishes = ({
  getCurrentProfile,
  auth: { urole, user, loading },
  addDish,
  history,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  const [formData, setFormData] = useState(initialState);
  const { name, ingredients, price, description, category, type } = formData;
  const onChange = async (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addDish(formData, history);
  };
  return loading && user === null ? (
    <Spinner />
  ) : !loading && urole === "restaurant" ? (
    <Fragment>
      <form className="form profile" onSubmit={(e) => onSubmit(e)}>
        <center>
          {" "}
          <h1 className="large text-primary">Add a Dish</h1>
        </center>
        <div className="form-group">
          <input
            type="text"
            placeholder="Dish Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Dish Ingredients"
            name="ingredients"
            value={ingredients}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Price"
            name="price"
            value={price}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short description"
            name="description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <div className="form-group">
          <select
            name="category"
            value={category}
            onChange={(e) => onChange(e)}
          >
            <option value="0">* Select Category</option>
            <option value="appetizer">Appetizer</option>
            <option value="salad">Salad</option>
            <option value="main course">Main Course</option>
            <option value="dessert">Dessert</option>
            <option value="beverage">Beverage</option>
          </select>
        </div>
        <div className="form-group">
          <select name="type" value={type} onChange={(e) => onChange(e)}>
            <option value="0">* Select Category</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-veg</option>
            <option value="vegan">Vegan</option>
            <option value="all">All</option>
          </select>
        </div>
        <center>
          {" "}
          <input type="submit" className="btn btn-primary my-1" />
        </center>
      </form>
    </Fragment>
  ) : (
    <Fragment></Fragment>
  );
};

AddDishes.prototypes = {
  addDish: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getCurrentProfile, addDish })(
  withRouter(AddDishes)
);
