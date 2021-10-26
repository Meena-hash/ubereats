const express = require("express");
const { check, validationResult } = require("express-validator");

const { auth, checkAuth } = require("../../middleware/user_auth");
const OrderDish = require("../../models/OrderDish");
const Orders = require("../../models/Order");

const router = express.Router();
checkAuth();

router.post("/", auth, async (req, res) => {
  try {
    const { tip, restaurant_id_order, total, delivery_address, type, notes } =
      req.body.orderData;
    let orderFields = {};
    orderFields.tip = tip;
    orderFields.date = new Date();
    orderFields.uid = req.user.id;
    orderFields.restaurantid = restaurant_id_order;
    orderFields.order_type = "new";
    if (type === "delivery") orderFields.type = "deliver";
    else orderFields.type = type;
    if (type === "pickup") orderFields.pickup_status = "order received";
    else orderFields.delivery_status = "order received";
    orderFields.total = total;
    orderFields.delivery_address = delivery_address;
    orderFields.notes = notes;
    order = new Orders(orderFields);
    await order.save();
    for (let i = 0; i < req.body.dishes.length; i++) {
      var dish = req.body.dishes[i];
      var dishesFields = {};
      (dishesFields.orderId = order._id),
        (dishesFields.dish_id = dish._id),
        (dishesFields.count = dish.count),
        (dishesFields.price = dish.price);
      var orderDish = new OrderDish(dishesFields);
      await orderDish.save();
    }
    return res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/past", auth, async (req, res) => {
  try {
    let userOrders = await Orders.find({
      uid: req.user.id,
    })
      .populate("restaurant_id_order")
      .exec();
    for (let order of userOrders) {
      let dishes = await OrderDish.find({ orderId: order._id }).select([
        "dish_id",
      ]);

      order._doc.dish = [];
      for (let dish of dishes) {
        order._doc.dish.push(dish.dish_id);
      }
    }
    return res.json(userOrders);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.delete("/cancel/:order_id", auth, async (req, res) => {
  try {
    let order = await Orders.findOne({
      _id: req.params.order_id,
    });
    if (!order) {
      return res
        .status(400)
        .json({ msg: "Order does not exist. Invalid request" });
    }
    if (order.uid === req.user.id) {
      let ordertype = order.type;
      let orderUpdateFields = {};
      if (ordertype === "deliver") {
        if (order.delivery_status === "order received") {
          orderUpdateFields.order_type = "cancelled";
          orderUpdateFields.delivery_status = "cancelled";
        } else {
          return res.status(400).json({
            msg: "Order cannot be cancelled. The restaurant is already processing your order. Please contact the restaurant",
          });
        }
      } else if (ordertype === "pickup") {
        if (order.pickup_status === "order received") {
          orderUpdateFields.order_type = "cancelled";
          orderUpdateFields.pickup_status = "cancelled";
        } else {
          return res.status(400).json({
            msg: "Order cannot be cancelled. The restaurant is already processing your order. Please contact the restaurant",
          });
        }
      }
      if (orderUpdateFields) {
        order = await Orders.findOneAndUpdate(
          { _id: req.params.order_id },
          { $set: orderUpdateFields },
          { new: true }
        );

        return res.json(order);
      }
    } else {
      return res.status(401).json({ msg: "Access not allowed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
