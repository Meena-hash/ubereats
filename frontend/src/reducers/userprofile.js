import {
  CLEAR_USER_PROFILE,
  GET_USER_BY_ID,
  UPLOAD_USER_PICTURE,
} from "../actions/types";
const initialState = {
  profile: null,
  loading: true,
  error: {},
};
export default function userprofReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPLOAD_USER_PICTURE:
    case GET_USER_BY_ID:
      return { ...state, profile: payload, loading: false };
    case CLEAR_USER_PROFILE:
      return { ...state, profile: null, loading: true };
    default:
      return state;
  }
}
