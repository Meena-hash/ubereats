import React, { Fragment, useState } from "react";
import { addDish } from "../../../actions/restaurantprofile";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const initialState = {
  name: "",
  ingredients: "",
  price: "",
  description: "",
  category: "",
  type: "",
};
const AddDishes = ({ addDish, history }) => {
  const [formData, setFormData] = useState(initialState);
  const { name, ingredients, price, description, category, type } = formData;
  const onChange = async (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addDish(formData, history);
  };
  return (
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
        <div class="form-group">
          <select
            name="category"
            value={category}
            onChange={(e) => onChange(e)}
          >
            <option value="0">* Select Category</option>
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
        </div>
        <div class="form-group">
          <select name="type" value={type} onChange={(e) => onChange(e)}>
            <option value="0">* Select Category</option>
            <option value="veg">veg</option>
            <option value="non-veg">non-veg</option>
            <option value="vegan">vegan</option>
            <option value="all">all</option>
          </select>
        </div>
        <center>
          {" "}
          <input type="submit" className="btn btn-primary my-1" />
        </center>
      </form>
    </Fragment>
  );
};

AddDishes.prototypes = {
  addDish: PropTypes.func.isRequired,
};

export default connect(null, { addDish })(withRouter(AddDishes));
