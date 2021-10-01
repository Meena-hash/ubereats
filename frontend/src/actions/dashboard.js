import axios from "axios";
import { setAlert } from "./alert";
import { DASHBOARD_GET_ALL_RESTAURANTS } from "./types";
export const getAllRestaurants = () => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.get("/api/dashboard/restaurants", config);
    dispatch({
      type: DASHBOARD_GET_ALL_RESTAURANTS,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("Error", "danger"));
  }
};
