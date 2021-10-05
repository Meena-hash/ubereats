import {
  FETCH_CURRENT_RESTAURANT_DATA_ON_RELOAD,
  FETCH_SELECTED_RESTAURANT_PROFILE_DISH_DATA,
} from "./types";

export const fetchSelectedRestaurantData =
  (profile, dishes, history) => async (dispatch) => {
    const data = {};
    data.profile = profile;
    data.dishes = dishes;
    dispatch({
      type: FETCH_SELECTED_RESTAURANT_PROFILE_DISH_DATA,
      payload: data,
    });
    history.push("/view/restaurant");
  };

export const fetchCurrentRestaurantDataOnReload = () => async (dispatch) => {
  dispatch({
    type: FETCH_CURRENT_RESTAURANT_DATA_ON_RELOAD,
  });
};
