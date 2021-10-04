import { FETCH_SELECTED_RESTAURANT_PROFILE_DISH_DATA } from "./types";

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
