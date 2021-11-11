import axios from "axios";
import { setAlert } from "./alert";
import { ADD_FAVOURITE, GET_CURRENTUSER_FAVOURITES } from "./types";

export const getUserFavourites = () => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const res = await axios.get("/api/favourites", config);

    dispatch({
      type: GET_CURRENTUSER_FAVOURITES,
      payload: res.data,
    });
  } catch (error) {
    dispatch(setAlert("Could not fetch favourites", "danger"));
  }
};

export const addFavourite = (restaurant_id) => async (dispatch) => {
  try {
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const body = {
      restaurant_id: restaurant_id,
    };
    const res = await axios.post(`/api/favourites/`, body, config);
    dispatch({
      type: ADD_FAVOURITE,
      payload: res.data,
    });
    dispatch(setAlert("Favourite added", "success"));
  } catch (error) {
    dispatch(setAlert("Could not add fav", "danger"));
  }
};
