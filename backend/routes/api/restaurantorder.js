const express = require("express");
const router = express.Router();
const db = require("../../config/db");
const RestaurantProfile = require("../../models/RestaurantProfile");
const UserProfile = require("../../models/UserProfile");
const Restaurant = require("../../models/Restaurant");
const Orders = require("../../models/Order");

const {
  restaurantauth,
  checkRestaurantAuth,
} = require("../../middleware/restaurant_auth");
const Dish = require("../../models/Dish");
const OrderDish = require("../../models/OrderDish");

checkRestaurantAuth();

router.get("/", restaurantauth, async (req, res) => {
  try {
    let orders = await Orders.find({
      restaurantid: req.restaurant.id,
    }).populate("userprofileid");
    return res.json(orders);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.put(
  "/update/delivery/:order_id/:del_status",
  restaurantauth,
  async (req, res) => {
    try {
      let delivery = {};
      let order = await Orders.findOne({ _id: req.params.order_id });
      if (order.type === "deliver")
        delivery.delivery_status = req.params.del_status;
      else delivery.pickup_status = req.params.del_status;
      if (req.params.del_status === "delivered") {
        delivery.order_type = "delivered";
      }
      if (req.params.del_status === "cancelled") {
        delivery.order_type = "cancelled";
      }
      order = await Orders.findOneAndUpdate(
        { _id: req.params.order_id },
        {
          $set: delivery,
        }
      ).populate("userprofileid");
      return res.json([order]);
    } catch (err) {
      console.log(err);
      res.status(500).send("Server error");
    }
  }
);

router.get("/get/order/dishes/:order_id", async (req, res) => {
  let dishes = await OrderDish.find({ orderId: req.params.order_id }).select([
    "dish_id",
    "count",
    "price",
  ]);

  summary = [];

  for (dishid of dishes) {
    let dish = await Dish.findById(dishid.dish_id);
    dish._doc["count"] = dishid.count;
    dish._doc["price"] = dishid.price;
    summary.push(dish);
  }

  return res.json(summary);
});

module.exports = router;
