import axios from "axios";
import { setAlert } from "./alert";
import { getDeliveryHistory } from "./orderhistory";
import {
  ADD_DELIVERY_ADDRESS,
  GET_DELIVERY_ADDRESSES,
  PLACE_ORDER,
  CLEAR_CART,
  CANCEL_ORDER,
} from "./types";

export const getAllDeliveryAddress = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get("/api/user/address/me", config);
    dispatch({
      type: GET_DELIVERY_ADDRESSES,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert(error, "danger"));
  }
};
export const addDeliveryAddress =
  (street, city, state, country) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = {
        street: street,
        city: city,
        state: state,
        country: country,
      };
      const res = await axios.post("/api/user/address/me", body, config);
      dispatch({
        type: ADD_DELIVERY_ADDRESS,
        payload: res.data,
      });
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
    }
  };

export const placeOrder = (orderData, dishes, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = {
      orderData,
      dishes,
    };
    const res = await axios.post("/api/user/orders", body, config);
    dispatch({
      type: PLACE_ORDER,
      payload: res.data,
    });
    dispatch(getDeliveryHistory());
    dispatch({
      type: CLEAR_CART,
    });
    dispatch(setAlert("Order Placed Successfully", "success"));
    history.push("/user/dashboard");
  } catch (error) {
    console.log(error);
    dispatch(setAlert("Order placing failed", "danger"));
  }
};

export const cancelOrder = (orderid) => async (dispatch) => {
  try {
    await axios.delete(`/api/user/orders/cancel/${orderid}`);
    dispatch({
      type: CANCEL_ORDER,
    });
    dispatch(getDeliveryHistory());
    dispatch(setAlert("Order cancelled Successfully", "success"));
  } catch (error) {
    const errors = error.response.data;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};
