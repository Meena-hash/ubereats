import axios from "axios";
import { setAlert } from "./alert";
import { ADD_ITEM_CART, CLEAR_CART, GET_CART } from "./types";

export const addItemToCart = (item, name) => async (dispatch) => {
  const data = {
    items: item,
    restaurantname: name,
    cost: item.price,
  };
  dispatch({
    type: ADD_ITEM_CART,
    payload: data,
  });
  dispatch(setAlert("Item added to cart", "success"));
};

export const getItemsInCart = () => async (dispatch) => {
  dispatch({
    type: GET_CART,
  });
};

export const clearCart = () => async (dispatch) => {
  dispatch({
    type: CLEAR_CART,
  });
};
