import axios from "axios";
import { setAlert } from "./alert";
import { getItemsInCart } from "./cart";
import { getAllDeliveryAddress } from "./checkout";
import { getUserFavourites } from "./favourites";
import {
  GET_USER_BY_ID,
  USER_LOADED,
  GET_USER_PROFILE,
  SET_USERID_FROM_RESTAURANT,
  UPLOAD_USER_PICTURE,
} from "./types";

export const getUserByID =
  (userid, role = "user", history) =>
  async (dispatch) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const res = await axios.get(`/api/user/profile/${userid}`, config);
      dispatch({
        type: GET_USER_BY_ID,
        payload: res.data,
      });
      if (role === "restaurant") {
        dispatch({
          type: SET_USERID_FROM_RESTAURANT,
          payload: res.data.profileid,
        });
        history.push("/user/profile");
      }
    } catch (error) {
      console.log(error);
      // dispatch(setAlert("Error", "danger"));
    }
  };

export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/user/profile");
    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data,
    });

    const user = await axios.get("/api/auth");
    dispatch({
      type: USER_LOADED,
      payload: user.data,
    });
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    const user_prof = await axios.get(
      `/api/user/profile/${res.data.profileid}`,
      config
    );
    dispatch({
      type: GET_USER_BY_ID,
      payload: user_prof.data,
    });
    dispatch(getUserFavourites());
    dispatch(getItemsInCart());
    dispatch(getAllDeliveryAddress());
  } catch (error) {}
};

export const editUserProfile =
  (formData, imageData, history) => async (dispatch) => {
    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };
      const res = await axios.post("/api/user/profile/basic", formData, config);
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      dispatch(uploadImageUser(imageData, res.data.profileid));
      dispatch(getCurrentUser());
      // uncomment later and fix z index
      // dispatch(setAlert("Profile Updated", "success"));
      history.push("/user/profile");
    } catch (error) {}
  };

export const uploadImageUser = (formData, user_id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/image/user/upload/${user_id}`, formData);
    dispatch({
      type: UPLOAD_USER_PICTURE,
      payload: res.data,
    });
  } catch (error) {
    // alert(
    //   "Error occurred while uploading picture, try uploading a smaller image size or try again later."
    // );
  }
};
