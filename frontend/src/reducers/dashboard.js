import {
  DASHBOARD_FILTER_RESTAURANT_ON_SEARCH,
  DASHBOARD_FILTER_STRING,
  DASHBOARD_GET_ALL_DISHES,
  DASHBOARD_GET_ALL_RESTAURANTS,
} from "../actions/types";
const initialState = {
  restaurants: [],
  loading: true,
  searchstring: null,
  dishes: [],
};

export default function dashboard(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DASHBOARD_FILTER_STRING:
      return {
        ...state,
        searchstring: payload,
        loading: false,
      };
    case DASHBOARD_GET_ALL_RESTAURANTS:
      return { ...state, restaurants: payload, loading: false };
    case DASHBOARD_FILTER_RESTAURANT_ON_SEARCH:
      return {
        ...state,
        restaurants: state.restaurants.filter((restaurant) =>
          restaurant.location.includes(payload)
        ),
        loading: false,
      };
    case DASHBOARD_GET_ALL_DISHES:
      return {
        ...state,
        dishes: payload,
        loading: false,
      };

    default:
      return state;
  }
}
