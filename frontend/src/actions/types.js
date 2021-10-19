// common login/signup actions
export const SET_ALERT = "SET_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";
export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const CLEAR_PROFILE = "CLEAR_PROFILE";
export const CLEAR_USER_PROFILE = "CLEAR_USER_PROFILE";

// user login/signup actions
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAIL = "USER_REGISTER_FAIL";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const GET_USER_PROFILE = "GET_USER_PROFILE";
export const GET_PROFILE = "GET_PROFILE";

// restaurant login/signup actions
export const RESTAURANT_USER_LOADED = "RESTAURANT_USER_LOADED";
export const RESTAURANT_REGISTER_SUCCESS = "RESTAURANT_REGISTER_SUCCESS";
export const RESTAURANT_REGISTER_FAIL = "RESTAURANT_REGISTER_FAIL";
export const RESTAURANT_LOGIN_SUCCESS = "RESTAURANT_LOGIN_SUCCESS";
export const RESTAURANT_LOGIN_FAIL = "RESTAURANT_LOGIN_FAIL";

// dishes - restaurant
export const GET_ALL_DISHES = "GET_ALL_DISHES";
export const ADD_DISH = "ADD_DISH";
export const DELETE_DISH = "DELETE_DISH";
export const GET_DISH_BY_ID = "GET_DISH_BY_ID";
export const EDIT_DISH = "EDIT_DISH";

// orders - restaurant
export const GET_ALL_ORDERS_BY_REST_ID = "GET_ALL_ORDERS_BY_REST_ID";
export const VIEW_ORDER = "VIEW_ORDER";
export const UPDATE_DELIVERY_STATUS = "UPDATE_DELIVERY_STATUS";
export const GET_DISHES_OF_ORDER = "GET_DISHES_OF_ORDER";

// dashboard - user
export const PROFILE_ERROR = "PROFILE_ERROR";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const SET_USERID_FROM_RESTAURANT = "SET_USERID_FROM_RESTAURANT";
export const DASHBOARD_GET_ALL_RESTAURANTS = "DASHBOARD_GET_ALL_RESTAURANTS";
export const DASHBOARD_FILTER_STRING = "DASHBOARD_FILTER_STRING";
export const DASHBOARD_FILTER_RESTAURANT_ON_SEARCH =
  "DASHBOARD_FILTER_RESTAURANT_ON_SEARCH";
export const DASHBOARD_GET_ALL_DISHES = "DASHBOARD_GET_ALL_DISHES";
export const DASHBOARD_FILTER_BY_MODE = "DASHBOARD_FILTER_BY_MODE";
export const DASHBOARD_FILTER_BY_FOOD_TYPE = "DASHBOARD_FILTER_BY_FOOD_TYPE";

// restaurant - user
export const FETCH_SELECTED_RESTAURANT_PROFILE_DISH_DATA =
  "FETCH_SELECTED_RESTAURANT_PROFILE_DISH_DATA";
export const FETCH_CURRENT_RESTAURANT_DATA_ON_RELOAD =
  "FETCH_CURRENT_RESTAURANT_DATA_ON_RELOAD";

// image - user and restaurant
export const UPLOAD_IMAGE_RESTAURANT = "UPLOAD_IMAGE_RESTAURANT";
export const UPLOAD_IMAGE_DISH = "UPLOAD_IMAGE_DISH";
export const UPLOAD_USER_PICTURE = "UPLOAD_USER_PICTURE";

// favourites - user
export const GET_CURRENTUSER_FAVOURITES = "GET_CURRENTUSER_FAVOURITES";
export const ADD_FAVOURITE = "ADD_FAVOURITE";

// cart
export const ADD_ITEM_CART = "ADD_ITEM_CART";
export const GET_CART = "GET_CART";
export const CLEAR_CART = "CLEAR_CART";
export const EDIT_ITEM_CART = "EDIT_ITEM_CART";
export const DELETE_ITEM_CART = "DELETE_ITEM_CART";

// delivery address
export const ADD_DELIVERY_ADDRESS = "ADD_DELIVERY_ADDRESS";
export const GET_DELIVERY_ADDRESSES = "GET_DELIVERY_ADDRESSES";

// place order
export const PLACE_ORDER = "PLACE_ORDER";

// delivery history
export const DELIVERY_HISTORY_SUMMARY = "DELIVERY_HISTORY_SUMMARY";
export const LOAD_DELIVERY_HISTORY = "LOAD_DELIVERY_HISTORY";
export const GET_DISHES_OF_ORDER_USER = "GET_DISHES_OF_ORDER_USER";
