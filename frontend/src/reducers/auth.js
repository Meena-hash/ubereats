import {
  RESTAURANT_REGISTER_SUCCESS,
  RESTAURANT_REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  RESTAURANT_LOGIN_FAIL,
  RESTAURANT_LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../actions/types";
const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  urole: null,
};

export default function authReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload };
    case RESTAURANT_REGISTER_SUCCESS:
    case RESTAURANT_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        urole: "restaurant",
      };
    case USER_REGISTER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
        urole: "user",
      };
    case RESTAURANT_REGISTER_FAIL:
    case USER_REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
    case RESTAURANT_LOGIN_FAIL:
    case USER_LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        urole: null,
      };
    default:
      return state;
  }
}
