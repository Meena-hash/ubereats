const Dish = require("../../../models/Dish");
const checkAuth = require("../check-auth");
const dishResolver = {
  Mutation: {
    async addDish(
      _,
      {
        dishInput: {
          name,
          ingredients,
          price,
          description,
          category,
          updated_by,
          type,
          images,
          restaurant_idx,
        },
      },
      context
    ) {
      const user = checkAuth(context);
      console.log(user);
      let dish = await Dish.findOne({
        name: name,
        restaurant_idx: user.id,
      });

      dish = new Dish({
        name,
        ingredients,
        price,
        description,
        category,
        updated_by,
        type,
        images,
        restaurant_idx,
      });
      await dish.save();
      return dish;
    },
  },
};

module.exports = dishResolver;
