import axios from "axios";
import {
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_SUCCESS,
  AUTH_ERROR,
  USER_LOADED,
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
export const register = (name, email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.error;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: USER_REGISTER_FAIL,
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
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (error) {
    // const errors = error.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    // }
    // dispatch({
    //   type: USER_LOGIN_FAIL,
    // });
  }
};
