const express = require("express");
const router = express.Router();
const DeliveryAddress = require("../../models/DeliveryAddress");
const UserProfile = require("../../models/UserProfile");
const User = require("../../models/User");
const Orders = require("../../models/Order");
const OrderDish = require("../../models/OrderDish");
const db = require("../../config/db");
const RestaurantProfile = require("../../models/RestaurantProfile");
const { auth, checkAuth } = require("../../middleware/user_auth");
checkAuth();
router.get("/", auth, async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      where: {
        profileid: req.user.id,
      },
    });
    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});
router.get("/:user_id", async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      where: {
        profileid: req.params.user_id,
      },
    });
    if (!profile) {
      return res.status(400).json({ msg: "there is no profile for this user" });
    }
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});
// Update basic details (name, date of birth, city, state, country, nickname)
router.post("/basic", auth, async (req, res) => {
  let user = await User.findOne({ where: { id: req.user.id } });
  const {
    name,
    street,
    city,
    state,
    country,
    nickname,
    about,
    dob,
    email,
    ph_no,
  } = req.body;

  let profileFields = {};
  profileFields.profileid = user.id;
  profileFields.name = name;
  profileFields.street = street;
  profileFields.city = city;
  profileFields.state = state;
  profileFields.country = country;
  profileFields.nickname = nickname;
  profileFields.about = about;
  profileFields.dob = dob;
  profileFields.email = email;
  profileFields.ph_no = ph_no;

  try {
    let profile = await UserProfile.findOne({
      where: { profileid: user.id },
    });
    if (profile) {
      profile = await UserProfile.update(profileFields, {
        where: { profileid: user.id },
      });
      profile = await UserProfile.findOne({ where: { profileid: user.id } });
      return res.json(profile);
    }
    profile = new UserProfile(profileFields);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/address/me", auth, async (req, res) => {
  try {
    const addresses = await DeliveryAddress.findAll({
      where: { customer_idx: req.user.id },
    });
    return res.json(addresses);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/address/me", auth, async (req, res) => {
  try {
    const { street, city, country, state } = req.body;
    let addressFields = {};
    addressFields.street = street;
    addressFields.city = city;
    addressFields.country = country;
    addressFields.state = state;
    addressFields.customer_idx = req.user.id;
    const address = new DeliveryAddress(addressFields);
    await address.save();
    return res.json(addressFields);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/orders", auth, async (req, res) => {
  try {
    const { tip, restaurant_id_order, total, delivery_address, type, notes } =
      req.body.orderData;
    let orderFields = {};
    orderFields.tip = tip;
    orderFields.date = new Date();
    orderFields.userprofileid = req.user.id;
    orderFields.restaurant_id_order = restaurant_id_order;
    orderFields.order_type = "new";
    if (type === "delivery") orderFields.type = "deliver";
    else orderFields.type = type;
    if (type === "pickup") orderFields.pickup_status = "order received";
    else orderFields.delivery_status = "order received";
    orderFields.total = total;
    orderFields.delivery_address = delivery_address;
    orderFields.notes = notes;
    let newOrderId = 0;
    await Orders.create(orderFields).then((result) => {
      newOrderId = result.id;
      for (let i = 0; i < req.body.dishes.length; i++) {
        var dish = req.body.dishes[i];
        var dishesFields = {};
        (dishesFields.orderId = result.id),
          (dishesFields.dish_id = dish.id),
          (dishesFields.count = dish.count),
          (dishesFields.price = dish.price);
        var orderDish = new OrderDish(dishesFields);
        orderDish.save();
      }
    });

    let order = await Orders.findOne({
      where: { id: newOrderId },
      attributes: {
        exclude: [
          "restaurantProfileRestaurantid",
          "dishId",
          "id",
          "userProfileProfileid",
        ],
      },
    });
    return res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

router.get("/get/past/orders", auth, async (req, res) => {
  RestaurantProfile.hasMany(Orders);

  Orders.belongsTo(RestaurantProfile, {
    foreignKey: "restaurant_id_order",
  });
  Orders.hasMany(OrderDish);

  OrderDish.belongsTo(Orders, {
    foreignKey: "orderId",
  });
  try {
    let userOrders = await Orders.findAll({
      raw: true,
      where: { userprofileid: req.user.id },
      attributes: {
        exclude: [
          "restaurantProfileRestaurantid",
          "dishId",
          "id",
          "userProfileProfileid",
        ],
      },
      include: [
        {
          model: RestaurantProfile,
          required: true,
          as: "restaurant_profile",

          attributes: {
            exclude: [
              "restaurantProfileRestaurantid",
              "dishId",
              "id",
              "userProfileProfileid",
            ],
          },
        },
        {
          model: OrderDish,
          required: true,
          as: "order_dishes",
          attributes: { exclude: ["id", "dishId", "count"] },
        },
      ],
    });
    return res.json(userOrders);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

router.get("/get/past/orders/dishes/:order_id", auth, async (req, res) => {
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

router.delete("/cancel/order/:order_id", auth, async (req, res) => {
  try {
    let order = await Orders.findOne({
      where: { id: req.params.order_id },
      attributes: { exclude: ["restaurantProfileRestaurantid"] },
    });
    if (!order) {
      return res
        .status(400)
        .json({ msg: "Order does not exist. Invalid request" });
    }
    if (order.userprofileid === req.user.id) {
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
        await Orders.update(orderUpdateFields, {
          where: {
            id: req.params.order_id,
          },
        });
        order = await Orders.findOne({
          where: { id: req.params.order_id },
          attributes: { exclude: ["restaurantProfileRestaurantid"] },
        });
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
