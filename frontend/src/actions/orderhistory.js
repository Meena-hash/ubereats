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

    const res = await axios.get("/api/user/orders/past", config);
    dispatch({
      type: DELIVERY_HISTORY_SUMMARY,
      payload: res.data,
    });

    dispatch({ type: LOAD_DELIVERY_HISTORY });
  } catch (error) {
    console.log(error);
    dispatch(setAlert("Could not load history", "danger"));
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
      `/api/restaurant/orders/get/order/dishes/${orderid}`,
      config
    );
    dispatch({
      type: GET_DISHES_OF_ORDER_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
    dispatch(setAlert("Could not load dishes", "danger"));
  }
};
