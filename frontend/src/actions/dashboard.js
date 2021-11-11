import axios from "axios";
import { setAlert } from "./alert";
import {
  DASHBOARD_GET_ALL_RESTAURANTS,
  DASHBOARD_FILTER_STRING,
  DASHBOARD_FILTER_RESTAURANT_ON_SEARCH,
  DASHBOARD_GET_ALL_DISHES,
  DASHBOARD_FILTER_BY_MODE,
  DASHBOARD_FILTER_BY_FOOD_TYPE,
} from "./types";
export const getAllRestaurants = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get("/api/dashboard/restaurants", config);
    dispatch({
      type: DASHBOARD_GET_ALL_RESTAURANTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("Could not fetch restaurants", "danger"));
  }
};

export const getAllDishes = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get("/api/dashboard/dishes", config);
    dispatch({
      type: DASHBOARD_GET_ALL_DISHES,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("Could not fetch dishes", "danger"));
  }
};

export const filterOnSearchString = (searchString) => async (dispatch) => {
  dispatch({
    type: DASHBOARD_FILTER_STRING,
    payload: searchString,
  });
};

export const filterOnDeliveryMode = (mode) => async (dispatch) => {
  dispatch({
    type: DASHBOARD_FILTER_BY_MODE,
    payload: mode,
  });
};

export const filterRestaurantOnSearch = (searchString) => async (dispatch) => {
  dispatch({
    type: DASHBOARD_FILTER_RESTAURANT_ON_SEARCH,
    payload: searchString,
  });
};
export const filterRestaurantFoodType = (foodType) => async (dispatch) => {
  dispatch({
    type: DASHBOARD_FILTER_BY_FOOD_TYPE,
    payload: foodType,
  });
};
