import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ALL_DISHES,
  GET_PROFILE,
  PROFILE_ERROR,
  DELETE_DISH,
  ADD_DISH,
  GET_DISH_BY_ID,
  USER_LOADED,
  EDIT_DISH,
} from "./types";

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/restaurant/profile");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    const dishes = await axios.get("/api/restaurant/profile/dish");
    dispatch({
      type: GET_ALL_DISHES,
      payload: dishes.data,
    });
    const user = await axios.get("/api/restaurant/auth");
    dispatch({
      type: USER_LOADED,
      payload: user.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response,
        status: error.response,
      },
    });
  }
};

// create or update profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const res = await axios.post(
        "/api/restaurant/profile/basic",
        formData,
        config
      );
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success")
      );
      history.push("/restaurant/profile");
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
        },
      });
    }
  };

export const deleteDish = (id) => async (dispatch) => {
  try {
    axios.delete(`/api/restaurant/profile/dish/${id}`);
    dispatch({
      type: DELETE_DISH,
      payload: id,
    });
    dispatch(setAlert("Dish deleted", "success"));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const addDish = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const res = await axios.post(
      "/api/restaurant/profile/create/dish",
      formData,
      config
    );
    dispatch({
      type: ADD_DISH,
      payload: res.data,
    });
    dispatch(setAlert("Dish Created", "success"));
    history.push("/restaurant/dishes");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const getDishByID = (dishid) => async (dispatch) => {
  try {
    dispatch({
      type: GET_DISH_BY_ID,
      payload: dishid,
    });
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const editDish = (formData, history) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const res = axios.post(
      "/api/restaurant/profile/update/dish",
      formData,
      config
    );
    dispatch({
      type: EDIT_DISH,
      payload: res.data,
    });
    dispatch(setAlert("Dish Edited", "success"));
    console.log("history");
    history.push("/restaurant/home");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
