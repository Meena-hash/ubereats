import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_ALL_DISHES,
  DELETE_DISH,
  ADD_DISH,
  GET_DISH_BY_ID,
  GET_ALL_ORDERS_BY_REST_ID,
  VIEW_ORDER,
  UPDATE_DELIVERY_STATUS,
  GET_DISHES_OF_ORDER,
  UPLOAD_IMAGE_RESTAURANT,
  UPLOAD_IMAGE_DISH,
  EDIT_DISH,
  SET_USERID_FROM_RESTAURANT,
} from "../actions/types";
const initialState = {
  profile: null,
  dish: null,
  dishes: null,
  customerProfiles: [],
  loading: true,
  orders: [],
  error: {},
  order: null,
  dishesOfOrder: [],
  customerid: null,
};

export default function restprofReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USERID_FROM_RESTAURANT:
      return {
        ...state,
        loading: false,
        customerid: payload,
      };
    case GET_DISH_BY_ID:
      return {
        ...state,
        loading: false,
        dish: state.dishes.filter((dish) => dish.id === payload),
      };
    case GET_DISHES_OF_ORDER:
      return { ...state, loading: false, dishesOfOrder: payload };
    case VIEW_ORDER:
      return {
        ...state,
        loading: false,
        order: state.orders.filter((order) => order.id === payload),
      };
    case GET_ALL_ORDERS_BY_REST_ID:
      return {
        ...state,
        loading: false,
        orders: payload,
      };
    case GET_ALL_DISHES:
      return { ...state, loading: false, dishes: payload };
    case UPLOAD_IMAGE_DISH:
    case EDIT_DISH:
      return {
        ...state,
        loading: false,
        dishes: [
          payload,
          ...state.dishes.filter((dish) => dish.id !== payload.id),
        ],
      };

    case ADD_DISH:
      return { ...state, loading: false, dishes: [payload, ...state.dishes] };
    case UPLOAD_IMAGE_RESTAURANT:
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };
    case UPDATE_DELIVERY_STATUS:
      return {
        ...state,
        loading: false,
        orders: [payload, ...state.orders.filter((or) => or.id !== payload.id)],
        order: payload,
      };
    case PROFILE_ERROR:
      return { ...state, error: payload, loading: false, dishes: null };
    case CLEAR_PROFILE:
      return { ...state, profile: null, loading: false, dishes: null };
    case DELETE_DISH:
      return {
        ...state,
        loading: false,
        dishes: state.dishes.filter((dish) => dish.id !== payload),
      };
    default:
      return state;
  }
}
