import {
  ADD_ITEM_CART,
  CLEAR_CART,
  DELETE_ITEM_CART,
  EDIT_ITEM_CART,
  GET_CART,
} from "../actions/types";

const initialState = {
  restaurantname: null,
  restaurantid: 0,
  loading: true,
  items: [],
  itemcount: 0,
  cost: 0,
};

export default function cart(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_ITEM_CART:
      let items = [];
      if (JSON.parse(sessionStorage.getItem("cartItemsOfUser"))) {
        items = JSON.parse(sessionStorage.getItem("cartItemsOfUser"));
        var checkIfExists = items.filter(function (item) {
          return item.id === payload.items.id;
        });
        if (checkIfExists !== [] && checkIfExists.length > 0) {
          checkIfExists[0].count = checkIfExists[0].count + 1;
          checkIfExists[0].calprice =
            checkIfExists[0].count * payload.items.price;
        } else {
          payload.items.count = 1;
          payload.items.calprice = payload.items.price;
          items.push(payload.items);
        }
      } else {
        items = [];
        payload.items.count = 1;
        payload.items.calprice = payload.items.price;
        items.push(payload.items);
      }
      sessionStorage.setItem("cartItemsOfUser", JSON.stringify(items));
      sessionStorage.setItem(
        "cartRestaurantName",
        JSON.stringify(payload.restaurantname)
      );

      sessionStorage.setItem(
        "cartItemsCost",
        JSON.parse(sessionStorage.getItem("cartItemsOfUser")).reduce(
          (n, { calprice }) => Number(n) + Number(calprice),
          0
        )
        // Number(payload.cost ) + Number(state.cost)
      );
      sessionStorage.setItem("cartRestaurantId", payload.restaurantid);
      return {
        ...state,
        restaurantname: JSON.parse(
          sessionStorage.getItem("cartRestaurantName")
        ),
        restaurantid: sessionStorage.getItem("cartRestaurantId"),
        items: JSON.parse(sessionStorage.getItem("cartItemsOfUser")),
        itemcount: JSON.parse(sessionStorage.getItem("cartItemsOfUser"))
          ? JSON.parse(sessionStorage.getItem("cartItemsOfUser")).reduce(
              (n, { count }) => Number(n) + Number(count),
              0
            )
          : 0,
        loading: false,
        cost: sessionStorage.getItem("cartItemsCost"),
      };
    case GET_CART:
      return {
        ...state,
        restaurantname: JSON.parse(
          sessionStorage.getItem("cartRestaurantName")
        ),
        restaurantid: sessionStorage.getItem("cartRestaurantId"),

        items: JSON.parse(sessionStorage.getItem("cartItemsOfUser")),
        itemcount: JSON.parse(sessionStorage.getItem("cartItemsOfUser"))
          ? JSON.parse(sessionStorage.getItem("cartItemsOfUser")).reduce(
              (n, { count }) => Number(n) + Number(count),
              0
            )
          : 0,
        loading: false,
        cost: sessionStorage.getItem("cartItemsCost"),
      };
    case EDIT_ITEM_CART:
      var cartItems = JSON.parse(sessionStorage.getItem("cartItemsOfUser"));

      var editItem = cartItems.filter(function (item) {
        return item.id === payload.id;
      });
      editItem = editItem[0];

      editItem.count = payload.count;
      editItem.calprice = payload.count * editItem.price;

      sessionStorage.setItem("cartItemsOfUser", JSON.stringify(cartItems));
      sessionStorage.setItem(
        "cartItemsCost",
        JSON.parse(sessionStorage.getItem("cartItemsOfUser")).reduce(
          (n, { calprice }) => Number(n) + Number(calprice),
          0
        )
      );
      return {
        ...state,
        restaurantname: JSON.parse(
          sessionStorage.getItem("cartRestaurantName")
        ),
        restaurantid: sessionStorage.getItem("cartRestaurantId"),
        items: JSON.parse(sessionStorage.getItem("cartItemsOfUser")),
        itemcount: JSON.parse(sessionStorage.getItem("cartItemsOfUser"))
          ? JSON.parse(sessionStorage.getItem("cartItemsOfUser")).reduce(
              (n, { count }) => Number(n) + Number(count),
              0
            )
          : 0,
        loading: false,
        cost: sessionStorage.getItem("cartItemsCost"),
      };
    case DELETE_ITEM_CART:
      var itemsInCart = JSON.parse(sessionStorage.getItem("cartItemsOfUser"));
      itemsInCart = itemsInCart.filter(function (value, index, arr) {
        return value.id !== payload;
      });
      sessionStorage.setItem("cartItemsOfUser", JSON.stringify(itemsInCart));
      sessionStorage.setItem(
        "cartItemsCost",
        JSON.parse(sessionStorage.getItem("cartItemsOfUser")).reduce(
          (n, { calprice }) => Number(n) + Number(calprice),
          0
        )
      );
      return {
        ...state,
        restaurantname: JSON.parse(
          sessionStorage.getItem("cartRestaurantName")
        ),
        restaurantid: sessionStorage.getItem("cartRestaurantId"),

        items: JSON.parse(sessionStorage.getItem("cartItemsOfUser")),
        itemcount: JSON.parse(sessionStorage.getItem("cartItemsOfUser"))
          ? JSON.parse(sessionStorage.getItem("cartItemsOfUser")).reduce(
              (n, { count }) => Number(n) + Number(count),
              0
            )
          : 0,
        loading: false,
        cost: sessionStorage.getItem("cartItemsCost"),
      };
    case CLEAR_CART:
      sessionStorage.removeItem("cartRestaurantName");
      sessionStorage.removeItem("cartRestaurantId");
      sessionStorage.removeItem("cartItemsOfUser");
      sessionStorage.removeItem("cartItemsCost");

      return {
        ...state,
        restaurantname: null,
        restaurantid: 0,
        loading: true,
        items: [],
        itemcount: 0,
        cost: 0,
      };
    default:
      return state;
  }
}
