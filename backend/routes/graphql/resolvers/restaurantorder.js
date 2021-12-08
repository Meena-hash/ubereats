const Dish = require("../../../models/Dish");
const Orders = require("../../../models/Order");
const OrderDish = require("../../../models/OrderDish");
const checkAuth = require("../check-auth");
const statusResolver = {
  Mutation: {
    async updateOrder(_, { orderStatusInput: { orderid, del_status } }) {
      let delivery = {};

      let order = await Orders.findOne({ _id: orderid });
      if (order.type === "deliver") delivery.delivery_status = del_status;
      else delivery.pickup_status = del_status;
      if (del_status === "delivered") {
        delivery.order_type = "delivered";
      }
      if (del_status === "cancelled") {
        delivery.order_type = "cancelled";
      }
      order = await Orders.findOneAndUpdate(
        { _id: orderid },
        {
          $set: delivery,
        }
      ).populate("userprofileid");
      return order;
    },
  },
};

module.exports = statusResolver;
