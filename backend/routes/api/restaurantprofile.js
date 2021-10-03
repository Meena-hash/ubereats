const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const auth = require("../../middleware/restaurant_auth");
const RestaurantProfile = require("../../models/RestaurantProfile");
const UserProfile = require("../../models/UserProfile");
const Restaurant = require("../../models/Restaurant");
const Dish = require("../../models/Dish");
const Orders = require("../../models/Order");

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
  const {
    name,
    location,
    description,
    email,
    ph_no,
    from_time,
    to_time,
    mode,
  } = req.body;

  let profileFields = {};
  profileFields.restaurantid = restaurant.id;
  profileFields.name = name;
  profileFields.location = location;
  profileFields.description = description;
  profileFields.email = email;
  profileFields.ph_no = ph_no;
  profileFields.from_time = from_time;
  profileFields.to_time = to_time;
  profileFields.mode = mode;
  let contactFields = {};
  contactFields.email = email;
  contactFields.ph_no = ph_no;
  contactFields.name = name;

  try {
    let profile = await RestaurantProfile.findOne({
      where: { restaurantid: restaurant.id },
    });
    let user = await Restaurant.findOne({
      where: { id: restaurant.id },
    });
    if (profile) {
      profile = await RestaurantProfile.update(profileFields, {
        where: { restaurantid: restaurant.id },
      });
      user = await Restaurant.update(contactFields, {
        where: { id: restaurant.id },
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
    res.status(500).send(error);
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

router.get("/orders", auth, async (req, res) => {
  try {
    UserProfile.hasMany(Orders);
    Orders.belongsTo(UserProfile, { foreignKey: "userprofileid" });
    let orders = await Orders.findAll({
      where: { restaurant_id_order: req.restaurant.id },
      attributes: { exclude: ["userProfileProfileid"] },
      include: [
        {
          model: UserProfile,
          as: "user_profile",
          required: true,
        },
      ],
      raw: true,
    });
    return res.json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.put("/update/delivery/:order_id/:del_status", auth, async (req, res) => {
  try {
    UserProfile.hasMany(Orders);
    Orders.belongsTo(UserProfile, { foreignKey: "userprofileid" });
    let delivery = {};
    delivery.delivery_status = req.params.del_status;
    if (req.params.del_status === "delivered") {
      delivery.order_type = "delivered";
    }
    if (req.params.del_status === "cancelled") {
      delivery.order_type = "cancelled";
    }
    let order = await Orders.update(delivery, {
      where: { id: req.params.order_id },
    });
    order = await Orders.findOne({
      where: { id: req.params.order_id },
      attributes: { exclude: ["userProfileProfileid"] },
      include: [
        {
          model: UserProfile,
          as: "user_profile",
          required: true,
        },
      ],
    });

    return res.json([order]);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/get/order/dishes/:order_id", auth, async (req, res) => {
  try {
    let dishes = await db.query(
      `call ubereats.getOrderSummary(${req.params.order_id})`
    );
    return res.json(dishes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
