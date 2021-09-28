import { GET_USER_BY_ID } from "../actions/types";
const initialState = {
  profile: null,
  loading: true,
  error: {},
};
export default function userprofReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_BY_ID:
      return { ...state, profile: payload, loading: false };
    default:
      return state;
  }
}
