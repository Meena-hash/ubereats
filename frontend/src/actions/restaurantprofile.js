import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_ALL_DISHES,
  GET_PROFILE,
  PROFILE_ERROR,
  DELETE_DISH,
  ADD_DISH,
  GET_DISH_BY_ID,
  RESTAURANT_USER_LOADED,
  GET_ALL_ORDERS_BY_REST_ID,
  EDIT_DISH,
  VIEW_ORDER,
  UPDATE_DELIVERY_STATUS,
  GET_DISHES_OF_ORDER,
  UPLOAD_IMAGE_RESTAURANT,
  UPLOAD_IMAGE_DISH,
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
      type: RESTAURANT_USER_LOADED,
      payload: user.data,
    });
    dispatch(getAllOrdersByRestaurant());
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
    await axios.delete(`/api/restaurant/profile/dish/${id}`);
    dispatch({
      type: DELETE_DISH,
      payload: id,
    });
    dispatch(setAlert("Dish deleted", "success"));
    // dispatch(getCurrentProfile());
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

export const addDish = (formData, imageData, history) => async (dispatch) => {
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
    dispatch(uploadImageDish(imageData, res.data.id));
    dispatch(setAlert("Dish Created", "success"));
    history.push("/restaurant/profile");
  } catch (error) {
    console.log(error);
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

export const editDish = (formData, imageData, history) => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    dispatch(uploadImageDish(imageData, formData.id));
    const res = await axios.post(
      "/api/restaurant/profile/update/dish",
      formData,
      config
    );
    dispatch({
      type: EDIT_DISH,
      payload: res.data,
    });
    dispatch(setAlert("Dish Edited", "success"));
    dispatch(getCurrentProfile());
    history.push("/restaurant/profile");
  } catch (error) {
    console.log(error);
  }
};

export const getAllOrdersByRestaurant = () => async (dispatch) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  try {
    const res = await axios.get("/api/restaurant/profile/orders", config);
    dispatch({
      type: GET_ALL_ORDERS_BY_REST_ID,
      payload: res.data,
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

export const viewOrder = (orderId, history) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const dishes = await axios.get(
      `/api/restaurant/profile/get/order/dishes/${orderId}`,
      config
    );
    dispatch({
      type: GET_DISHES_OF_ORDER,
      payload: dishes.data,
    });
    dispatch({
      type: VIEW_ORDER,
      payload: orderId,
    });
    history.push("/restaurant/view/order");
  } catch (error) {
    console.log(error);
    // const errors = error.response.data.errors;
    // if (errors) {
    //   errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    // }
    // dispatch({
    //   type: PROFILE_ERROR,
    //   payload: {
    //     msg: error.response.statusText,
    //     status: error.response.status,
    //   },
    // });
  }
};

export const updateDeliveryStatus =
  (order_id, delivery_status) => async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      const res = await axios.put(
        `/api/restaurant/profile/update/delivery/${order_id}/${delivery_status}`,
        config
      );

      dispatch({
        type: UPDATE_DELIVERY_STATUS,
        payload: res.data,
      });
    } catch (error) {}
  };

export const uploadImageRestaurant =
  (formData, history) => async (dispatch) => {
    try {
      const res = await axios.post("/api/image/upload", formData);
      dispatch({
        type: UPLOAD_IMAGE_RESTAURANT,
        payload: res.data,
      });
      history.push("/restaurant/profile");
    } catch (error) {
      alert(
        "Error occurred while uploading picture, try uploading a smaller image size or try again later."
      );
    }
  };

export const uploadImageDish = (formData, dish_id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/image/dish/upload/${dish_id}`, formData);
    dispatch({
      type: UPLOAD_IMAGE_DISH,
      payload: res.data,
    });
  } catch (error) {
    alert(
      "Error occurred while uploading picture, try uploading a smaller image size or try again later."
    );
  }
};
