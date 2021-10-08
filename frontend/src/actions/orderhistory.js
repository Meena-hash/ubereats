import axios from "axios";
import { setAlert } from "./alert";
import {
  DELIVERY_HISTORY_SUMMARY,
  GET_DISHES_OF_ORDER_USER,
  LOAD_DELIVERY_HISTORY,
} from "./types";
export const getDeliveryHistory = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.get("/api/user/profile/get/past/orders", config);
    dispatch({
      type: DELIVERY_HISTORY_SUMMARY,
      payload: res.data,
    });

    dispatch({ type: LOAD_DELIVERY_HISTORY });
  } catch (error) {
    console.log(error);
    dispatch(setAlert("Error", "danger"));
  }
};

export const getDishesOfOrder = (orderid) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get(
      `/api/user/profile/get/past/orders/dishes/${orderid}`,
      config
    );
    dispatch({
      type: GET_DISHES_OF_ORDER_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch(setAlert("Error", "danger"));
  }
};
