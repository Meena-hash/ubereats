import { setAlert } from "./alert";
import {
  ADD_ITEM_CART,
  CLEAR_CART,
  GET_CART,
  EDIT_ITEM_CART,
  DELETE_ITEM_CART,
} from "./types";

export const addItemToCart = (item, name, id) => async (dispatch) => {
  const data = {
    items: item,
    restaurantname: name,
    restaurantid: id,
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

export const editCart = (id, count) => async (dispatch) => {
  const payload = {
    id,
    count,
  };
  dispatch({
    type: EDIT_ITEM_CART,
    payload: payload,
  });
};

export const deleteItemCart = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_ITEM_CART,
    payload: id,
  });
};
