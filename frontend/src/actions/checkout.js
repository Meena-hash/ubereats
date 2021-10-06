import axios from "axios";
import { setAlert } from "./alert";
import { ADD_DELIVERY_ADDRESS, GET_DELIVERY_ADDRESSES } from "./types";

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
      dispatch(setAlert("Error", "danger"));
    }
  };
