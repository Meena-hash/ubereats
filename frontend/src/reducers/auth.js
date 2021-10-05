import {
  RESTAURANT_REGISTER_SUCCESS,
  RESTAURANT_REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  RESTAURANT_LOGIN_FAIL,
  RESTAURANT_LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  RESTAURANT_USER_LOADED,
} from "../actions/types";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  urole: localStorage.getItem("urole"),
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      localStorage.setItem("urole", "user");
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        urole: "user",
      };
    case RESTAURANT_USER_LOADED:
      localStorage.setItem("urole", "restaurant");
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        urole: "restaurant",
      };
    case RESTAURANT_REGISTER_SUCCESS:
    case RESTAURANT_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("urole", "restaurant");
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("urole", "user");
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        urole: "user",
      };
    case RESTAURANT_REGISTER_FAIL:
    case USER_REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
    case RESTAURANT_LOGIN_FAIL:
    case USER_LOGIN_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("urole");
      sessionStorage.removeItem("currentRestaurantDishes");
      sessionStorage.removeItem("currentRestaurant");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        urole: null,
        user: null,
      };
    default:
      return state;
  }
}
