const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const Dish = require("../../models/Dish");

const {
  restaurantauth,
  checkRestaurantAuth,
} = require("../../middleware/restaurant_auth");

checkRestaurantAuth();

router.get("/", restaurantauth, async (req, res) => {
  try {
    let dishes = await Dish.find({
      restaurant_idx: req.restaurant.id,
    });
    return res.json(dishes);
  } catch (error) {
    console.log("get api");
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.post("/update", restaurantauth, async (req, res) => {
  const {
    _id,
    name,
    ingredients,
    price,
    description,
    category,
    updated_by,
    type,
    restaurant_idx,
  } = req.body;
  console.log("id is", _id);

  let dishFields = {};
  dishFields._id = _id;
  dishFields.name = name;
  dishFields.ingredients = ingredients;
  dishFields.price = price;
  dishFields.description = description;
  dishFields.category = category;
  dishFields.updated_by = updated_by;
  dishFields.type = type;
  dishFields.restaurant_idx = restaurant_idx;

  if (restaurant_idx === req.restaurant.id) {
    try {
      let dish = await Dish.findById({
        _id: _id,
      });

      if (dish) {
        dish = await Dish.findByIdAndUpdate(
          { _id: _id },
          { $set: dishFields },
          { new: true }
        );

        return res.json(dish);
      } else {
        return res
          .status(400)
          .json({ msg: "Dish does not exists. Invalid request" });
      }
    } catch (err) {
      console.log("update api");
      console.log(err);
      res.status(500).send("Server error");
    }
  } else {
    return res
      .status(400)
      .json({ msg: "Not authorized to update. Invalid request" });
  }
});

router.post("/create", restaurantauth, async (req, res) => {
  const { name, ingredients, price, description, category, type } = req.body;
  let dishFields = {};
  dishFields.name = name;
  dishFields.ingredients = ingredients;
  dishFields.price = price;
  dishFields.description = description;
  dishFields.category = category;
  dishFields.updated_by = req.restaurant.id;
  dishFields.type = type;
  dishFields.restaurant_idx = req.restaurant.id;
  try {
    let dish = await Dish.findOne({
      name: name,
      restaurant_idx: req.restaurant.id,
    });
    if (dish) {
      return res
        .status(400)
        .json({ msg: "Dish already exists. Invalid request" });
    }
    dish = new Dish(dishFields);
    await dish.save();
    return res.json(dish);
  } catch (error) {
    console.log("create api");
    console.log(error.message);
    res.status(500).send(error);
  }
});

router.delete("/:dish_id", restaurantauth, async (req, res) => {
  console.log(req.params.dish_id);
  let dish = await Dish.findById(req.params.dish_id);
  if (!dish) {
    return res
      .status(400)
      .json({ msg: "Dish does not exist. Invalid request" });
  }
  if (dish.restaurant_idx === req.restaurant.id) {
    try {
      await dish.remove();
      return res.sendStatus(200);
    } catch (error) {
      console.log("delete api");
      console.log(error.message);
      res.status(500).send("Server error");
    }
  } else {
    return res
      .status(401)
      .json({ msg: "Not authorized to delete. Invalid request" });
  }
});

module.exports = router;
