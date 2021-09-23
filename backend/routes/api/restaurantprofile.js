const express = require("express");
const router = express.Router();
const auth = require("../../middleware/restaurant_auth");
const RestaurantProfile = require("../../models/RestaurantProfile");
const Restaurant = require("../../models/Restaurant");
const Dish = require("../../models/Dish");
const { v4: uuidv4 } = require("uuid");

router.get("/", auth, async (req, res) => {
  try {
    const profile = await RestaurantProfile.findOne({
      where: {
        restaurantid: req.restaurant.id,
      },
    });
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "there is no profile for this restaurant" });
    }
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// Pending - pictures and timings
router.post("/basic", auth, async (req, res) => {
  let restaurant = await Restaurant.findOne({
    where: { id: req.restaurant.id },
  });
  const { name, location, description, email, ph_no } = req.body;

  let profileFields = {};
  profileFields.restaurantid = restaurant.id;
  profileFields.name = name;
  profileFields.location = location;
  profileFields.description = description;
  profileFields.email = email;
  profileFields.ph_no = ph_no;

  try {
    let profile = await RestaurantProfile.findOne({
      where: { restaurantid: restaurant.id },
    });
    if (profile) {
      profile = await RestaurantProfile.update(profileFields, {
        where: { restaurantid: restaurant.id },
      });
      profile = await RestaurantProfile.findOne({
        where: { restaurantid: restaurant.id },
      });
      return res.json(profile);
    }
    profile = new RestaurantProfile(profileFields);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// get all dishes by restaurant id
router.get("/dish", auth, async (req, res) => {
  try {
    let dishes = await Dish.findAll({
      where: {
        restaurant_idx: req.restaurant.id,
      },
    });
    return res.json(dishes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});
// dish
router.post("/update/dish", auth, async (req, res) => {
  const {
    id,
    name,
    ingredients,
    price,
    description,
    category,
    updated_by,
    type,
    restaurant_idx,
  } = req.body;
  let dishFields = {};
  dishFields.id = id;
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
      console.log(id);
      let dish = await Dish.findOne({
        where: { id: id },
      });
      if (dish) {
        dish = await Dish.update(dishFields, {
          where: { id: id },
        });
        dish = await Dish.findOne({
          where: { id: id },
        });
        return res.json(dish);
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  } else {
    return res.status(400).json({ msg: "Invalid request" });
  }
});

router.post("/create/dish", auth, async (req, res) => {
  const { name, ingredients, price, description, category, type } = req.body;
  let dishFields = {};
  dishFields.id = uuidv4();
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
      where: { name: name, restaurant_idx: req.restaurant.id },
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
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.delete("/dish/:dish_id", auth, async (req, res) => {
  let dish = await Dish.findOne({ where: { id: req.params.dish_id } });
  if (!dish) {
    return res
      .status(400)
      .json({ msg: "Dish does not exist. Invalid request" });
  }
  if (dish.restaurant_idx === req.restaurant.id) {
    try {
      await dish.destroy();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server error");
    }
  } else {
    return res.status(400).json({ msg: "Invalid request" });
  }
});
module.exports = router;
