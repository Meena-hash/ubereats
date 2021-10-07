import axios from "axios";
import { setAlert } from "./alert";
import { getDeliveryHistory } from "./orderhistory";
import {
  ADD_DELIVERY_ADDRESS,
  GET_DELIVERY_ADDRESSES,
  PLACE_ORDER,
  CLEAR_CART,
  DELIVERY_HISTORY_SUMMARY,
} from "./types";

export const getAllDeliveryAddress = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get("/api/user/profile/address/me", config);
    dispatch({
      type: GET_DELIVERY_ADDRESSES,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("Error", "danger"));
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
      const res = await axios.post(
        "/api/user/profile/address/me",
        body,
        config
      );
      dispatch({
        type: ADD_DELIVERY_ADDRESS,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch(setAlert("Error", "danger"));
    }
  };

export const placeOrder = (orderData, dishes) => async (dispatch) => {
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
    const res = await axios.post("/api/user/profile/orders", body, config);
    dispatch({
      type: PLACE_ORDER,
      payload: res.data,
    });
    dispatch(getDeliveryHistory());
    dispatch({
      type: CLEAR_CART,
    });
    dispatch(setAlert("Order Placed Successfully", "success"));
  } catch (error) {
    console.log(error);
    dispatch(setAlert("Error", "danger"));
  }
};
