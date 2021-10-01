import { DASHBOARD_GET_ALL_RESTAURANTS } from "../actions/types";
const initialState = {
  restaurants: [],
  loading: true,
};

export default function dashboard(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case DASHBOARD_GET_ALL_RESTAURANTS:
      console.log("dff", payload);
      return { ...state, restaurants: payload, loading: false };
    default:
      return state;
  }
}
