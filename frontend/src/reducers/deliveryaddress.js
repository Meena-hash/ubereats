import { ADD_DELIVERY_ADDRESS, GET_DELIVERY_ADDRESSES } from "../actions/types";

const initialState = {
  addresses: [],
  loading: true,
};

export default function deliveryAddress(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_DELIVERY_ADDRESSES:
      return {
        ...state,
        addresses: payload,
        loading: false,
      };
    case ADD_DELIVERY_ADDRESS:
      return {
        ...state,
        addresses: [...state.addresses, payload],
        loading: false,
      };
    default:
      return state;
  }
}
