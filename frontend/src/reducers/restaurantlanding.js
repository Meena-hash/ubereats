import {
  FETCH_SELECTED_RESTAURANT_PROFILE_DISH_DATA,
  FETCH_CURRENT_RESTAURANT_DATA_ON_RELOAD,
} from "../actions/types";
const initialState = {
  restaurantprofile: {},
  loading: true,
  dishes: [],
};

export default function restaurantlanding(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SELECTED_RESTAURANT_PROFILE_DISH_DATA:
      sessionStorage.setItem(
        "currentRestaurant",
        JSON.stringify(payload.profile)
      );
      sessionStorage.setItem(
        "currentRestaurantDishes",
        JSON.stringify(payload.dishes)
      );
      return {
        ...state,
        restaurantprofile: payload.profile,
        dishes: payload.dishes,
        loading: false,
      };
    case FETCH_CURRENT_RESTAURANT_DATA_ON_RELOAD:
      return {
        ...state,
        restaurantprofile: JSON.parse(
          sessionStorage.getItem("currentRestaurant")
        ),
        dishes: JSON.parse(sessionStorage.getItem("currentRestaurantDishes")),
        loading: false,
      };

    default:
      return state;
  }
}
