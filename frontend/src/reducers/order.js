import {
  DELIVERY_HISTORY_SUMMARY,
  GET_DISHES_OF_ORDER_USER,
  LOAD_DELIVERY_HISTORY,
  PLACE_ORDER,
} from "../actions/types";

const initialState = {
  order: {},
  loading: true,
  pastorders: [],
  dishesOfOrder: [],
};

export default function order(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PLACE_ORDER:
      // edit to hold in session storage
      const editOrders = [...state.pastorders, payload];
      sessionStorage.removeItem("pastOrders");
      sessionStorage.removeItem("deliveryMode");
      return {
        ...state,
        order: payload,
        pastorders: editOrders,
        loading: false,
      };
    case DELIVERY_HISTORY_SUMMARY:
      sessionStorage.setItem("pastOrders", JSON.stringify(payload));
      return {
        ...state,
        pastorders: payload,
        loading: false,
      };
    case LOAD_DELIVERY_HISTORY:
      return {
        ...state,
        pastorders: JSON.parse(sessionStorage.getItem("pastOrders")),
        loading: false,
      };
    case GET_DISHES_OF_ORDER_USER:
      return {
        ...state,
        dishesOfOrder: payload,
        loading: false,
      };
    default:
      return state;
  }
}
