import { FETCH_SELECTED_RESTAURANT_PROFILE_DISH_DATA } from "../actions/types";
const initialState = {
  restaurantprofile: {},
  loading: true,
  dishes: [],
};

export default function restaurantlanding(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_SELECTED_RESTAURANT_PROFILE_DISH_DATA:
      return {
        ...state,
        restaurantprofile: payload.profile,
        dishes: [payload.dishes],
        loading: false,
      };
    default:
      return state;
  }
}
