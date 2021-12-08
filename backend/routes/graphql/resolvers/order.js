const Dish = require("../../../models/Dish");
const Orders = require("../../../models/Order");
const OrderDish = require("../../../models/OrderDish");
const checkAuth = require("../check-auth");
const orderResolver = {
  Mutation: {
    async createOrder(
      _,
      { orderInput: { tip, total, delivery_address, type, notes } },
      context
    ) {
      let orderFields = {};
      orderFields.tip = tip;
      orderFields.date = new Date();
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
      return order;
    },
  },
};

module.exports = orderResolver;
