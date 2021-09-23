import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_ALL_DISHES,
  DELETE_DISH,
  ADD_DISH,
  GET_DISH_BY_ID,
} from "../actions/types";
const initialState = {
  profile: null,
  dish: null,
  dishes: null,
  customerProfiles: [],
  loading: true,
  error: {},
};

export default function restprofReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DISH_BY_ID:
      return {
        ...state,
        loading: false,
        dish: state.dishes.filter((dish) => dish.id === payload),
      };
    case GET_ALL_DISHES:
      return { ...state, loading: false, dishes: payload };
    case ADD_DISH:
      return { ...state, loading: false, dishes: [payload, ...state.dishes] };
    case GET_PROFILE:
      return { ...state, profile: payload, loading: false };
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
