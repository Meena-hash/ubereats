import { ADD_ITEM_CART, GET_CART } from "../actions/types";

const initialState = {
  restaurantname: null,
  loading: true,
  items: [],
  itemcount: 0,
  itemcost: 0,
};

export default function cart(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADD_ITEM_CART:
      let items = [];
      if (JSON.parse(sessionStorage.getItem("cartItemsOfUser")))
        items = JSON.parse(sessionStorage.getItem("cartItemsOfUser"));
      else items = [];
      items.push(payload.items);
      sessionStorage.setItem("cartItemsOfUser", JSON.stringify(items));
      sessionStorage.setItem(
        "cartRestaurantName",
        JSON.stringify(payload.restaurantname)
      );
      sessionStorage.setItem(
        "cartItemsCost",
        Number(payload.cost) + Number(state.cost)
      );
      return {
        ...state,
        restaurantname: JSON.parse(
          sessionStorage.getItem("cartRestaurantName")
        ),
        items: JSON.parse(sessionStorage.getItem("cartItemsOfUser")),
        itemcount: JSON.parse(sessionStorage.getItem("cartItemsOfUser")).length,
        loading: false,
        cost: sessionStorage.getItem("cartItemsCost"),
      };
    case GET_CART:
      return {
        ...state,
        restaurantname: JSON.parse(
          sessionStorage.getItem("cartRestaurantName")
        ),
        items: JSON.parse(sessionStorage.getItem("cartItemsOfUser")),
        itemcount: JSON.parse(sessionStorage.getItem("cartItemsOfUser"))
          ? JSON.parse(sessionStorage.getItem("cartItemsOfUser")).length
          : 0,
        loading: false,
        cost: sessionStorage.getItem("cartItemsCost"),
      };
    default:
      return state;
  }
}
