import axios from "axios";
import {
  RESTAURANT_REGISTER_SUCCESS,
  RESTAURANT_REGISTER_FAIL,
  AUTH_ERROR,
  RESTAURANT_USER_LOADED,
  RESTAURANT_LOGIN_FAIL,
  RESTAURANT_LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  CLEAR_PROFILE,
  CLEAR_USER_PROFILE,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

export const loadRestaurantUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/restaurant/auth");
    dispatch({
      type: RESTAURANT_USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("User load failed", "danger"));
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register =
  (name, email, password, location) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ name, email, password, location });
    try {
      const res = await axios.post("/api/restaurants", body, config);
      dispatch({
        type: RESTAURANT_REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadRestaurantUser());
    } catch (err) {
      const errors = err.response.data;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: RESTAURANT_REGISTER_FAIL,
      });
    }
  };
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post("/api/restaurant/auth", body, config);
    dispatch({
      type: RESTAURANT_LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadRestaurantUser());
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: RESTAURANT_LOGIN_FAIL,
    });
  }
};
// add clear profile later
export const logout = (history) => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_PROFILE,
    });
    dispatch({
      type: CLEAR_USER_PROFILE,
    });
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    history.push("/landing");
  } catch (error) {}
};
